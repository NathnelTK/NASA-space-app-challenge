import { writeFile } from 'node:fs/promises';
import { sources, isObservedChallengeSource } from '../src/lib/data/sources.ts';
import { equipment } from '../src/lib/data/equipment.ts';
import { challenge } from '../src/lib/data/challenge.ts';

const lines = [
	'# Sources and Resource Provenance',
	'',
	'Generated from the same typed source registry used by `/sources` and `/collection.json`. Regenerate with `npm run sources:generate` after changing the collection. Curated 15 November 2026.',
	'',
	'## Scientific Integrity',
	'',
	'Facts and scientific explanations are AI-assisted paraphrases of the sources below, not independently peer-reviewed science. Every equipment record carries field-level sources; timeline events, location claims, scientific contributions, interesting facts, and media each retain references. Unknown information is not filled with invented values.',
	'',
	'Historical mission-site coordinates are not live positions. Apollo 15 rover and Opportunity landing markers are not claims about exact final rover locations. Deep-space spacecraft have no fabricated surface coordinates. NASA scientific photo mosaics are labeled as such. This release contains no AI-generated images, videos, audio, or 3D models.',
	'',
	'## Exact 2026 Organizer Resources Tab',
	'',
	`Original URL: ${challenge.resourcesUrl}`,
	'',
	`Verification: **${challenge.verification}**. Overall award eligibility: **${challenge.eligibility}**.`,
	'',
	challenge.evidence,
	'',
	'All 14 verified names and original targets are preserved below. This is not a list inferred from another year or from supplementary archives. A certificate-validating Chromium browser confirmed these links on the exact Resources tab after the earlier command-line certificate failures. The full retrieval history is retained above.',
	''
];

for (const resource of challenge.resourceLinks) {
	const matches = sources.filter(
		(source) => source.url.replace(/\/$/, '') === resource.url.replace(/\/$/, '')
	);
	lines.push(
		`- **${resource.name}**: ${resource.url}. ${matches.length ? `Used by source record(s): ${matches.map((s) => s.id).join(', ')}; exact use documented below.` : 'Observed organizer listing only; not used in this release.'}`
	);
}

lines.push(
	'',
	'## Meaningful NASA Data Use',
	'',
	'The local collection incorporates NASA mission descriptions and dates into the explorer and timeline, documented location values into D3 map projections, scientific findings into stories and quizzes, and authentic archive photographs into galleries. The application is not dependent on a live NASA API. Each section below explains how the specific resource is used.',
	'',
	'## Resource Inventory',
	''
);

for (const source of sources) {
	const uses = equipment
		.filter((item) => item.sources.includes(source.id))
		.map((item) => `${item.name} (${item.id})`);
	lines.push(
		`### ${source.name}`,
		'',
		`- Registry ID: \`${source.id}\``,
		`- Original URL: ${source.url}`,
		`- Organization / creator: ${source.organization}`,
		`- Resource type: ${source.type}`,
		`- Information provided: ${source.provides}`,
		`- Actual application use: ${source.usage}`,
		`- Conditions / license: ${source.license}`,
		`- Review status: ${source.verification}; ${source.accessed}. AI-assisted source review, not a claim of NASA endorsement or human peer review.`,
		`- Organizer list: ${isObservedChallengeSource(source) ? 'Exact source URL verified in the 2026 Resources tab with browser certificate validation enabled.' : 'Supplementary resource or implementation tool; no exact link match in the verified organizer list.'}`,
		`- Relevant equipment: ${uses.length ? uses.join('; ') : 'Site-wide imagery, design, tooling, or policy as described above.'}`,
		''
	);
}

lines.push(
	'## Attribution and Rights',
	'',
	'NASA credit does not automatically clear third-party copyrights, personality/publicity rights, or trademarks. Preserve each image credit and check its own archive entry together with NASA/JPL usage guidance. We do not use NASA logos, flags, mission patches, or the NASA Data Insignia as project branding. Official insignia may appear incidentally in authentic historical photographs; these photographs are not AI-generated reconstructions.',
	'',
	'Fonts and photographs are served locally. Lucide supplies interface icons. Exact package versions and the complete transitive dependency graph are recorded in package-lock.json; dependency licenses remain in their distributed packages.',
	'',
	'## Submission References',
	'',
	'Transfer the applicable verified NASA resources and specific uses into the official NASA Data field. Put institutional image partners, libraries, fonts, and other tools in Space Agency and Other Data / References as applicable. List Kilo Code and the model in AI/SI Tools Used. Recheck the current rules and complete a human factual/rights review before marking the submission ready. Overall award eligibility is not asserted.',
	''
);

await writeFile(new URL('../SOURCES.md', import.meta.url), lines.join('\n'), 'utf8');
console.log(
	`Generated SOURCES.md with ${sources.length} resource records and ${challenge.resourceLinks.length} organizer links.`
);
