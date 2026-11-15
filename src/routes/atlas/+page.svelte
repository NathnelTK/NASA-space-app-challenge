<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import {
		ArrowDown,
		ArrowLeft,
		ArrowRight,
		ArrowUp,
		ArrowUpRight,
		BookOpen,
		Crosshair,
		ExternalLink,
		Globe2,
		Info,
		Minus,
		Plus,
		RotateCcw
	} from '@lucide/svelte';
	import PlanetaryGlobe from '$lib/components/PlanetaryGlobe.svelte';
	import { equipment } from '$lib/data/equipment';
	import { sourceById } from '$lib/data/sources';
	import type { Equipment } from '$lib/data/types';
	import {
		coordinatesFor,
		formatCoordinates,
		MAX_ZOOM,
		MIN_ZOOM,
		projectAtlas,
		surfaceDestination,
		wrapLongitude,
		type Coordinates,
		type ProjectedSite,
		type SurfaceDestination,
		type ViewPosition
	} from '$lib/atlas';

	type AtlasState = {
		mission: string;
		equipmentType: string;
		selectedId: string | null;
		center: Coordinates;
		zoom: number;
	};
	const initialCenters: Record<SurfaceDestination, Coordinates> = {
		Moon: { latitude: 15, longitude: 10 },
		Mars: { latitude: 15, longitude: 0 }
	};
	const positionLabels: Record<ViewPosition, string> = {
		'in-view': 'In this view',
		'far-side': 'Far side of globe',
		'outside-frame': 'Outside zoomed frame'
	};
	let states = $state<Record<SurfaceDestination, AtlasState>>({
		Moon: {
			mission: '',
			equipmentType: '',
			selectedId: null,
			center: { ...initialCenters.Moon },
			zoom: 1
		},
		Mars: {
			mission: '',
			equipmentType: '',
			selectedId: null,
			center: { ...initialCenters.Mars },
			zoom: 1
		}
	});

	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});
	// Match the query-free static HTML until hydration finishes, then follow client URL changes.
	let params = $derived(mounted ? page.url.searchParams : new URLSearchParams());
	let linkedRecord = $derived(equipment.find((item) => item.id === params.get('equipment')));
	let destinationQuery = $derived(linkedRecord?.destination ?? params.get('destination'));
	let destination = $derived(surfaceDestination(destinationQuery));
	let deepSpaceRequested = $derived(
		destinationQuery
			?.trim()
			.toLowerCase()
			.replace(/[\s_-]+/g, '') === 'deepspace'
	);
	let current = $derived(states[destination]);
	let destinationRecords = $derived(equipment.filter((item) => item.destination === destination));
	let missions = $derived([...new Set(destinationRecords.map((item) => item.mission))].sort());
	let equipmentTypes = $derived(
		[...new Set(destinationRecords.map((item) => item.equipmentType))].sort()
	);
	let filteredRecords = $derived(
		destinationRecords.filter(
			(item) =>
				(!current.mission || item.mission === current.mission) &&
				(!current.equipmentType || item.equipmentType === current.equipmentType)
		)
	);
	let view = $derived(projectAtlas(filteredRecords, current.center, current.zoom));
	let siteByRecord = $derived(
		new Map(view.sites.flatMap((site) => site.records.map((item) => [item.id, site] as const)))
	);
	let selected = $derived(
		filteredRecords.find((item) => item.id === current.selectedId) ?? filteredRecords[0] ?? null
	);
	let selectedSite = $derived(selected ? siteByRecord.get(selected.id) : undefined);
	let plottedCount = $derived(view.sites.reduce((count, site) => count + site.records.length, 0));
	let inViewCount = $derived(
		view.sites
			.filter((site) => site.state === 'in-view')
			.reduce((count, site) => count + site.records.length, 0)
	);
	let farSideCount = $derived(
		view.sites
			.filter((site) => site.state === 'far-side')
			.reduce((count, site) => count + site.records.length, 0)
	);
	let outsideCount = $derived(plottedCount - inViewCount - farSideCount);
	let unplottedCount = $derived(filteredRecords.length - plottedCount);
	let beyondSurface = $derived(
		equipment.filter((item) => item.destination !== 'Moon' && item.destination !== 'Mars')
	);
	let hasFilters = $derived(Boolean(current.mission || current.equipmentType));

	$effect(() => {
		const item = linkedRecord;
		if (!item || (item.destination !== 'Moon' && item.destination !== 'Mars')) return;
		const body = item.destination;
		// Only a changed link target reapplies its view, never manual selection, filters, or rotation.
		untrack(() => {
			const state = states[body];
			state.mission = '';
			state.equipmentType = '';
			state.selectedId = item.id;
			const coordinates = coordinatesFor(item);
			if (coordinates) state.center = coordinates;
		});
	});

	function chooseDestination(next: SurfaceDestination) {
		const url = new URL(page.url);
		url.searchParams.set('destination', next.toLowerCase());
		url.searchParams.delete('equipment');
		void goto(url, { keepFocus: true, noScroll: true });
	}

	function selectRecord(item: Equipment) {
		current.selectedId = item.id;
		const coordinates = coordinatesFor(item);
		if (coordinates) current.center = coordinates;
	}

	function selectSite(site: ProjectedSite) {
		current.selectedId =
			site.records.find((item) => item.id === selected?.id)?.id ?? site.records[0].id;
	}

	function changeFilter(field: 'mission' | 'equipmentType', value: string) {
		current[field] = value;
		current.selectedId = null;
		if (filteredRecords[0]) selectRecord(filteredRecords[0]);
	}

	function clearFilters() {
		current.mission = '';
		current.equipmentType = '';
		current.selectedId = null;
		if (filteredRecords[0]) selectRecord(filteredRecords[0]);
	}

	function rotate(longitude: number, latitude: number) {
		current.center = {
			longitude: wrapLongitude(current.center.longitude + longitude),
			latitude: Math.max(-90, Math.min(90, current.center.latitude + latitude))
		};
	}

	function zoomBy(amount: number) {
		current.zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, current.zoom + amount));
	}

	function resetView() {
		current.center = { ...initialCenters[destination] };
		current.zoom = 1;
	}
</script>

<svelte:head>
	<title>Planetary Atlas | Abandoned but Not Forgotten</title>
	<meta
		name="description"
		content="Explore a schematic coordinate atlas of lunar and Martian mission sites. Rotate the globe, compare recorded locations, and follow the original sources."
	/>
</svelte:head>

{#snippet locationSources(item: Equipment)}
	{@const ids = [
		...new Set(item.location.sourceIds.length ? item.location.sourceIds : item.sources)
	]}
	<div class="location-sources">
		<span class="source-heading"
			>{item.location.sourceIds.length
				? 'Location sources'
				: 'Record sources; no separate location citation'}</span
		>
		{#each ids as sourceId}
			{@const source = sourceById[sourceId]}
			<div class="source-line">
				<a class="source-ref" href={`${base}/sources#${encodeURIComponent(sourceId)}`}
					><BookOpen size={12} aria-hidden="true" />{source?.name ?? sourceId}</a
				>
				{#if source}
					<a
						class="original-source"
						href={source.url}
						target="_blank"
						rel="noreferrer"
						aria-label={`Open original source: ${source.name} (new tab)`}
						><ExternalLink size={12} aria-hidden="true" /></a
					>
				{/if}
			</div>
		{/each}
		{#if !ids.length}<span class="missing-source">No source link is supplied for this record.</span
			>{/if}
	</div>
{/snippet}

<div class="shell atlas-page">
	<header class="page-heading">
		<span class="eyebrow">The places we reached</span>
		<h1>The planetary atlas<span>.</span></h1>
		<p>
			A few coordinates. A remarkable human story. Explore recorded mission sites on the Moon and
			Mars, and the equipment that connects us to them.
		</p>
	</header>

	<div class="atlas-toolbar">
		<fieldset class="destination-switch">
			<legend>Choose a world</legend>
			<div>
				{#each ['Moon', 'Mars'] as world}
					<button
						type="button"
						class:active={destination === world}
						aria-pressed={destination === world}
						onclick={() => chooseDestination(world as SurfaceDestination)}
						><span class="world-dot" class:mars={world === 'Mars'} aria-hidden="true"
						></span>{world}</button
					>
				{/each}
			</div>
		</fieldset>
		<div class="field">
			<label for="atlas-mission">Mission</label>
			<select
				id="atlas-mission"
				value={current.mission}
				onchange={(event) => changeFilter('mission', event.currentTarget.value)}
			>
				<option value="">All missions</option>
				{#each missions as mission}<option value={mission}>{mission}</option>{/each}
			</select>
		</div>
		<div class="field">
			<label for="atlas-type">Equipment type</label>
			<select
				id="atlas-type"
				value={current.equipmentType}
				onchange={(event) => changeFilter('equipmentType', event.currentTarget.value)}
			>
				<option value="">All equipment</option>
				{#each equipmentTypes as type}<option value={type}>{type}</option>{/each}
			</select>
		</div>
		<a class="register-link" href="#site-register"
			>The site register <ArrowDown size={14} aria-hidden="true" /></a
		>
	</div>

	{#if deepSpaceRequested}
		<p class="notice query-notice">
			Deep-space records have no planetary surface coordinates. They are listed <a
				href="#beyond-surface">beyond the surface atlas</a
			>; this globe opens on the Moon.
		</p>
	{/if}

	<div class="atlas-grid">
		<section class="map-panel" aria-labelledby="globe-heading">
			<div class="map-heading">
				<div>
					<span class="map-kicker">Orthographic projection</span>
					<h2 id="globe-heading">{destination}</h2>
				</div>
				<span class="schematic-label"
					><Globe2 size={14} aria-hidden="true" />Schematic, not imagery</span
				>
			</div>
			<PlanetaryGlobe
				{destination}
				{view}
				selectedId={selected?.id ?? null}
				onselect={selectSite}
			/>
			<div class="map-controls">
				<div class="control-group" role="group" aria-label="Rotate the globe">
					<button
						type="button"
						class="icon-button"
						onclick={() => rotate(-15, 0)}
						aria-label="Rotate west by 15 degrees"
						title="Rotate west"><ArrowLeft size={17} aria-hidden="true" /></button
					>
					<button
						type="button"
						class="icon-button"
						onclick={() => rotate(0, 15)}
						disabled={current.center.latitude >= 90}
						aria-label="Rotate north by 15 degrees"
						title="Rotate north"><ArrowUp size={17} aria-hidden="true" /></button
					>
					<button
						type="button"
						class="icon-button"
						onclick={() => rotate(0, -15)}
						disabled={current.center.latitude <= -90}
						aria-label="Rotate south by 15 degrees"
						title="Rotate south"><ArrowDown size={17} aria-hidden="true" /></button
					>
					<button
						type="button"
						class="icon-button"
						onclick={() => rotate(15, 0)}
						aria-label="Rotate east by 15 degrees"
						title="Rotate east"><ArrowRight size={17} aria-hidden="true" /></button
					>
				</div>
				<div class="control-group" role="group" aria-label="Globe zoom">
					<button
						type="button"
						class="icon-button"
						onclick={() => zoomBy(-0.25)}
						disabled={current.zoom <= MIN_ZOOM}
						aria-label="Zoom out"><Minus size={17} aria-hidden="true" /></button
					>
					<output class="zoom-value" aria-label="Zoom level"
						>{Math.round(current.zoom * 100)}%</output
					>
					<button
						type="button"
						class="icon-button"
						onclick={() => zoomBy(0.25)}
						disabled={current.zoom >= MAX_ZOOM}
						aria-label="Zoom in"><Plus size={17} aria-hidden="true" /></button
					>
				</div>
				<button type="button" class="reset-view" onclick={resetView}
					><RotateCcw size={14} aria-hidden="true" />Reset view</button
				>
			</div>
			<p class="view-center">View center <span>{formatCoordinates(current.center, 2)}</span></p>
			<div class="view-counts" role="status" aria-live="polite" aria-atomic="true">
				<span class="visible-count"
					><i aria-hidden="true"></i><strong>{inViewCount}</strong> of {plottedCount} plotted records
					in view</span
				>
				<span>{farSideCount} on far side</span>
				{#if outsideCount}<span>{outsideCount} outside frame</span>{/if}
				{#if unplottedCount}<span>{unplottedCount} without usable coordinates</span>{/if}
			</div>
		</section>

		<aside
			id="selected-record-details"
			class="record-details"
			aria-labelledby="selected-record-heading"
		>
			<span class="eyebrow">Selected record</span>
			{#if selected}
				<div class="record-meta">
					<span>{selected.mission}</span><span>{selected.equipmentType}</span>
				</div>
				<h2 id="selected-record-heading">{selected.shortName}</h2>
				<p class="selected-summary">{selected.summary}</p>
				<dl class="location-readout">
					<div>
						<dt>Recorded site</dt>
						<dd>{selected.location.name}</dd>
					</div>
					<div>
						<dt>Latitude / Longitude</dt>
						<dd class="coordinates">
							{selectedSite
								? formatCoordinates(selectedSite.coordinates)
								: 'No usable surface coordinates supplied'}
						</dd>
					</div>
				</dl>
				<div class="accuracy-note">
					<Info size={15} aria-hidden="true" />
					<div>
						<strong>{selected.location.locationAccuracy}</strong>
						<p>{selected.location.description}</p>
					</div>
				</div>
				{#if selectedSite}
					<p class="selected-position">
						{positionLabels[selectedSite.state]}. This describes the projection, not hardware
						visibility.
					</p>
					<button
						type="button"
						class="button button-secondary center-site"
						onclick={() => selectRecord(selected)}
						><Crosshair size={15} aria-hidden="true" />Center this site</button
					>
				{:else}
					<p class="notice unplotted-note">
						This record stays in the register, but no marker can be placed without usable
						coordinates. Selecting it does not move the globe.
					</p>
				{/if}
				{#if selectedSite && selectedSite.records.length > 1}
					<div class="shared-site">
						<p>
							{selectedSite.records.length} records share this reported coordinate. Choose an object,
							not an assumed exact position.
						</p>
						<div role="group" aria-label="Equipment at this reported coordinate">
							{#each selectedSite.records as item}
								<button
									type="button"
									class:active={selected.id === item.id}
									aria-pressed={selected.id === item.id}
									onclick={() => selectRecord(item)}>{item.shortName}</button
								>
							{/each}
						</div>
					</div>
				{/if}
				{@render locationSources(selected)}
				<a class="button button-primary equipment-link" href={`${base}/equipment/${selected.id}`}
					>Open equipment record<ArrowUpRight size={16} aria-hidden="true" /></a
				>
				<p class="sr-only" role="status" aria-live="polite">
					Selected {selected.name}. {selectedSite
						? formatCoordinates(selectedSite.coordinates)
						: 'Not plotted: no usable surface coordinates.'}
				</p>
			{:else}
				<h2 id="selected-record-heading" class="no-results-title">No matching records.</h2>
				<p class="selected-summary">
					This mission and equipment-type combination has no records on {destination}. The empty
					globe is not evidence of an empty world.
				</p>
				<button type="button" class="button button-secondary equipment-link" onclick={clearFilters}
					>Clear filters</button
				>
			{/if}
		</aside>
	</div>

	<div class="atlas-method">
		<Info size={18} aria-hidden="true" />
		<div>
			<strong>A coordinate atlas, not a view from orbit.</strong>
			<p>
				Dots mark source-provided locations on a schematic sphere. Approximate mission sites are not
				necessarily exact or final equipment positions, especially for rovers. No terrain, craters,
				imagery, illumination, or object visibility is modeled. Tint and shading are decorative.
			</p>
			<p>
				The grid is spaced at 15&deg;; the solid reference is the equator and the dashed reference
				is the 0&deg; meridian. Counts on markers group identical reported coordinates. Leader lines
				separate nearby buttons without moving the coordinate dots. Rotate with the arrow buttons,
				or select a record below to center its site.
			</p>
		</div>
	</div>

	<section id="site-register" class="site-register" aria-labelledby="register-heading">
		<div class="register-heading">
			<div>
				<span class="eyebrow">An accessible view of every record</span>
				<h2 id="register-heading">The {destination} site register<span>.</span></h2>
				<p>
					{filteredRecords.length} of {destinationRecords.length} records match the current filters. Far-side
					and unplotted records remain selectable here.
				</p>
			</div>
			{#if hasFilters}<button
					type="button"
					class="button button-secondary button-small"
					onclick={clearFilters}>Clear filters</button
				>{/if}
		</div>
		{#if filteredRecords.length}
			<ul class="record-list">
				{#each filteredRecords as item, index (item.id)}
					{@const site = siteByRecord.get(item.id)}
					<li class:selected-record={selected?.id === item.id}>
						<button
							type="button"
							class="record-select"
							aria-pressed={selected?.id === item.id}
							aria-controls="selected-record-details"
							aria-label={`Select ${item.name}${site ? ' and center its site' : '; no surface coordinates supplied'}`}
							onclick={() => selectRecord(item)}
						>
							<span class="record-index">{String(index + 1).padStart(2, '0')}</span>
							<span class="record-name"
								><strong>{item.shortName}</strong><span>{item.mission} / {item.equipmentType}</span
								></span
							>
							<span class="record-coordinate"
								>{site ? formatCoordinates(site.coordinates) : 'Not plotted'}<small
									>{item.location.locationAccuracy}</small
								></span
							>
							<span class="record-position" class:in-view={site?.state === 'in-view'}
								>{site ? positionLabels[site.state] : 'Coordinates unavailable'}</span
							>
							<Crosshair size={16} aria-hidden="true" />
						</button>
						<div class="register-context">
							<p>
								<strong>{item.location.name}.</strong>
								{item.location.description}{#if !site}
									No marker is plotted; the globe cannot assign a location that the record does not
									supply.{/if}
							</p>
							<div class="register-links">
								{@render locationSources(item)}<a
									class="text-link"
									href={`${base}/equipment/${item.id}`}
									aria-label={`Open equipment record: ${item.name}`}
									>Open equipment<ArrowUpRight size={14} aria-hidden="true" /></a
								>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="notice empty-register">
				No records match both filters. Clear the filters to return to all recorded {destination} sites.
			</p>
		{/if}
	</section>

	{#if beyondSurface.length}
		<section id="beyond-surface" class="beyond-surface" aria-labelledby="beyond-heading">
			<div class="beyond-intro">
				<span class="eyebrow">Not every journey has a landing site</span>
				<h2 id="beyond-heading">Beyond the surface<span>.</span></h2>
				<p>
					These records have no Moon or Mars surface position. They are deliberately excluded from
					the globe, not from the story. This list is separate from the surface filters; it is not a
					live trajectory or tracking view.
				</p>
			</div>
			<ul class="beyond-list">
				{#each beyondSurface as item (item.id)}
					<li>
						<span class="beyond-meta">{item.destination} / {item.mission}</span>
						<h3>
							<a href={`${base}/equipment/${item.id}`}
								>{item.shortName}<ArrowUpRight size={16} aria-hidden="true" /></a
							>
						</h3>
						<p class="beyond-accuracy">{item.location.locationAccuracy} / Not plotted</p>
						<p><strong>{item.location.name}.</strong> {item.location.description}</p>
						{@render locationSources(item)}<a
							class="text-link"
							href={`${base}/equipment/${item.id}`}
							>Open equipment<ArrowUpRight size={14} aria-hidden="true" /></a
						>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</div>

<style>
	.atlas-page {
		padding-bottom: 88px;
	}
	.page-heading {
		padding-bottom: 38px;
	}
	.page-heading h1 > span,
	.register-heading h2 > span,
	.beyond-intro h2 > span {
		color: #578bff;
	}
	.atlas-toolbar {
		display: grid;
		grid-template-columns: 235px minmax(160px, 1fr) minmax(200px, 1fr) auto;
		align-items: end;
		gap: 24px;
		padding: 25px 0 29px;
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
		margin-bottom: 32px;
	}
	.destination-switch {
		border: 0;
		padding: 0;
		margin: 0;
		min-width: 0;
	}
	.destination-switch legend {
		color: #aab6c7;
		font-size: 10px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		font-weight: 600;
		margin-bottom: 8px;
	}
	.destination-switch > div {
		display: flex;
		gap: 6px;
	}
	.destination-switch button {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		min-height: 44px;
		flex: 1;
		padding: 11px 20px;
		border: 1px solid #ffffff1c;
		border-radius: 5px;
		background: transparent;
		color: #a7b4c7;
		font-size: 12px;
	}
	.destination-switch button.active {
		border-color: #578bff99;
		background: #578bff12;
		color: #eef4ff;
	}
	.destination-switch button:hover {
		border-color: #88a8e2;
	}
	.world-dot {
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background: linear-gradient(125deg, #afbdcd, #5b6b82);
		box-shadow: 0 0 0 3px #dbe7ff09;
	}
	.world-dot.mars {
		background: linear-gradient(125deg, #c2987e, #785746);
		box-shadow: 0 0 0 3px #ebac8009;
	}
	.register-link {
		display: inline-flex;
		align-items: center;
		justify-content: end;
		gap: 10px;
		padding-block: 15px;
		font-size: 11px;
		color: #aebed6;
		white-space: nowrap;
	}
	.register-link:hover {
		color: #fff;
	}
	.query-notice {
		margin-bottom: 26px;
	}
	.atlas-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 318px;
		gap: 34px;
		align-items: start;
	}
	.map-panel {
		background: #0c1420;
		border: 1px solid #ffffff12;
		border-radius: 7px;
		min-width: 0;
		overflow: hidden;
	}
	.map-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 14px;
		padding: 23px 26px 0;
	}
	.map-kicker {
		color: #8295af;
		font-size: 9px;
		letter-spacing: 0.13em;
		text-transform: uppercase;
	}
	.map-heading h2 {
		margin-top: 6px;
		font-size: 27px;
		letter-spacing: -0.04em;
		font-weight: 500;
	}
	.schematic-label {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 9px;
		color: #a2b5d0;
	}
	.map-controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 14px;
		padding: 20px 24px 0;
		border-top: 1px solid var(--line);
	}
	.control-group {
		display: flex;
		gap: 5px;
		align-items: center;
	}
	.control-group .icon-button {
		width: 44px;
		height: 44px;
		background: #ffffff02;
	}
	.zoom-value {
		min-width: 43px;
		text-align: center;
		color: #bac9df;
		font: 11px var(--font-display);
		font-variant-numeric: tabular-nums;
	}
	.reset-view {
		display: flex;
		align-items: center;
		gap: 8px;
		min-height: 44px;
		border: 0;
		padding: 8px 0 8px 4px;
		background: transparent;
		color: #bac9df;
		font-size: 10px;
	}
	.reset-view:hover {
		color: white;
	}
	.view-center {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 12px;
		padding: 17px 20px;
		font-size: 10px;
		color: #8295af;
	}
	.view-center span {
		font-family: var(--font-display);
		font-variant-numeric: tabular-nums;
		color: #bac9df;
	}
	.view-counts {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 10px 18px;
		padding: 15px 18px;
		background: #080f19;
		border-top: 1px solid var(--line);
		color: #8fa2bc;
		font-size: 10px;
		line-height: 1.7;
	}
	.visible-count {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		color: #b9c9e2;
	}
	.visible-count i {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		margin-right: 5px;
		background: #729fff;
	}
	.visible-count strong {
		font-weight: 500;
		color: #ecf2ff;
	}
	.record-details {
		min-width: 0;
		border-left: 1px solid var(--line);
		padding-left: 28px;
		padding-block: 7px;
	}
	.record-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 13px;
		margin-top: 26px;
		color: #8eabcf;
		font-size: 9px;
	}
	.record-meta > span + span {
		color: #96a2b4;
	}
	.record-details h2 {
		margin-top: 12px;
		font-size: 30px;
		line-height: 1.16;
		letter-spacing: -0.045em;
		font-weight: 500;
		text-wrap: balance;
	}
	.selected-summary {
		margin-top: 17px;
		color: #a5b1c3;
		font-size: 12px;
		line-height: 1.85;
	}
	.location-readout {
		display: grid;
		gap: 18px;
		padding-block: 23px;
		margin: 22px 0 0;
		border-top: 1px solid var(--line);
	}
	dt {
		color: #889bb5;
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: 0.09em;
	}
	dd {
		margin: 8px 0 0;
		color: #d0dbed;
		font-size: 12px;
		line-height: 1.6;
	}
	.coordinates {
		font-family: var(--font-display);
		font-size: 13px;
		font-variant-numeric: tabular-nums;
	}
	.accuracy-note {
		display: flex;
		gap: 10px;
		padding-top: 18px;
		border-top: 1px solid var(--line);
		color: #91a9cd;
	}
	.accuracy-note > :global(svg) {
		flex-shrink: 0;
		margin-top: 2px;
	}
	.accuracy-note strong {
		color: #b8c9e2;
		font-size: 10px;
		font-weight: 500;
	}
	.accuracy-note p {
		margin-top: 8px;
		color: #8e9fb7;
		font-size: 11px;
		line-height: 1.85;
	}
	.selected-position {
		margin-top: 17px;
		color: #91a5c2;
		font-size: 10px;
	}
	.center-site {
		width: 100%;
		margin-top: 12px;
		min-height: 42px;
		padding-block: 10px;
		font-size: 11px;
	}
	.unplotted-note {
		margin-top: 18px;
		padding: 13px 15px;
		font-size: 11px;
	}
	.shared-site {
		margin-top: 22px;
	}
	.shared-site > p {
		color: #9bafcc;
		font-size: 11px;
	}
	.shared-site > div {
		display: grid;
		gap: 6px;
		margin-top: 10px;
	}
	.shared-site button {
		text-align: left;
		min-height: 44px;
		padding: 10px 12px;
		border: 1px solid #ffffff1c;
		border-radius: 4px;
		background: transparent;
		color: #aabbd4;
		font-size: 11px;
	}
	.shared-site button.active {
		color: #e2ebff;
		background: #578bff12;
		border-color: #578bff66;
	}
	.shared-site button:hover {
		border-color: #8dabec;
	}
	.location-sources {
		display: grid;
		gap: 5px;
		min-width: 0;
	}
	.record-details .location-sources {
		margin-top: 24px;
	}
	.source-heading {
		display: block;
		margin-bottom: 3px;
		color: #8397b4;
		font-size: 9px;
		line-height: 1.5;
	}
	.source-line {
		display: flex;
		align-items: start;
		gap: 5px;
	}
	.source-line .source-ref {
		min-width: 0;
		padding-block: 4px;
		font-size: 10px;
		line-height: 1.7;
		overflow-wrap: anywhere;
	}
	.source-line :global(svg) {
		flex-shrink: 0;
	}
	.original-source {
		display: inline-grid;
		flex-shrink: 0;
		place-items: center;
		width: 28px;
		min-height: 28px;
		border-radius: 4px;
		color: #819cc5;
	}
	.original-source:hover {
		color: white;
		background: #578bff18;
	}
	.missing-source {
		color: #bcae91;
		font-size: 10px;
		line-height: 1.7;
	}
	.equipment-link {
		width: 100%;
		margin-top: 23px;
	}
	.record-details .no-results-title {
		margin-top: 28px;
	}
	.atlas-method {
		display: flex;
		align-items: start;
		gap: 15px;
		margin-top: 26px;
		padding: 22px 24px;
		border-left: 2px solid #578bff6b;
		background: #101a2866;
	}
	.atlas-method > :global(svg) {
		flex-shrink: 0;
		color: #819ecc;
		margin-top: 2px;
	}
	.atlas-method strong {
		font-family: var(--font-display);
		font-weight: 500;
		font-size: 14px;
		color: #cbd9ed;
	}
	.atlas-method p {
		max-width: 1000px;
		margin-top: 7px;
		font-size: 11px;
		color: #91a3bd;
		line-height: 1.85;
	}
	.site-register {
		padding-top: 64px;
	}
	.register-heading {
		display: flex;
		justify-content: space-between;
		align-items: end;
		gap: 20px;
		margin-bottom: 27px;
	}
	.register-heading h2,
	.beyond-intro h2 {
		margin-top: 13px;
		font-size: clamp(27px, 3.3vw, 36px);
		font-weight: 500;
		letter-spacing: -0.045em;
		line-height: 1.2;
	}
	.register-heading p {
		margin-top: 12px;
		color: #93a3ba;
		font-size: 12px;
	}
	.register-heading .button {
		flex-shrink: 0;
	}
	.record-list {
		list-style: none;
		padding: 0;
		margin: 0;
		border-top: 1px solid var(--line);
	}
	.record-list > li {
		border-bottom: 1px solid var(--line);
		padding: 3px 16px 23px;
		border-left: 2px solid transparent;
	}
	.record-list > li.selected-record {
		background: #578bff06;
		border-left-color: #578bff;
	}
	.record-select {
		width: 100%;
		display: grid;
		grid-template-columns: 31px minmax(180px, 1.25fr) minmax(195px, 1fr) minmax(116px, 0.65fr) 18px;
		align-items: center;
		gap: 17px;
		min-height: 90px;
		padding: 15px 0;
		border: 0;
		background: transparent;
		color: inherit;
		text-align: left;
	}
	.record-select:hover .record-name strong {
		color: #a6c0ff;
	}
	.record-index {
		font-family: var(--font-display);
		font-size: 11px;
		color: #7489a5;
	}
	.record-name {
		display: grid;
		gap: 7px;
	}
	.record-name strong {
		color: #d5e0f2;
		font-family: var(--font-display);
		font-size: 18px;
		letter-spacing: -0.025em;
		font-weight: 500;
	}
	.record-name > span {
		color: #8398b5;
		font-size: 10px;
		line-height: 1.6;
	}
	.record-coordinate {
		color: #bdcbe0;
		font-family: var(--font-display);
		font-size: 12px;
		font-variant-numeric: tabular-nums;
		line-height: 1.7;
	}
	.record-coordinate small {
		display: block;
		margin-top: 6px;
		font-family: var(--font-sans);
		color: #8398b5;
		font-size: 9px;
	}
	.record-position {
		color: #97a6bd;
		font-size: 10px;
		line-height: 1.7;
	}
	.record-position.in-view {
		color: #9bbcff;
	}
	.record-select > :global(svg) {
		color: #708aad;
	}
	.register-context {
		margin-left: 48px;
	}
	.register-context > p {
		max-width: 930px;
		color: #8ea1bd;
		font-size: 11px;
		line-height: 1.85;
	}
	.register-context > p > strong {
		color: #b9c8df;
		font-weight: 500;
	}
	.register-links {
		display: flex;
		justify-content: space-between;
		gap: 18px;
		align-items: end;
		margin-top: 17px;
	}
	.register-links .text-link {
		color: #aec6f3;
		font-size: 10px;
		flex-shrink: 0;
	}
	.empty-register {
		margin-top: 20px;
	}
	.beyond-surface {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
		gap: 66px;
		padding-top: 64px;
		margin-top: 64px;
		border-top: 1px solid var(--line);
	}
	.beyond-intro > p {
		color: #91a2bb;
		font-size: 12px;
		margin-top: 18px;
	}
	.beyond-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 30px;
	}
	.beyond-meta {
		display: block;
		color: #7f94b2;
		font-size: 9px;
		line-height: 1.6;
	}
	.beyond-list h3 {
		font-size: 21px;
		font-weight: 500;
		letter-spacing: -0.03em;
		margin-top: 11px;
	}
	.beyond-list h3 a {
		display: inline-flex;
		align-items: center;
		gap: 13px;
	}
	.beyond-list h3 a:hover {
		color: #a6c0ff;
	}
	.beyond-list p {
		color: #91a2bb;
		font-size: 11px;
		margin-top: 12px;
	}
	.beyond-list p strong {
		font-weight: 500;
		color: #b6c7df;
	}
	.beyond-list p.beyond-accuracy {
		font-size: 9px;
		color: #8195b2;
	}
	.beyond-list .location-sources {
		margin-top: 16px;
	}
	.beyond-list .text-link {
		margin-top: 15px;
		color: #acc5f4;
		font-size: 10px;
	}
	@media (max-width: 1120px) {
		.atlas-toolbar {
			grid-template-columns: 220px minmax(140px, 1fr) minmax(180px, 1fr);
			gap: 20px;
		}
		.register-link {
			display: none;
		}
		.atlas-grid {
			grid-template-columns: minmax(0, 1fr) 285px;
			gap: 24px;
		}
		.record-details {
			padding-left: 22px;
		}
		.map-controls {
			justify-content: center;
			gap: 9px 18px;
			padding-inline: 16px;
		}
		.record-select {
			grid-template-columns: 24px minmax(140px, 1.2fr) minmax(185px, 1fr) 115px 16px;
			gap: 13px;
		}
		.register-context {
			margin-left: 37px;
		}
		.beyond-surface {
			gap: 32px;
		}
	}
	@media (max-width: 940px) {
		.atlas-grid {
			grid-template-columns: 1fr;
			gap: 32px;
		}
		.record-details {
			border-left: 0;
			border-top: 1px solid var(--line);
			padding: 28px 0 0;
		}
		.record-meta {
			margin-top: 20px;
		}
		.record-details h2 {
			font-size: 34px;
		}
		.selected-summary {
			max-width: 650px;
		}
		.location-readout {
			grid-template-columns: 1fr 1fr;
		}
		.center-site,
		.equipment-link {
			width: auto;
		}
		.shared-site > div {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.record-select {
			grid-template-columns: 25px minmax(140px, 1.2fr) minmax(175px, 1fr) 16px;
		}
		.record-position {
			grid-column: 2 / 4;
			grid-row: 2;
			margin-top: -4px;
		}
		.record-select > :global(svg) {
			grid-column: 4;
			grid-row: 1;
		}
		.register-context {
			margin-left: 38px;
		}
		.beyond-surface {
			grid-template-columns: 1fr;
		}
		.beyond-intro {
			max-width: 560px;
		}
	}
	@media (max-width: 640px) {
		.atlas-page {
			padding-bottom: 58px;
		}
		.atlas-toolbar {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			gap: 19px 12px;
			padding-block: 23px;
			margin-bottom: 24px;
		}
		.destination-switch {
			grid-column: 1 / -1;
		}
		.destination-switch > div {
			max-width: 280px;
		}
		.field {
			min-width: 0;
		}
		.field select {
			padding-inline: 9px;
			font-size: 11px;
		}
		.map-heading {
			padding: 18px 17px 0;
			gap: 12px;
		}
		.map-kicker {
			font-size: 8px;
		}
		.map-heading h2 {
			font-size: 25px;
		}
		.schematic-label {
			max-width: 113px;
			font-size: 8px;
			line-height: 1.6;
		}
		.map-controls {
			padding-top: 17px;
			justify-content: space-between;
			column-gap: 10px;
		}
		.control-group {
			gap: 4px;
		}
		.view-counts {
			gap: 6px 15px;
		}
		.view-center {
			gap: 5px 10px;
			font-size: 9px;
		}
		.atlas-method {
			padding: 18px 15px;
			gap: 11px;
		}
		.atlas-method strong {
			font-size: 13px;
		}
		.atlas-method p {
			font-size: 10px;
		}
		.site-register {
			padding-top: 46px;
		}
		.register-heading {
			align-items: start;
			flex-direction: column;
		}
		.register-heading p {
			font-size: 11px;
		}
		.record-list > li {
			padding-inline: 10px;
		}
		.record-select {
			grid-template-columns: 21px minmax(0, 1fr) 16px;
			gap: 12px 10px;
			padding-block: 20px 13px;
		}
		.record-name strong {
			font-size: 18px;
		}
		.record-name > span {
			font-size: 9px;
		}
		.record-coordinate {
			grid-column: 2;
			grid-row: 2;
			font-size: 11px;
		}
		.record-position {
			grid-column: 2;
			grid-row: 3;
			margin-top: 0;
			font-size: 9px;
		}
		.record-select > :global(svg) {
			grid-column: 3;
		}
		.register-context {
			margin-left: 31px;
		}
		.register-context > p {
			font-size: 10px;
		}
		.register-links {
			align-items: start;
			flex-direction: column;
			gap: 9px;
		}
		.beyond-surface {
			padding-top: 44px;
			margin-top: 46px;
		}
		.beyond-list {
			gap: 25px;
		}
	}
	@media (max-width: 400px) {
		.map-controls {
			justify-content: center;
			gap: 12px 22px;
		}
		.location-readout {
			grid-template-columns: 1fr;
		}
		.shared-site > div {
			grid-template-columns: 1fr;
		}
		.center-site,
		.equipment-link {
			width: 100%;
		}
		.beyond-list {
			grid-template-columns: 1fr;
			gap: 28px;
		}
		.beyond-list > li + li {
			padding-top: 26px;
			border-top: 1px solid var(--line);
		}
	}
</style>
