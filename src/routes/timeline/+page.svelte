<script lang="ts">
	import { browser } from '$app/environment';
	import { replaceState } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import {
		ArrowRight,
		ArrowUpRight,
		ChevronDown,
		ChevronRight,
		Clock3,
		RotateCcw,
		Search,
		SlidersHorizontal
	} from '@lucide/svelte';
	import MediaImage from '$lib/components/MediaImage.svelte';
	import { equipment } from '$lib/data/equipment';
	import { sourceById } from '$lib/data/sources';
	import type { MissionEvent, Source } from '$lib/data/types';
	import { formatDate } from '$lib/utils';

	const eventKinds: MissionEvent['type'][] = [
		'Launch',
		'Arrival',
		'Deployment',
		'Science',
		'Conclusion',
		'Legacy'
	];
	const missions = [...new Set(equipment.map((item) => item.mission))].sort();
	const destinations = [...new Set(equipment.map((item) => item.destination))];
	const events = equipment
		.flatMap((item) =>
			item.timeline.map((event, index) => ({ item, event, id: `${item.id}-${index}` }))
		)
		.sort(
			(a, b) => a.event.date.localeCompare(b.event.date) || a.item.name.localeCompare(b.item.name)
		);

	let equipmentId = $state('');
	let mission = $state('');
	let destination = $state('');
	let eventKind = $state<MissionEvent['type'] | ''>('');
	let unknownEquipment = $state(false);

	// Static prerendering cannot read URL search parameters. Apply deep links in the browser.
	const requestedEquipment = $derived(
		browser ? (page.url.searchParams.get('equipment') ?? '') : ''
	);
	$effect(() => {
		const requested = requestedEquipment;
		if (!browser) return;
		const known = equipment.some((item) => item.id === requested);
		equipmentId = known ? requested : '';
		unknownEquipment = Boolean(requested && !known);
		mission = '';
		destination = '';
		eventKind = '';
	});

	const scopedEvents = $derived(
		events.filter(
			({ item }) =>
				(!equipmentId || item.id === equipmentId) &&
				(!mission || item.mission === mission) &&
				(!destination || item.destination === destination)
		)
	);
	const visibleEvents = $derived(
		scopedEvents.filter(({ event }) => !eventKind || event.type === eventKind)
	);
	const visibleObjects = $derived(new Set(visibleEvents.map(({ item }) => item.id)).size);

	function resetFilters() {
		equipmentId = '';
		mission = '';
		destination = '';
		eventKind = '';
		unknownEquipment = false;
		if (browser && page.url.searchParams.has('equipment')) {
			const url = new URL(page.url);
			url.searchParams.delete('equipment');
			replaceState(url, page.state);
		}
	}
</script>

<svelte:head>
	<title>Mission Timeline | Abandoned but Not Forgotten</title>
	<meta
		name="description"
		content="Follow source-linked launches, arrivals, deployments, discoveries, and mission endings. Explore the lives and legacies of equipment on the Moon, Mars, and beyond."
	/>
</svelte:head>

<div class="shell">
	<header class="page-heading timeline-heading">
		<div>
			<nav class="breadcrumb" aria-label="Breadcrumb">
				<a href={`${base}/`}>Home</a><ChevronRight aria-hidden="true" /><span aria-current="page"
					>Timeline</span
				>
			</nav>
			<span class="eyebrow">THE RECORD OF A JOURNEY</span>
			<h1>Every mission.<br /><span>A lasting chapter.</span></h1>
			<p>
				Launch was only the beginning. Follow the arrivals, experiments, discoveries, and final
				signals that gave these objects a place in history.
			</p>
		</div>
		{#if events.length}
			<div class="chronicle-stamp" aria-label="Collection timeline range">
				<span class="stamp-label">THE COLLECTION CHRONICLE</span>
				<strong
					>{events[0].event.date.slice(0, 4)}<span aria-hidden="true">/</span>{events[
						events.length - 1
					].event.date.slice(0, 4)}</strong
				>
				<span>{events.length} recorded milestones</span>
			</div>
		{/if}
	</header>

	<section class="filter-panel line-panel" aria-labelledby="filter-heading">
		<div class="filter-topline">
			<h2 id="filter-heading">
				<SlidersHorizontal size={16} aria-hidden="true" /> Shape your journey
			</h2>
			<button type="button" class="reset-button" onclick={resetFilters}
				><RotateCcw size={14} aria-hidden="true" /> Reset filters</button
			>
		</div>
		<div class="filter-fields">
			<div class="field">
				<label for="timeline-equipment">Equipment</label><select
					id="timeline-equipment"
					bind:value={equipmentId}
					><option value="">All equipment</option>{#each equipment as item}<option value={item.id}
							>{item.shortName}</option
						>{/each}</select
				>
			</div>
			<div class="field">
				<label for="timeline-mission">Mission</label><select
					id="timeline-mission"
					bind:value={mission}
					><option value="">All missions</option>{#each missions as option}<option value={option}
							>{option}</option
						>{/each}</select
				>
			</div>
			<div class="field">
				<label for="timeline-destination">Destination</label><select
					id="timeline-destination"
					bind:value={destination}
					><option value="">All destinations</option>{#each destinations as option}<option
							value={option}>{option}</option
						>{/each}</select
				>
			</div>
		</div>
		<div class="kind-filter">
			<span class="field-label" id="event-kind-label">Event kind</span>
			<div class="kind-buttons" role="group" aria-labelledby="event-kind-label">
				<button
					type="button"
					class:chosen={!eventKind}
					aria-pressed={!eventKind}
					onclick={() => (eventKind = '')}
					>All events <span aria-hidden="true">{scopedEvents.length}</span></button
				>
				{#each eventKinds as kind}
					<button
						type="button"
						class:chosen={eventKind === kind}
						aria-pressed={eventKind === kind}
						onclick={() => (eventKind = kind)}
						>{kind}<span aria-hidden="true"
							>{scopedEvents.filter(({ event }) => event.type === kind).length}</span
						></button
					>
				{/each}
			</div>
		</div>
	</section>

	{#if unknownEquipment}<p class="notice notice-warning query-notice" role="status">
			That equipment link is not in this collection, so the initial equipment filter was not
			applied. Use the filters to choose an available record.
		</p>{/if}

	<section class="timeline-section" aria-labelledby="events-heading">
		<div class="timeline-topline">
			<div>
				<span class="eyebrow">FROM DEPARTURE TO LEGACY</span>
				<h2 id="events-heading">The moments that mattered.</h2>
			</div>
			<p role="status" aria-live="polite" aria-atomic="true">
				<strong>{visibleEvents.length}</strong> of {events.length} events
				<span aria-hidden="true">/</span>
				{visibleObjects}
				{visibleObjects === 1 ? 'object' : 'objects'}
			</p>
		</div>
		<p class="reading-guide">
			Oldest first. Open a milestone for its story, archive imagery, and sources. Shared mission
			events appear once for each associated object, so no object's history is hidden.
		</p>

		{#if visibleEvents.length}
			<ol class="timeline-list" aria-label="Mission events, oldest first">
				{#each visibleEvents as entry, index (entry.id)}
					{@const image = entry.item.images.find(
						(image) =>
							!image.aiGenerated && (image.kind === 'Photograph' || image.kind === 'Photo mosaic')
					)}
					{@const references = [...new Set(entry.event.sourceIds)]
						.map((id) => sourceById[id])
						.filter((source): source is Source => Boolean(source))}
					<li>
						<details open={index === 0}>
							<summary>
								<span class="event-date"
									><time datetime={entry.event.date}>{formatDate(entry.event.date)}</time><span
										>{entry.item.destination}</span
									></span
								>
								<span class="event-node" aria-hidden="true"></span>
								<span class="event-overview"
									><span class="event-object"
										>{entry.item.mission} <span aria-hidden="true">/</span>
										{entry.item.shortName}</span
									><span class="event-title">{entry.event.title}</span><span
										class="pill"
										class:pill-blue={entry.event.type === 'Science' ||
											entry.event.type === 'Legacy'}>{entry.event.type}</span
									></span
								>
								<ChevronDown class="event-chevron" size={18} aria-hidden="true" />
							</summary>
							<div class="event-detail" class:with-image={Boolean(image)}>
								<div class="event-copy">
									<p class="event-story">{entry.event.description}</p>
									{#if entry.item.dateNote}<p class="date-note">
											<Clock3 size={14} aria-hidden="true" /><span>{entry.item.dateNote}</span>
										</p>{/if}
									<a class="text-link profile-link" href={`${base}/equipment/${entry.item.id}`}
										>Explore {entry.item.shortName}<ArrowRight aria-hidden="true" /></a
									>
									<div class="event-sources">
										<span class="field-label">Source records</span>{#if references.length}<ul>
												{#each references as source (source.id)}<li>
														<a class="source-ref" href={source.url} target="_blank" rel="noreferrer"
															>{source.name}<ArrowUpRight aria-hidden="true" /><span
																class="sr-only"
															>
																(opens in a new tab)</span
															></a
														>
													</li>{/each}
											</ul>{:else}<p>No source record is available for this event.</p>{/if}
									</div>
								</div>
								{#if image}
									<figure>
										<div class="event-image"><MediaImage {image} /></div>
										<figcaption>
											<span class="image-context">OBJECT ARCHIVE / {image.kind}</span
											>{image.caption}<span class="image-credit">{image.credit}</span><span
												>Archive context, not necessarily photographed on this event's date.</span
											><a href={image.originalUrl} target="_blank" rel="noreferrer"
												>View image record <ArrowUpRight size={12} aria-hidden="true" /><span
													class="sr-only"
												>
													(opens in a new tab)</span
												></a
											>
										</figcaption>
									</figure>
								{/if}
							</div>
						</details>
					</li>
				{/each}
			</ol>
		{:else}
			<div class="empty-state">
				<Search aria-hidden="true" />
				<h3>No milestones in this view.</h3>
				<p>
					Try another event kind, mission, or destination. Resetting the filters brings every
					recorded event back into view.
				</p>
				<button type="button" class="button button-primary" onclick={resetFilters}
					><RotateCcw aria-hidden="true" /> Show all events</button
				>
			</div>
		{/if}
	</section>

	<aside class="notice timeline-note" aria-labelledby="date-heading">
		<Clock3 size={19} aria-hidden="true" />
		<div>
			<h2 id="date-heading">A note on dates</h2>
			<p>
				Dates retain the precision of the cited records and are not shifted into your browser's
				local time. UTC and US-local dates can differ by a day; each object's notes explain these
				differences. Viking 1's final-contact month preserves a disagreement between sources rather
				than inventing an exact day. This is a timeline of this collection, not every event in
				spaceflight history.
			</p>
			<a href={`${base}/sources`}
				>Read our source notes <ArrowUpRight size={13} aria-hidden="true" /></a
			>
		</div>
	</aside>
	<div class="timeline-next">
		<div>
			<span class="eyebrow">KEEP THE STORY GOING</span>
			<h2>Put a place to a moment.</h2>
		</div>
		<a class="button button-secondary" href={`${base}/atlas`}
			>Open the space atlas <ArrowUpRight aria-hidden="true" /></a
		>
	</div>
</div>

<style>
	.timeline-heading {
		display: flex;
		justify-content: space-between;
		align-items: end;
		gap: 32px;
		padding-bottom: 48px;
	}
	.timeline-heading h1 > span {
		color: #a4b8d8;
	}
	.chronicle-stamp {
		flex-shrink: 0;
		border-left: 1px solid #578bff55;
		padding: 8px 0 8px 25px;
		margin-bottom: 7px;
		display: grid;
		gap: 12px;
		color: var(--muted);
		font-size: 11px;
	}
	.stamp-label {
		font-size: 8px;
		letter-spacing: 0.14em;
		color: #93a9cd;
	}
	.chronicle-stamp strong {
		display: flex;
		align-items: center;
		gap: 12px;
		font-family: var(--font-display);
		font-size: 31px;
		font-weight: 400;
		color: #e2ebfb;
		letter-spacing: -0.04em;
	}
	.chronicle-stamp strong > span {
		color: #5277b6;
		font-size: 22px;
	}
	.filter-panel {
		padding: 21px 25px 24px;
	}
	.filter-topline {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 15px;
	}
	.filter-topline h2 {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 15px;
		font-weight: 500;
	}
	.filter-topline h2 :global(svg) {
		color: #96b7ff;
	}
	.reset-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		background: transparent;
		border: 1px solid transparent;
		min-height: 44px;
		padding: 8px;
		color: #b5c5df;
		font-size: 11px;
	}
	.reset-button:hover {
		color: white;
		border-color: #ffffff24;
	}
	.filter-fields {
		display: grid;
		grid-template-columns: 1.2fr 1fr 1fr;
		gap: 18px;
	}
	.field {
		min-width: 0;
	}
	.kind-filter {
		display: grid;
		gap: 10px;
		border-top: 1px solid var(--line);
		margin-top: 22px;
		padding-top: 19px;
	}
	.kind-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
	}
	.kind-buttons button {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		min-height: 44px;
		background: transparent;
		border: 1px solid #ffffff16;
		border-radius: 4px;
		padding: 9px 13px;
		font-size: 11px;
		color: #aebed4;
	}
	.kind-buttons button > span {
		font-family: var(--font-display);
		color: #95a8c6;
		font-size: 10px;
	}
	.kind-buttons button:hover {
		background: #ffffff08;
		border-color: #ffffff45;
	}
	.kind-buttons button.chosen {
		border-color: #578bff80;
		background: #578bff1a;
		color: #c9dbff;
	}
	.query-notice {
		margin-top: 18px;
	}
	.timeline-section {
		padding-top: 52px;
	}
	.timeline-topline {
		display: flex;
		justify-content: space-between;
		align-items: end;
		gap: 24px;
	}
	.timeline-topline h2 {
		font-size: clamp(24px, 3vw, 32px);
		font-weight: 500;
		letter-spacing: -0.035em;
		margin-top: 12px;
	}
	.timeline-topline > p {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
		color: var(--muted);
		font-size: 11px;
	}
	.timeline-topline > p strong {
		color: #e0eaff;
		font-weight: 500;
	}
	.timeline-topline > p > span {
		color: #607796;
		padding-inline: 5px;
	}
	.reading-guide {
		color: #93a4bc;
		font-size: 11px;
		margin-top: 17px;
		max-width: 720px;
	}
	.timeline-list {
		list-style: none;
		margin: 28px 0 0;
		padding: 0;
	}
	.timeline-list > li {
		position: relative;
		border-top: 1px solid var(--line);
	}
	.timeline-list > li:last-child {
		border-bottom: 1px solid var(--line);
	}
	.timeline-list > li::before {
		content: '';
		position: absolute;
		left: 175px;
		top: 0;
		bottom: 0;
		width: 1px;
		background: #2b3d5a;
		pointer-events: none;
	}
	summary {
		display: grid;
		grid-template-columns: 145px 25px minmax(0, 1fr) 20px;
		align-items: start;
		gap: 18px;
		padding: 25px 18px 25px 0;
		cursor: pointer;
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary:hover .event-title {
		color: #afc9ff;
	}
	summary:focus-visible {
		outline-offset: -3px;
		border-radius: 4px;
	}
	.event-date {
		display: grid;
		gap: 8px;
		padding-top: 2px;
	}
	.event-date time {
		font-family: var(--font-display);
		font-size: 17px;
		font-variant-numeric: tabular-nums;
		color: #d6e1f5;
	}
	.event-date > span {
		font-size: 10px;
		color: #99aac3;
	}
	.event-node {
		position: relative;
		width: 9px;
		height: 9px;
		background: #6c98ee;
		border: 1px solid #bad0ff;
		border-radius: 50%;
		margin: 8px auto 0;
		outline: 6px solid #080d15;
	}
	.event-overview {
		min-width: 0;
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 10px;
	}
	.event-object {
		font-size: 9px;
		color: #98accb;
		letter-spacing: 0.065em;
		text-transform: uppercase;
		line-height: 1.7;
	}
	.event-object > span {
		color: #58708d;
		padding-inline: 5px;
	}
	.event-title {
		font-family: var(--font-display);
		font-size: 21px;
		font-weight: 500;
		line-height: 1.35;
		letter-spacing: -0.02em;
	}
	.event-overview .pill {
		font-size: 9px;
	}
	summary :global(.event-chevron) {
		margin-top: 5px;
		color: #93a9cb;
		transition: transform 0.2s;
	}
	details[open] summary :global(.event-chevron) {
		transform: rotate(180deg);
	}
	details[open] .event-node {
		background: #bbd0ff;
	}
	.event-detail {
		margin-left: 206px;
		padding: 0 18px 28px 0;
	}
	.event-detail.with-image {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(180px, 0.65fr);
		gap: 30px;
	}
	.event-copy {
		min-width: 0;
	}
	.event-story {
		color: #c1cee1;
		font-size: 13px;
		line-height: 1.9;
	}
	.date-note {
		display: flex;
		align-items: start;
		gap: 9px;
		color: #96a8c4;
		font-size: 10px;
		margin-top: 18px;
	}
	.date-note :global(svg) {
		margin-top: 3px;
	}
	.profile-link {
		min-height: 44px;
		margin-top: 13px;
		white-space: normal;
	}
	.event-sources {
		border-top: 1px solid var(--line);
		padding-top: 16px;
		margin-top: 10px;
	}
	.event-sources ul {
		list-style: none;
		padding: 0;
		margin: 5px 0 0;
	}
	.event-sources .source-ref {
		min-height: 44px;
		font-size: 10px;
		padding-block: 8px;
	}
	.event-sources > p {
		color: var(--muted);
		font-size: 11px;
		margin-top: 10px;
	}
	figure {
		margin: 0;
		min-width: 0;
	}
	.event-image {
		aspect-ratio: 4 / 3;
		border: 1px solid var(--line);
		border-radius: 5px;
		overflow: hidden;
	}
	figcaption {
		display: grid;
		gap: 7px;
		font-size: 9px;
		color: #9daec7;
		line-height: 1.7;
		margin-top: 12px;
	}
	.image-context {
		color: #c0cde1;
		font-size: 8px;
		letter-spacing: 0.09em;
		text-transform: uppercase;
	}
	.image-credit {
		color: #b6c5dc;
	}
	figcaption a {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		min-height: 44px;
		color: #a6c2ff;
		justify-self: start;
	}
	figcaption a:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.empty-state {
		margin-top: 28px;
	}
	.empty-state h3 {
		font-size: 25px;
		font-weight: 500;
	}
	.timeline-note {
		display: flex;
		align-items: start;
		gap: 15px;
		margin-top: 35px;
	}
	.timeline-note > :global(svg) {
		margin-top: 2px;
		color: #9fbefe;
	}
	.timeline-note h2 {
		font-size: 15px;
		font-weight: 500;
		color: #e4edfc;
		margin-bottom: 7px;
	}
	.timeline-note p {
		font-size: 11px;
	}
	.timeline-note a {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		min-height: 44px;
		margin-top: 3px;
		font-size: 11px;
	}
	.timeline-next {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 24px;
		padding-block: 55px 72px;
	}
	.timeline-next h2 {
		font-size: 27px;
		letter-spacing: -0.03em;
		font-weight: 500;
		margin-top: 12px;
	}
	@media (max-width: 1000px) {
		.timeline-heading {
			align-items: start;
		}
		.chronicle-stamp {
			display: none;
		}
		.event-detail.with-image {
			grid-template-columns: minmax(0, 1fr);
		}
		figure {
			max-width: 420px;
		}
	}
	@media (max-width: 700px) {
		.filter-fields {
			grid-template-columns: 1fr;
			gap: 16px;
		}
		.timeline-topline {
			align-items: start;
			flex-direction: column;
			gap: 14px;
		}
		.timeline-next {
			flex-direction: column;
			align-items: start;
		}
		summary {
			grid-template-columns: 18px minmax(0, 1fr) 18px;
			gap: 12px;
			padding: 21px 3px;
		}
		.event-date {
			grid-column: 2;
			grid-row: 1;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 8px 14px;
			padding-top: 0;
		}
		.event-date time {
			font-size: 15px;
		}
		.event-node {
			grid-column: 1;
			grid-row: 1;
			margin-top: 5px;
		}
		.event-overview {
			grid-column: 2;
			grid-row: 2;
			gap: 9px;
		}
		summary :global(.event-chevron) {
			grid-column: 3;
			grid-row: 1;
			margin-top: 1px;
		}
		.timeline-list > li::before {
			left: 12px;
		}
		.event-title {
			font-size: 20px;
		}
		.event-detail {
			margin-left: 33px;
			padding-right: 3px;
		}
		.event-detail.with-image {
			gap: 23px;
		}
		.event-story {
			font-size: 12px;
		}
	}
	@media (max-width: 420px) {
		.timeline-heading {
			padding-bottom: 32px;
		}
		.timeline-heading h1 {
			font-size: 39px;
		}
		.filter-panel {
			padding: 15px;
		}
		.filter-topline {
			align-items: start;
			flex-direction: column;
			gap: 5px;
			margin-bottom: 16px;
		}
		.reset-button {
			padding-left: 0;
		}
		.kind-buttons {
			gap: 6px;
		}
		.kind-buttons button {
			flex-grow: 1;
			justify-content: center;
			padding-inline: 9px;
			font-size: 10px;
		}
		.timeline-note {
			padding: 17px;
			gap: 10px;
		}
		.timeline-note > :global(svg) {
			display: none;
		}
	}
</style>
