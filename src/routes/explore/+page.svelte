<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { afterNavigate, replaceState } from '$app/navigation';
	import { Search, SlidersHorizontal, ArrowUpRight, RotateCcw, Map, X } from '@lucide/svelte';
	import { equipment, destinations, equipmentTypes } from '$lib/data/equipment';
	import { filterEquipment } from '$lib/utils';
	import EquipmentCard from '$lib/components/EquipmentCard.svelte';
	let filters = $state({
		query: '',
		destination: '',
		mission: '',
		type: '',
		year: '',
		sort: 'oldest'
	});
	function syncFilters(params: URLSearchParams) {
		filters.query = params.get('q') ?? '';
		filters.destination = params.get('destination') ?? '';
		filters.mission = params.get('mission') ?? '';
		filters.type = params.get('type') ?? '';
		filters.year = params.get('year') ?? '';
		filters.sort = params.get('sort') ?? 'oldest';
	}
	onMount(() => syncFilters(page.url.searchParams));
	afterNavigate(() => syncFilters(page.url.searchParams));
	let filtered = $derived(filterEquipment(equipment, filters));
	let hasFilters = $derived(
		Boolean(filters.query || filters.destination || filters.mission || filters.type || filters.year)
	);
	const missions = [...new Set(equipment.map((item) => item.mission))].sort();
	const years = [...new Set(equipment.map((item) => item.launchDate.slice(0, 4)))].sort();
	function updateFilter(key: string, value: string) {
		const url = new URL(window.location.href);
		if (value) url.searchParams.set(key, value);
		else url.searchParams.delete(key);
		if (key === 'destination') url.searchParams.delete('mission');
		syncFilters(url.searchParams);
		replaceState(url, page.state);
	}
	function reset() {
		const url = new URL(window.location.href);
		url.search = '';
		syncFilters(url.searchParams);
		replaceState(url, page.state);
	}
</script>

<svelte:head
	><title>The Collection | Abandoned but Not Forgotten</title><meta
		name="description"
		content="Search eight source-linked space equipment stories. Filter by Moon, Mars, deep space, mission, category, or launch year."
	/></svelte:head
>

<div class="shell">
	<header class="page-heading explorer-heading">
		<div>
			<span class="eyebrow">THE MUSEUM COLLECTION / VOLUME 01</span>
			<h1>Extraordinary machines.<br /><span>Unforgettable stories.</span></h1>
			<p>
				They carried our questions into the unknown. Get to know the hardware, the discoveries, and
				the people behind each mission.
			</p>
		</div>
		<a class="text-link" href={`${base}/atlas`}
			><Map size={15} /> Explore by location <ArrowUpRight /></a
		>
	</header>
	<div class="destination-tabs" role="group" aria-label="Filter by destination">
		{#each ['', ...destinations] as destination}
			<button
				class:active={filters.destination === destination}
				aria-pressed={filters.destination === destination}
				onclick={() => updateFilter('destination', destination)}
				>{destination || 'All destinations'}<span
					>{destination
						? equipment.filter((item) => item.destination === destination).length
						: equipment.length}</span
				></button
			>
		{/each}
	</div>
	<section class="filter-panel" aria-label="Search and filter collection">
		<div class="search-field">
			<Search size={19} /><label for="equipment-search" class="sr-only">Search equipment</label
			><input
				id="equipment-search"
				type="search"
				value={filters.query}
				placeholder="Find a machine, mission, or a new discovery..."
				oninput={(event) => updateFilter('q', event.currentTarget.value)}
			/>{#if filters.query}<button
					class="clear-search"
					aria-label="Clear search"
					onclick={() => updateFilter('q', '')}><X size={16} /></button
				>{/if}<span class="search-hint"
				><SlidersHorizontal size={13} />YOUR CURIOSITY, YOUR PATH</span
			>
		</div>
		<div class="filter-grid">
			<div class="field">
				<label for="mission-filter">Mission</label><select
					id="mission-filter"
					value={filters.mission}
					onchange={(event) => updateFilter('mission', event.currentTarget.value)}
					><option value="">All missions</option>{#each missions as mission}<option value={mission}
							>{mission}</option
						>{/each}</select
				>
			</div>
			<div class="field">
				<label for="type-filter">Equipment type</label><select
					id="type-filter"
					value={filters.type}
					onchange={(event) => updateFilter('type', event.currentTarget.value)}
					><option value="">All equipment</option>{#each equipmentTypes as type}<option value={type}
							>{type}</option
						>{/each}</select
				>
			</div>
			<div class="field">
				<label for="year-filter">Launch year</label><select
					id="year-filter"
					value={filters.year}
					onchange={(event) => updateFilter('year', event.currentTarget.value)}
					><option value="">Any year</option>{#each years as year}<option value={year}
							>{year}</option
						>{/each}</select
				>
			</div>
			<div class="field">
				<label for="sort-order">Sort collection</label><select
					id="sort-order"
					value={filters.sort}
					onchange={(event) => updateFilter('sort', event.currentTarget.value)}
					><option value="oldest">Launch date: earliest first</option><option value="newest"
						>Launch date: latest first</option
					><option value="arrival">Landing / deployment date</option><option value="name"
						>Name: A to Z</option
					></select
				>
			</div>
		</div>
	</section>
	<div class="results-heading">
		<p role="status" aria-live="polite">
			<strong>{String(filtered.length).padStart(2, '0')}</strong>
			{filtered.length === 1 ? 'story' : 'stories'} to discover {#if filters.destination}<span
					>/ {filters.destination}</span
				>{/if}
		</p>
		{#if hasFilters}<button class="text-link" onclick={reset}
				><RotateCcw size={12} /> Clear all filters</button
			>{:else}<span class="collection-note">A curated collection, not a complete inventory</span
			>{/if}
	</div>
	{#if filtered.length}
		<div class="collection-grid">
			{#each filtered as item (item.id)}<EquipmentCard {item} />{/each}
		</div>
	{:else}
		<div class="empty-state">
			<Search />
			<h2>No stories on this path. Yet.</h2>
			<p>
				Try a different mission, a broader search, or reset your filters to explore the full
				collection.
			</p>
			<button class="button button-primary" onclick={reset}>Reset filters <RotateCcw /></button>
		</div>
	{/if}
	<div class="collection-end notice">
		<strong>Left behind does not always mean abandoned.</strong> We distinguish inactive equipment,
		completed missions, and passive instruments still used for science. Every profile explains its
		status and the limits of what is known.
		<a href={`${base}/sources`}>Read our evidence policy.</a>
	</div>
</div>

<style>
	.explorer-heading {
		display: flex;
		align-items: end;
		gap: 25px;
		justify-content: space-between;
	}
	.explorer-heading h1 {
		font-size: clamp(40px, 5.1vw, 61px);
	}
	.explorer-heading h1 span {
		color: #98aecf;
	}
	.explorer-heading p {
		max-width: 560px;
		font-size: 13px;
	}
	.destination-tabs {
		display: flex;
		align-items: center;
		gap: 25px;
		border-bottom: 1px solid var(--line);
		margin-bottom: 25px;
	}
	.destination-tabs button {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		background: transparent;
		border: 0;
		border-bottom: 2px solid transparent;
		padding: 17px 0;
		color: #9facbf;
	}
	.destination-tabs button.active {
		color: #dbe6fa;
		border-color: #578bff;
	}
	.destination-tabs button > span {
		padding: 2px 6px;
		border-radius: 4px;
		background: #ffffff08;
		font-size: 9px;
		color: #91a4c2;
	}
	.destination-tabs button.active > span {
		background: #396bcc2e;
		color: #bad0ff;
	}
	.filter-panel {
		border: 1px solid var(--line);
		border-radius: 7px;
		background: #0d1521;
		padding: 23px;
	}
	.search-field {
		display: flex;
		align-items: center;
		gap: 12px;
		border-bottom: 1px solid #ffffff18;
		padding-bottom: 19px;
		color: #93a6c4;
	}
	.search-field input {
		width: 100%;
		background: transparent;
		border: 0;
		padding: 8px;
		color: #eaf0fa;
		font-size: 13px;
		min-width: 0;
	}
	.search-field input::placeholder {
		color: #8797ad;
	}
	.search-hint {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 7px;
		white-space: nowrap;
		letter-spacing: 0.1em;
	}
	.clear-search {
		border: 0;
		background: transparent;
		padding: 8px;
		display: grid;
		place-items: center;
	}
	.filter-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 17px;
		margin-top: 21px;
	}
	.results-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		margin-block: 31px 22px;
		font-size: 11px;
		color: #9eabc0;
		min-height: 29px;
	}
	.results-heading strong {
		font-family: var(--font-display);
		color: #e4ebf9;
		font-size: 17px;
		font-weight: 500;
		margin-right: 7px;
	}
	.results-heading p > span {
		color: #7187a7;
		margin-left: 10px;
	}
	.results-heading button {
		border: 0;
		background: transparent;
		font-size: 10px;
	}
	.collection-note {
		font-size: 9px;
		color: #8090a7;
	}
	.collection-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 25px;
	}
	.collection-end {
		margin-block: 44px 70px;
		font-size: 11px;
	}
	@media (max-width: 900px) {
		.explorer-heading {
			flex-wrap: wrap;
		}
		.search-hint {
			display: none;
		}
		.filter-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.collection-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 540px) {
		.explorer-heading h1 {
			font-size: 40px;
		}
		.destination-tabs {
			gap: 0;
			justify-content: space-between;
		}
		.destination-tabs button {
			font-size: 10px;
			gap: 5px;
		}
		.destination-tabs button > span {
			font-size: 8px;
			padding: 2px 4px;
		}
		.filter-panel {
			padding: 16px;
		}
		.search-field {
			gap: 6px;
		}
		.search-field input {
			font-size: 12px;
		}
		.filter-grid {
			gap: 16px 10px;
		}
		.field :global(select) {
			font-size: 10px;
			padding-inline: 9px;
		}
		.collection-grid {
			grid-template-columns: 1fr;
			gap: 22px;
		}
		.collection-note {
			display: none;
		}
		.collection-end {
			margin-block: 32px 45px;
		}
	}
</style>
