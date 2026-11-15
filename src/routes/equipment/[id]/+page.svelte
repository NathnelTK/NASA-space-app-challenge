<script lang="ts">
	import { base } from '$app/paths';
	import {
		ArrowUpRight,
		ChevronRight,
		MapPin,
		Radio,
		Target,
		CalendarDays,
		ArrowLeft,
		ExternalLink
	} from '@lucide/svelte';
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils';
	import { sourceById } from '$lib/data/sources';
	import MediaImage from '$lib/components/MediaImage.svelte';
	import SourceRefs from '$lib/components/SourceRefs.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import EquipmentCard from '$lib/components/EquipmentCard.svelte';
	let { data }: { data: PageData } = $props();
	let item = $derived(data.item);
	let image = $derived(item.images[0]);
</script>

<svelte:head
	><title>{item.name} | Abandoned but Not Forgotten</title><meta
		name="description"
		content={item.summary}
	/></svelte:head
>

<div class="shell detail-shell">
	<nav class="breadcrumb" aria-label="Breadcrumb">
		<a href={`${base}/`}>Home</a><ChevronRight /><a href={`${base}/explore`}>The collection</a
		><ChevronRight /><a href={`${base}/explore?destination=${encodeURIComponent(item.destination)}`}
			>{item.destination}</a
		><ChevronRight /><span aria-current="page">{item.shortName}</span>
	</nav>
	<header class="exhibit-header">
		<div>
			<span class="eyebrow">{item.destination.toUpperCase()} / {item.mission.toUpperCase()}</span>
			<h1>{item.name}</h1>
			<p>{item.chapter}</p>
		</div>
		<span class="pill" class:pill-green={item.status === 'Passive science'}>{item.status}</span>
	</header>
	<div class="exhibit-hero">
		<figure class="main-photo">
			<div class="main-photo-frame"><MediaImage {image} eager /></div>
			<figcaption>
				<span>{image.kind} · {image.credit}</span><a
					href={image.originalUrl}
					target="_blank"
					rel="noreferrer">Original archive <ArrowUpRight size={11} /></a
				>
			</figcaption>
		</figure>
		<aside class="mission-card">
			<span class="dossier-label">THE MISSION FILE</span>
			<h2>{item.mission}</h2>
			<dl>
				<div>
					<dt>Destination</dt>
					<dd>{item.destination}</dd>
				</div>
				<div>
					<dt>Equipment</dt>
					<dd>{item.equipmentType}</dd>
				</div>
				<div>
					<dt>Launch date</dt>
					<dd>{formatDate(item.launchDate)}</dd>
				</div>
				<div>
					<dt>{item.deploymentLabel}</dt>
					<dd>{item.deploymentDate ? formatDate(item.deploymentDate) : 'Not applicable'}</dd>
				</div>
				<div>
					<dt>Mission conclusion</dt>
					<dd>
						{item.missionEndDate
							? formatDate(item.missionEndDate)
							: item.status === 'Passive science'
								? 'No instrument shutdown recorded'
								: 'Unknown'}
					</dd>
				</div>
			</dl>
			<p class="date-note">{item.dateNote}</p>
			<SourceRefs ids={item.fieldSources.dates} />
			<div class="location-mini"><MapPin size={16} /><span>{item.location.name}</span></div>
			{#if item.destination !== 'Deep Space'}<a
					class="button button-secondary button-small"
					href={`${base}/atlas?destination=${item.destination}&equipment=${item.id}`}
					>Locate the mission <ArrowUpRight /></a
				>{:else}<p class="deep-note">
					No surface coordinates. This spacecraft did not land on a planet.
				</p>{/if}
		</aside>
	</div>
	<nav class="exhibit-nav" aria-label="Exhibit sections">
		<a href="#story">The story</a><a href="#discoveries">The discoveries</a><a href="#history"
			>Mission history</a
		><a href="#gallery">The archive</a><a href="#references">Sources</a>
	</nav>
	<div class="exhibit-body">
		<div class="main-story">
			<section id="story" class="exhibit-section">
				<span class="eyebrow">WHY THIS MACHINE MATTERED</span>
				<h2>A mission with a purpose.</h2>
				<p class="story-lead">{item.story}</p>
				<div class="explanation">
					<div class="explanation-title">
						<Target size={17} />
						<h3>What it was sent to do</h3>
					</div>
					<p>{item.purpose}</p>
					<SourceRefs ids={item.fieldSources.purpose} />
				</div>
				<div class="explanation">
					<div class="explanation-title">
						<Radio size={17} />
						<h3>How it worked</h3>
					</div>
					<p>{item.functionality}</p>
					<SourceRefs ids={item.fieldSources.functionality} />
				</div>
			</section>
			<section id="discoveries" class="exhibit-section">
				<span class="eyebrow">WHAT CAME BACK TO EARTH</span>
				<h2>A lasting scientific legacy.</h2>
				<div class="discoveries">
					{#each item.scientificContributions as contribution, i}<div class="discovery">
							<span>{String(i + 1).padStart(2, '0')}</span>
							<div>
								<p>{contribution.text}</p>
								<SourceRefs ids={contribution.sourceIds} />
							</div>
						</div>{/each}
				</div>
			</section>
			<section id="history" class="exhibit-section">
				<div class="section-topline">
					<div>
						<span class="eyebrow">FROM LAUNCH TO LEGACY</span>
						<h2>The mission, in moments.</h2>
					</div>
					<a class="text-link" href={`${base}/timeline?equipment=${item.id}`}
						>Full timeline <ArrowUpRight /></a
					>
				</div>
				<div class="event-list">
					{#each item.timeline as event, index}<details open={index === 0}>
							<summary
								><span class="event-date">{formatDate(event.date)}</span><span class="event-title"
									>{event.title}</span
								><ChevronRight size={14} /></summary
							>
							<div class="event-content">
								<span class="pill">{event.type}</span>
								<p>{event.description}</p>
								<SourceRefs ids={event.sourceIds} />
							</div>
						</details>{/each}
				</div>
			</section>
			<section id="gallery" class="exhibit-section">
				<span class="eyebrow">REAL IMAGES. REAL HISTORY.</span>
				<h2>From the mission archives.</h2>
				<p class="gallery-intro">
					Historical imagery, with its original context and credits. Select a photograph to look
					closer.
				</p>
				{#key item.id}<Gallery images={item.images} />{/key}
			</section>
		</div>
		<aside class="story-sidebar">
			<section class="status-panel">
				<span class="eyebrow">WHERE THE STORY STANDS</span>
				<h2>{item.status}</h2>
				<p>{item.statusDetail}</p>
				<SourceRefs ids={item.fieldSources.status} />
			</section>
			<section class="status-panel location-panel">
				<MapPin size={19} />
				<h2>{item.location.name}</h2>
				<span class="pill">{item.location.locationAccuracy}</span>
				<p>{item.location.description}</p>
				{#if item.location.coordinates}<p class="coordinate-readout">
						{Math.abs(item.location.coordinates.latitude)}° {item.location.coordinates.latitude < 0
							? 'S'
							: 'N'} / {Math.abs(item.location.coordinates.longitude)}° {item.location.coordinates
							.longitude < 0
							? 'W'
							: 'E'}
					</p>
					<p class="coordinate-note">
						Reported coordinate reference, not a live observation. See source and location-accuracy
						note.
					</p>{:else}<p class="coordinate-note">
						Verified numerical position: {item.destination === 'Deep Space'
							? 'Not applicable to this surface atlas; current position Unknown.'
							: 'Not verified for this collection.'}
					</p>{/if}<SourceRefs ids={item.location.sourceIds} />
			</section>
			<section id="facts" class="status-panel fact-panel">
				<span class="eyebrow">DID YOU KNOW?</span>{#each item.interestingFacts as fact}<div
						class="sidebar-fact"
					>
						<p>{fact.text}</p>
						<SourceRefs ids={fact.sourceIds} />
					</div>{/each}
			</section>
		</aside>
	</div>
	<section id="references" class="references-section">
		<span class="eyebrow">FOLLOW THE EVIDENCE</span>
		<h2>Every story has a source.</h2>
		<p class="reference-intro">
			Educational wording and data structuring are AI-assisted. The historical and scientific claims
			above are linked to the records below. No AI-generated media is used.
		</p>
		<div class="reference-list">
			{#each item.sources as id}{#if sourceById[id]}<a
						href={sourceById[id].url}
						target="_blank"
						rel="noreferrer"
						><div>
							<span>{sourceById[id].organization}</span>
							<h3>{sourceById[id].name}</h3>
							<p>{sourceById[id].usage}</p>
						</div>
						<ExternalLink size={15} /></a
					>{/if}{/each}
		</div>
		<a class="text-link" href={`${base}/sources`}
			>Full references, usage conditions & eligibility notes <ArrowUpRight /></a
		>
	</section>
	{#if data.related.length}<section class="related-section">
			<div class="section-topline">
				<div>
					<span class="eyebrow">THE NEXT CHAPTER</span>
					<h2>Keep exploring.</h2>
				</div>
				<a class="text-link" href={`${base}/explore`}>Back to the collection <ArrowUpRight /></a>
			</div>
			<div class="related-grid">
				{#each data.related.slice(0, 3) as related}<EquipmentCard item={related} />{/each}
			</div>
		</section>{/if}
</div>

<style>
	.detail-shell {
		padding-top: 30px;
	}
	.exhibit-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 25px;
		margin-block: 34px 33px;
	}
	.exhibit-header h1 {
		font-size: clamp(39px, 5.3vw, 63px);
		letter-spacing: -0.055em;
		line-height: 1.08;
		font-weight: 500;
		margin-top: 16px;
	}
	.exhibit-header p {
		color: #a1b3ce;
		font-family: var(--font-display);
		font-size: 18px;
		margin-top: 14px;
	}
	.exhibit-header > .pill {
		white-space: nowrap;
		font-size: 10px;
		padding: 7px 11px;
	}
	.exhibit-hero {
		display: grid;
		grid-template-columns: 1.75fr 1fr;
		gap: 28px;
		align-items: start;
	}
	.main-photo {
		margin: 0;
	}
	.main-photo-frame {
		height: 485px;
		border: 1px solid var(--line);
		border-radius: 7px;
		overflow: hidden;
	}
	.main-photo-frame :global(img) {
		object-position: center;
	}
	.main-photo figcaption {
		display: flex;
		align-items: start;
		justify-content: space-between;
		gap: 15px;
		color: #8e9db4;
		font-size: 9px;
		line-height: 1.6;
		padding-top: 12px;
	}
	.main-photo figcaption a {
		display: flex;
		align-items: center;
		gap: 5px;
		white-space: nowrap;
	}
	.mission-card {
		padding: 28px;
		border: 1px solid var(--line);
		border-radius: 7px;
		background: #101a28;
	}
	.dossier-label {
		color: #90a7c8;
		font-size: 8px;
		letter-spacing: 0.16em;
	}
	.mission-card h2 {
		font-size: 25px;
		font-weight: 500;
		margin-top: 11px;
	}
	dl {
		margin-block: 18px;
	}
	dl > div {
		display: flex;
		align-items: start;
		justify-content: space-between;
		gap: 18px;
		padding-block: 12px;
		border-bottom: 1px solid var(--line);
		font-size: 11px;
	}
	dt {
		color: #90a1ba;
	}
	dd {
		text-align: right;
		margin: 0;
		max-width: 180px;
		color: #e0e9f8;
	}
	.date-note {
		color: #94a6c1;
		font-size: 10px;
		line-height: 1.8;
	}
	.location-mini {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 11px;
		color: #b3c4dd;
		padding-block: 20px 14px;
	}
	.mission-card .button {
		width: 100%;
		margin-top: 4px;
		font-size: 10px;
	}
	.deep-note {
		font-size: 10px;
		color: #92a3bd;
	}
	.exhibit-nav {
		display: flex;
		gap: 32px;
		border-bottom: 1px solid var(--line);
		margin-top: 37px;
	}
	.exhibit-nav a {
		color: #a6b5cc;
		font-size: 11px;
		padding-block: 18px;
		white-space: nowrap;
	}
	.exhibit-nav a:hover {
		color: #a9c6ff;
	}
	.exhibit-body {
		display: grid;
		grid-template-columns: 1.75fr 1fr;
		gap: 54px;
	}
	.exhibit-section {
		padding-block: 45px;
		border-bottom: 1px solid var(--line);
	}
	.exhibit-section h2,
	.references-section h2,
	.related-section h2 {
		font-size: 29px;
		font-weight: 500;
		letter-spacing: -0.04em;
		margin-top: 13px;
	}
	.story-lead {
		font-size: 16px;
		line-height: 1.9;
		color: #bccae0;
		margin-top: 23px;
	}
	.explanation {
		margin-top: 29px;
		padding-top: 24px;
		border-top: 1px solid var(--line);
	}
	.explanation-title {
		display: flex;
		align-items: center;
		gap: 10px;
		color: #9bbaff;
	}
	.explanation-title h3 {
		color: #e0eafa;
		font-weight: 500;
		font-size: 18px;
		letter-spacing: -0.015em;
	}
	.explanation > p {
		color: #a8b6cc;
		font-size: 13px;
		line-height: 1.9;
		margin-top: 13px;
	}
	.discovery {
		display: flex;
		gap: 22px;
		padding-block: 25px;
		border-bottom: 1px solid var(--line);
	}
	.discovery:last-child {
		border: 0;
		padding-bottom: 0;
	}
	.discovery > span {
		color: #779bcf;
		font-family: var(--font-display);
		font-size: 16px;
		padding-top: 2px;
	}
	.discovery p {
		font-size: 14px;
		color: #c0cde1;
		line-height: 1.85;
	}
	.story-sidebar {
		padding-top: 45px;
	}
	.status-panel {
		padding: 25px;
		border: 1px solid var(--line);
		background: #0e1724;
		border-radius: 6px;
		margin-bottom: 25px;
	}
	.status-panel .eyebrow {
		font-size: 8px;
	}
	.status-panel h2 {
		font-size: 22px;
		font-weight: 500;
		margin-top: 15px;
	}
	.status-panel p {
		font-size: 12px;
		color: #a6b7d0;
		line-height: 1.85;
		margin-top: 14px;
	}
	.location-panel > :global(svg) {
		color: #8dace4;
	}
	.location-panel .pill {
		margin-top: 12px;
		font-size: 8px;
	}
	.coordinate-readout {
		font-family: var(--font-display);
		letter-spacing: 0.03em;
		color: #d9e6fa !important;
	}
	.status-panel .coordinate-note {
		font-size: 10px;
		color: #8c9fbf;
	}
	.sidebar-fact + .sidebar-fact {
		padding-top: 17px;
		border-top: 1px solid var(--line);
		margin-top: 19px;
	}
	.event-list {
		border-left: 1px solid #314769;
		padding-left: 24px;
	}
	.event-list details {
		position: relative;
		border-bottom: 1px solid var(--line);
	}
	.event-list details::before {
		position: absolute;
		content: '';
		top: 27px;
		left: -29px;
		height: 8px;
		width: 8px;
		border-radius: 50%;
		background: #83a9ee;
		outline: 5px solid #080d15;
	}
	.event-list summary {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px 18px;
		padding-block: 20px;
		cursor: pointer;
		list-style: none;
	}
	.event-list summary::-webkit-details-marker {
		display: none;
	}
	.event-date {
		color: #91b0e3;
		font-family: var(--font-display);
		font-size: 11px;
		min-width: 94px;
	}
	.event-title {
		flex: 1;
		font-size: 12px;
		color: #cbd8ed;
	}
	.event-list details[open] summary > :global(svg) {
		transform: rotate(90deg);
	}
	.event-content {
		padding-bottom: 23px;
	}
	.event-content p {
		margin-top: 13px;
		color: #9eafc8;
		font-size: 12px;
	}
	.event-content .pill {
		font-size: 8px;
	}
	.gallery-intro {
		font-size: 12px;
		color: #a0b0c8;
		margin-block: 17px 23px;
	}
	.references-section {
		padding-block: 49px;
		border-bottom: 1px solid var(--line);
	}
	.reference-intro {
		max-width: 700px;
		color: #9caec8;
		font-size: 12px;
		margin-top: 18px;
	}
	.reference-list {
		margin-block: 24px 15px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}
	.reference-list a {
		display: flex;
		justify-content: space-between;
		align-items: start;
		gap: 15px;
		padding: 20px;
		border: 1px solid var(--line);
		border-radius: 5px;
	}
	.reference-list a:hover {
		border-color: #6687b6;
	}
	.reference-list a span {
		font-size: 8px;
		color: #8da7cb;
	}
	.reference-list h3 {
		font-size: 13px;
		font-weight: 500;
		margin-top: 8px;
	}
	.reference-list p {
		font-size: 10px;
		color: #8da0bc;
		margin-top: 8px;
	}
	.reference-list :global(svg) {
		color: #87a8d5;
		margin-top: 4px;
	}
	.related-section {
		padding-block: 49px 75px;
	}
	.related-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}
	@media (max-width: 1024px) {
		.exhibit-hero {
			grid-template-columns: 1.3fr 1fr;
			gap: 22px;
		}
		.main-photo-frame {
			height: 520px;
		}
		.mission-card {
			padding: 23px;
		}
		.exhibit-body {
			grid-template-columns: 1.5fr 1fr;
			gap: 30px;
		}
		.status-panel {
			padding: 20px;
		}
	}
	@media (max-width: 760px) {
		.exhibit-hero,
		.exhibit-body {
			grid-template-columns: 1fr;
		}
		.main-photo-frame {
			height: 440px;
		}
		.exhibit-header {
			align-items: start;
			flex-wrap: wrap;
		}
		.exhibit-header h1 {
			font-size: 43px;
		}
		.exhibit-header p {
			font-size: 17px;
		}
		.mission-card dl {
			display: grid;
			grid-template-columns: 1fr 1fr;
			column-gap: 28px;
		}
		.story-sidebar {
			padding-top: 0;
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 20px;
		}
		.status-panel {
			margin: 0;
		}
		.fact-panel {
			grid-column: 1 / -1;
		}
		.related-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.related-grid > :global(:nth-child(3)) {
			display: none;
		}
		.exhibit-nav {
			gap: 25px;
			overflow-x: auto;
		}
	}
	@media (max-width: 540px) {
		.references-section > .text-link {
			max-width: 100%;
			white-space: normal;
			align-items: flex-start;
			overflow-wrap: anywhere;
		}
		.main-photo-frame {
			height: 350px;
		}
		.main-photo figcaption {
			font-size: 8px;
			flex-wrap: wrap;
			gap: 5px;
		}
		.mission-card dl {
			grid-template-columns: 1fr;
		}
		.story-sidebar {
			grid-template-columns: 1fr;
		}
		.exhibit-header h1 {
			font-size: 39px;
		}
		.exhibit-section {
			padding-block: 35px;
		}
		.exhibit-section h2,
		.references-section h2 {
			font-size: 26px;
		}
		.story-lead {
			font-size: 14px;
		}
		.reference-list,
		.related-grid {
			grid-template-columns: 1fr;
		}
		.event-date {
			min-width: 90px;
			font-size: 10px;
		}
		.event-title {
			font-size: 11px;
		}
		.related-section {
			padding-block: 37px 50px;
		}
		.reference-list a {
			padding: 17px;
		}
	}
</style>
