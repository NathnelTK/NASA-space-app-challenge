<script lang="ts">
	import { base } from '$app/paths';
	import { ArrowUpRight } from '@lucide/svelte';
	import type { Equipment } from '$lib/data/types';
	import MediaImage from './MediaImage.svelte';
	let { item }: { item: Equipment } = $props();
</script>

<article class="equipment-card">
	<a
		class="image-link"
		href={`${base}/equipment/${item.id}`}
		aria-label={`Discover ${item.name}`}
		tabindex="-1"
		aria-hidden="true"
	>
		<MediaImage image={item.images[0]} />
		<span class="image-destination">{item.destination}</span>
		<span class="image-year">{item.launchDate.slice(0, 4)}</span>
	</a>
	<div class="card-content">
		<div class="card-meta">
			<span>{item.mission}</span><span
				class:passive={item.status === 'Passive science'}
				class="card-status"><i></i>{item.status}</span
			>
		</div>
		<h3><a href={`${base}/equipment/${item.id}`}>{item.shortName}<ArrowUpRight size={18} /></a></h3>
		<p>{item.summary}</p>
		<div class="card-bottom">
			<span>{item.equipmentType}</span><span>{item.images[0].kind}</span>
		</div>
	</div>
</article>

<style>
	.equipment-card {
		background: #101722;
		border: 1px solid var(--line);
		border-radius: 7px;
		overflow: hidden;
		transition:
			border-color 0.2s,
			transform 0.2s;
		min-width: 0;
	}
	.equipment-card:hover {
		transform: translateY(-4px);
		border-color: #5485dd6b;
	}
	.image-link {
		height: 214px;
		display: block;
		position: relative;
		overflow: hidden;
	}
	.image-link :global(img) {
		transition: transform 0.4s;
	}
	.equipment-card:hover .image-link :global(img) {
		transform: scale(1.04);
	}
	.image-link::after {
		content: '';
		position: absolute;
		inset: 50% 0 0;
		background: linear-gradient(transparent, #090e1688);
		pointer-events: none;
	}
	.image-destination,
	.image-year {
		position: absolute;
		z-index: 1;
		bottom: 14px;
		font-size: 9px;
		color: white;
	}
	.image-destination {
		left: 16px;
		padding: 5px 8px;
		background: #0b111ac9;
		border: 1px solid #ffffff24;
		border-radius: 3px;
	}
	.image-year {
		right: 16px;
		font-family: var(--font-display);
		font-size: 12px;
		letter-spacing: 0.08em;
	}
	.card-content {
		padding: 21px 21px 0;
	}
	.card-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		margin-bottom: 13px;
		font-size: 9px;
		color: #9cacbf;
	}
	.card-meta > span:first-child {
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}
	.card-status {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 8px;
	}
	.card-status i {
		height: 4px;
		width: 4px;
		border-radius: 100%;
		background: #99a1ac;
	}
	.card-status.passive {
		color: #a7d7b8;
	}
	.card-status.passive i {
		background: #a7d7b8;
	}
	h3 {
		font-weight: 500;
		font-size: 20px;
		letter-spacing: -0.03em;
	}
	h3 a {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 9px;
	}
	h3 :global(svg) {
		color: #a4b5d1;
	}
	p {
		font-size: 11px;
		color: #a4afbf;
		margin-top: 12px;
		min-height: 60px;
		line-height: 1.8;
	}
	.card-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		border-top: 1px solid var(--line);
		margin-top: 20px;
		padding-block: 14px;
		color: #8e9bb0;
		font-size: 8px;
	}
	@media (max-width: 640px) {
		.image-link {
			height: 226px;
		}
		p {
			min-height: 0;
		}
	}
</style>
