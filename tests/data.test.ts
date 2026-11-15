import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile, stat } from 'node:fs/promises';
import {
	equipment,
	equipmentById,
	destinations,
	equipmentTypes
} from '../src/lib/data/equipment.ts';
import { sources, sourceById, isObservedChallengeSource } from '../src/lib/data/sources.ts';
import { editorialMedia } from '../src/lib/data/media.ts';
import { challenge } from '../src/lib/data/challenge.ts';
import { learningQuestions } from '../src/lib/data/learning.ts';
import { filterEquipment, formatDate } from '../src/lib/utils.ts';

const emptyFilters = {
	query: '',
	destination: '',
	mission: '',
	type: '',
	year: '',
	sort: 'oldest'
};
const datePattern = /^\d{4}(?:-\d{2}(?:-\d{2})?)?$/;

test('the starting collection contains eight distinct records across three destinations', () => {
	assert.equal(equipment.length, 8);
	assert.equal(new Set(equipment.map((item) => item.id)).size, equipment.length);
	assert.deepEqual(
		[...new Set(equipment.map((item) => item.destination))].sort(),
		[...destinations].sort()
	);
	assert.equal(equipment.filter((item) => item.destination === 'Moon').length, 3);
	assert.equal(equipment.filter((item) => item.destination === 'Mars').length, 3);
});

test('every source ID resolves and every scientific claim has provenance', () => {
	assert.equal(
		new Set(sources.map((source) => source.id)).size,
		sources.length,
		'duplicate source IDs'
	);
	for (const source of sources) {
		assert.ok(
			source.name && source.organization && source.provides && source.usage && source.license,
			source.id
		);
		assert.equal(new URL(source.url).protocol, 'https:', source.url);
	}
	for (const item of equipment) {
		const ids = [
			...item.sources,
			...Object.values(item.fieldSources).flat(),
			...item.location.sourceIds,
			...item.timeline.flatMap((event) => event.sourceIds),
			...item.scientificContributions.flatMap((claim) => claim.sourceIds),
			...item.interestingFacts.flatMap((claim) => claim.sourceIds),
			...item.images.map((image) => image.sourceId)
		];
		assert.ok(item.sources.length > 0, item.id);
		for (const id of ids) {
			assert.ok(sourceById[id], `${item.id}: unknown source ${id}`);
			assert.ok(
				item.sources.includes(id),
				`${item.id}: source missing from record-level list: ${id}`
			);
		}
		for (const claim of [...item.scientificContributions, ...item.interestingFacts]) {
			assert.ok(claim.text.length > 10 && claim.sourceIds.length > 0, item.id);
		}
		for (const ids of Object.values(item.fieldSources)) assert.ok(ids.length > 0, item.id);
		for (const relatedId of item.relatedIds) assert.ok(equipmentById[relatedId], relatedId);
	}
});

test('equipment facts and dates are structurally complete without fabricated precision', () => {
	for (const item of equipment) {
		assert.ok(
			item.name && item.shortName && item.mission && item.summary && item.story && item.chapter
		);
		assert.ok(item.purpose && item.functionality && item.statusDetail && item.dateNote, item.id);
		assert.ok(equipmentTypes.includes(item.equipmentType));
		for (const date of [
			item.launchDate,
			item.deploymentDate,
			item.missionEndDate,
			...item.timeline.map((event) => event.date)
		].filter((value): value is string => value !== null)) {
			assert.match(date, datePattern, `${item.id}: ${date}`);
			assert.notEqual(formatDate(date), 'Invalid Date');
		}
		if (item.deploymentDate) assert.ok(item.deploymentDate >= item.launchDate, item.id);
		for (const event of item.timeline)
			assert.ok(event.sourceIds.length > 0 && event.title && event.description, item.id);
		const coords = item.location.coordinates;
		assert.ok(item.location.sourceIds.length > 0 && item.location.description, item.id);
		if (coords) {
			assert.ok(Number.isFinite(coords.latitude) && Math.abs(coords.latitude) <= 90);
			assert.ok(Number.isFinite(coords.longitude) && Math.abs(coords.longitude) <= 180);
			assert.notEqual(item.location.locationAccuracy, 'Not applicable');
		}
		if (item.destination === 'Deep Space') {
			assert.equal(coords, null);
			assert.equal(item.deploymentDate, null);
		}
	}
});

test('important status and date distinctions survive the data pipeline', () => {
	assert.equal(equipmentById['apollo-11-reflector'].status, 'Passive science');
	assert.equal(equipmentById['apollo-11-reflector'].missionEndDate, null);
	assert.equal(equipmentById['viking-1'].missionEndDate, '1982-11');
	assert.equal(equipmentById.opportunity.launchDate, '2003-07-08');
	assert.equal(equipmentById.opportunity.deploymentDate, '2004-01-25');
	assert.equal(equipmentById.opportunity.missionEndDate, '2019-02-13');
	assert.equal(equipmentById.insight.missionEndDate, '2022-12-21');
	assert.equal(equipmentById['pioneer-10'].launchDate, '1972-03-03');
	assert.equal(equipmentById['pioneer-10'].missionEndDate, '1997-03-31');
	assert.equal(equipmentById.kepler.launchDate, '2009-03-07');
	assert.equal(equipmentById.kepler.missionEndDate, '2018-10-30');
	assert.ok(equipmentById['pioneer-10'].timeline.some((event) => event.date === '2003-01-23'));
	assert.ok(equipmentById.kepler.timeline.some((event) => event.date === '2018-11-15'));
});

test('NASA data is meaningfully incorporated without falsely asserting challenge eligibility', () => {
	assert.equal(challenge.resourceLinks.length, 14);
	assert.equal(challenge.eligibility, 'Not verified');
	assert.match(challenge.verification, /^Verified/);
	const usedSourceIds = new Set(
		equipment.flatMap((item) => [
			...Object.values(item.fieldSources).flat(),
			...item.scientificContributions.flatMap((claim) => claim.sourceIds),
			...item.timeline.flatMap((event) => event.sourceIds)
		])
	);
	assert.ok(
		sources.some((source) => isObservedChallengeSource(source) && usedSourceIds.has(source.id))
	);
	for (const source of sources)
		assert.equal(source.challengeResource, isObservedChallengeSource(source));
});

test('photographs are local, authentic, credited, and have valid image bytes', async () => {
	const images = [...editorialMedia, ...equipment.flatMap((item) => item.images)];
	assert.ok(images.length >= 12);
	for (const image of images) {
		assert.ok(image.alt && image.caption && image.credit && image.originalUrl);
		assert.ok(sourceById[image.sourceId], image.sourceId);
		assert.equal(image.aiGenerated, false);
		assert.match(image.src, /^\/media\/[a-zA-Z0-9_.-]+\.(jpg|jpeg|png|webp)$/);
		const file = new URL(`../static${image.src}`, import.meta.url);
		assert.ok((await stat(file)).size > 1000, image.src);
		const bytes = await readFile(file);
		assert.ok(
			bytes[0] === 0xff ||
				bytes.subarray(1, 4).toString() === 'PNG' ||
				bytes.subarray(0, 4).toString() === 'RIFF',
			image.src
		);
	}
	assert.ok(equipment.every((item) => item.aiGeneratedMedia === false));
});

test('search and all filters compose, normalize input, and never mutate data', () => {
	const originalOrder = equipment.map((item) => item.id);
	assert.equal(filterEquipment(equipment, emptyFilters).length, 8);
	assert.equal(
		filterEquipment(equipment, { ...emptyFilters, query: '  OPPORTUNITY ' })[0]?.id,
		'opportunity'
	);
	assert.equal(filterEquipment(equipment, { ...emptyFilters, destination: 'Moon' }).length, 3);
	assert.equal(filterEquipment(equipment, { ...emptyFilters, type: 'Rovers' }).length, 2);
	assert.equal(filterEquipment(equipment, { ...emptyFilters, year: '1969' }).length, 2);
	assert.equal(
		filterEquipment(equipment, {
			...emptyFilters,
			mission: equipmentById.insight.mission,
			destination: 'Mars',
			type: 'Landers',
			year: '2018'
		})[0]?.id,
		'insight'
	);
	assert.equal(
		filterEquipment(equipment, { ...emptyFilters, destination: 'Moon', query: 'InSight' }).length,
		0
	);
	assert.equal(filterEquipment(equipment, { ...emptyFilters, sort: 'newest' })[0]?.id, 'insight');
	assert.equal(
		filterEquipment(equipment, { ...emptyFilters, sort: 'arrival' }).at(-1)?.deploymentDate,
		null
	);
	assert.deepEqual(
		equipment.map((item) => item.id),
		originalOrder
	);
});

test('date presentation is UTC-stable and does not invent a day for month-only evidence', () => {
	assert.equal(formatDate('1969-07-21'), 'Jul 21, 1969');
	assert.equal(formatDate('1982-11'), 'Nov 1982');
	assert.equal(formatDate('1969'), '1969');
	assert.equal(formatDate(null), 'Not applicable');
});

test('learning questions resolve to factual equipment and valid answer choices', () => {
	assert.equal(learningQuestions.length, 5);
	for (const question of learningQuestions) {
		assert.ok(equipmentById[question.equipmentId]);
		assert.ok(question.correctIndex >= 0 && question.correctIndex < question.choices.length);
		assert.equal(new Set(question.choices).size, question.choices.length);
		assert.ok(question.explanation.length > 30);
	}
});

test('required disclosures and submission materials exist and inventory matches registry', async () => {
	for (const file of [
		'README.md',
		'SOURCES.md',
		'AI_DISCLOSURE.md',
		'DEMO_SCRIPT.md',
		'SUBMISSION_CHECKLIST.md'
	]) {
		assert.ok((await stat(new URL(`../${file}`, import.meta.url))).size > 300, file);
	}
	const sourceDoc = await readFile(new URL('../SOURCES.md', import.meta.url), 'utf8');
	for (const source of sources) assert.ok(sourceDoc.includes(source.url), source.url);
	const disclosure = await readFile(new URL('../AI_DISCLOSURE.md', import.meta.url), 'utf8');
	assert.match(disclosure, /gpt-6-astra/);
	assert.match(disclosure, /No AI-generated/i);
});
