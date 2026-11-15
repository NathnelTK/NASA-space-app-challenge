<script lang="ts">
	import {
		formatCoordinates,
		GLOBE_SIZE,
		type GlobeView,
		type ProjectedSite,
		type SurfaceDestination
	} from '$lib/atlas';

	let {
		destination,
		view,
		selectedId,
		onselect
	}: {
		destination: SurfaceDestination;
		view: GlobeView;
		selectedId: string | null;
		onselect: (site: ProjectedSite) => void;
	} = $props();
	const id = $props.id();
	let visibleSites = $derived(view.sites.filter((site) => site.state === 'in-view'));
</script>

<figure
	class="globe-figure"
	aria-label={`${destination}: schematic coordinate atlas, not a photograph`}
>
	<div class="globe-canvas" class:mars={destination === 'Mars'}>
		<svg viewBox={`0 0 ${GLOBE_SIZE} ${GLOBE_SIZE}`} aria-hidden="true" focusable="false">
			<defs>
				<radialGradient id={`${id}-sphere`} cx="35%" cy="28%" r="76%">
					<stop offset="0%" stop-color={destination === 'Mars' ? '#3a302e' : '#283749'} />
					<stop offset="58%" stop-color={destination === 'Mars' ? '#22242c' : '#172535'} />
					<stop offset="100%" stop-color="#0b1320" />
				</radialGradient>
				<linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stop-color="#9db6d2" stop-opacity=".6" />
					<stop offset="100%" stop-color="#578bff" stop-opacity=".16" />
				</linearGradient>
			</defs>
			<circle
				cx="320"
				cy="320"
				r={view.radius + 8}
				fill="none"
				stroke="#578bff"
				stroke-opacity=".08"
			/>
			<circle
				cx="320"
				cy="320"
				r={view.radius}
				fill={`url(#${id}-sphere)`}
				stroke={`url(#${id}-rim)`}
				stroke-width="1.2"
			/>
			<path d={view.grid} fill="none" stroke="#96acc6" stroke-opacity=".24" stroke-width=".7" />
			<path d={view.equator} fill="none" stroke="#b7c9df" stroke-opacity=".48" stroke-width="1" />
			<path
				d={view.meridian}
				fill="none"
				stroke="#8bacf4"
				stroke-opacity=".6"
				stroke-width="1"
				stroke-dasharray="4 5"
			/>
			<path
				d="M 310 320 H 315 M 325 320 H 330 M 320 310 V 315 M 320 325 V 330"
				fill="none"
				stroke="#bdcce0"
				stroke-opacity=".45"
				stroke-width="1"
			/>
			{#each view.labels as label}
				<text class="grid-label" x={label.x} y={label.y}>{label.text}</text>
			{/each}
			{#each visibleSites as site (site.id)}
				{@const selected = site.records.some((item) => item.id === selectedId)}
				{#if Math.hypot(site.target[0] - site.point[0], site.target[1] - site.point[1]) > 1}
					<line
						x1={site.point[0]}
						y1={site.point[1]}
						x2={site.target[0]}
						y2={site.target[1]}
						stroke={selected ? '#9dbaff' : '#6c94e7'}
						stroke-width="1"
						stroke-opacity=".8"
					/>
				{/if}
				<circle
					cx={site.point[0]}
					cy={site.point[1]}
					r="3.5"
					fill={selected ? '#e1ebff' : '#8baeff'}
					stroke="#080d15"
					stroke-width="1.5"
				/>
			{/each}
		</svg>
		{#each visibleSites as site (site.id)}
			{@const selected = site.records.some((item) => item.id === selectedId)}
			{@const label = site.records.length > 1 ? site.records[0].mission : site.records[0].shortName}
			<button
				type="button"
				class="site-marker"
				class:selected
				class:label-left={site.target[0] > GLOBE_SIZE * 0.55}
				style:left={`${(site.target[0] / GLOBE_SIZE) * 100}%`}
				style:top={`${(site.target[1] / GLOBE_SIZE) * 100}%`}
				aria-label={`${site.records.map((item) => item.shortName).join(', ')}: ${site.records.length} ${site.records.length === 1 ? 'record' : 'records'} at ${formatCoordinates(site.coordinates)}. Select site.`}
				aria-pressed={selected}
				aria-controls="selected-record-details"
				title={`${label} / ${formatCoordinates(site.coordinates)}`}
				onclick={() => onselect(site)}
			>
				<span class="marker-core" class:counted={site.records.length > 1} aria-hidden="true">
					{#if site.records.length > 1}{site.records.length}{:else}<span class="marker-dot"
						></span>{/if}
				</span>
				<span class="marker-label" aria-hidden="true">{label}</span>
			</button>
		{/each}
	</div>
	<figcaption>
		<span><i class="legend-dot"></i>Source coordinate</span>
		<span><i class="legend-count">2</i>Shared coordinate</span>
		<span><i class="legend-grid"></i>15&deg; grid</span>
	</figcaption>
</figure>

<style>
	.globe-figure {
		margin: 0;
		min-width: 0;
		container-type: inline-size;
	}
	.globe-canvas {
		position: relative;
		width: 100%;
		max-width: 640px;
		aspect-ratio: 1;
		margin-inline: auto;
		overflow: hidden;
		background: radial-gradient(ellipse at 50% 50%, #22395925 0%, transparent 68%);
	}
	.globe-canvas.mars {
		background: radial-gradient(ellipse at 50% 50%, #70504715 0%, transparent 68%);
	}
	svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	.grid-label {
		fill: #9caec5;
		font: 11px var(--font-display);
		paint-order: stroke;
		stroke: #132131;
		stroke-width: 3px;
		stroke-linejoin: round;
	}
	.site-marker {
		position: absolute;
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		padding: 0;
		transform: translate(-50%, -50%);
		border: 0;
		border-radius: 50%;
		background: transparent;
		z-index: 1;
	}
	.site-marker:hover,
	.site-marker:focus-visible,
	.site-marker.selected {
		z-index: 2;
	}
	.marker-core {
		display: grid;
		place-items: center;
		width: 24px;
		height: 24px;
		border: 1px solid #6995f5a6;
		border-radius: 50%;
		background: #101b2edb;
		box-shadow: 0 0 0 4px #578bff10;
		color: #e4edff;
		font: 500 11px var(--font-display);
	}
	.marker-dot {
		width: 6px;
		height: 6px;
		background: #9cbcff;
		border-radius: 50%;
	}
	.marker-core.counted {
		width: 28px;
		height: 28px;
	}
	.selected .marker-core {
		border-color: #c8daff;
		background: #578bff;
		box-shadow:
			0 0 0 5px #578bff21,
			0 0 24px #578bff35;
		color: white;
	}
	.selected .marker-dot {
		background: white;
	}
	.site-marker:hover .marker-core,
	.site-marker:focus-visible .marker-core {
		border-color: white;
		background: #436dbe;
	}
	.marker-label {
		position: absolute;
		left: 40px;
		top: 14px;
		max-width: 150px;
		padding: 3px 6px;
		border-radius: 3px;
		background: #0a1220e8;
		color: #bfd0ec;
		font-size: 10px;
		line-height: 1.4;
		white-space: nowrap;
		pointer-events: none;
	}
	.label-left .marker-label {
		right: 40px;
		left: auto;
	}
	.selected .marker-label {
		color: #edf3ff;
	}
	figcaption {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		column-gap: 22px;
		row-gap: 12px;
		padding: 0 18px 22px;
		color: #9aabc2;
		font-size: 10px;
	}
	figcaption > span {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}
	.legend-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #8baeff;
	}
	.legend-count {
		display: inline-grid;
		place-items: center;
		width: 17px;
		height: 17px;
		border: 1px solid #6995f5a6;
		border-radius: 50%;
		font: normal 9px var(--font-display);
		color: #e4edff;
	}
	.legend-grid {
		width: 13px;
		height: 13px;
		border: 1px solid #96acc64d;
		background:
			linear-gradient(90deg, transparent 45%, #96acc64d 45%, #96acc64d 55%, transparent 55%),
			linear-gradient(transparent 45%, #96acc64d 45%, #96acc64d 55%, transparent 55%);
	}
	@container (max-width: 440px) {
		.marker-label,
		.grid-label {
			display: none;
		}
		figcaption {
			column-gap: 14px;
			font-size: 9px;
		}
	}
</style>
