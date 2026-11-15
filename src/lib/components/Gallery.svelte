<script lang="ts">
	import { X, ChevronLeft, ChevronRight, Maximize2, ArrowUpRight } from '@lucide/svelte';
	import type { Media } from '$lib/data/types';
	import MediaImage from './MediaImage.svelte';
	let { images }: { images: Media[] } = $props();
	let dialog = $state<HTMLDialogElement>();
	let active = $state(0);
	let image = $derived(images[active] ?? images[0]);
	function open(index: number) {
		active = index;
		dialog?.showModal();
	}
	function step(amount: number) {
		active = (active + amount + images.length) % images.length;
	}
</script>

<div class="gallery-grid">
	{#each images as item, index}
		<figure>
			<button
				class="gallery-thumb"
				aria-label={`Enlarge archive image ${index + 1}: ${item.alt}`}
				onclick={() => open(index)}
				><MediaImage image={item} /><span class="enlarge-icon"><Maximize2 size={15} /></span
				></button
			>
			<figcaption>
				<strong>{item.kind}</strong>
				<p>{item.caption}</p>
				<span>{item.credit}</span><a
					class="source-ref"
					href={item.originalUrl}
					target="_blank"
					rel="noreferrer">Original archive entry <ArrowUpRight size={11} /></a
				>
			</figcaption>
		</figure>
	{/each}
</div>

<dialog
	bind:this={dialog}
	aria-label="Historical photograph gallery"
	onclick={(event) => {
		if (event.target === dialog) dialog?.close();
	}}
	onkeydown={(event) => {
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			step(1);
		}
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			step(-1);
		}
	}}
>
	<div class="lightbox-head">
		<span>THE HISTORICAL ARCHIVE <span>{active + 1} / {images.length}</span></span><button
			class="icon-button"
			aria-label="Close gallery"
			onclick={() => dialog?.close()}><X /></button
		>
	</div>
	<div class="lightbox-image"><MediaImage {image} eager /></div>
	<div class="lightbox-caption">
		<div>
			<span class="pill">{image.kind}</span>
			<p>{image.caption}</p>
			<span class="credit">{image.credit}</span><a
				class="source-ref"
				href={image.originalUrl}
				target="_blank"
				rel="noreferrer">Original source <ArrowUpRight size={11} /></a
			>
		</div>
		{#if images.length > 1}<div class="lightbox-controls">
				<button class="icon-button" aria-label="Previous photograph" onclick={() => step(-1)}
					><ChevronLeft /></button
				><button class="icon-button" aria-label="Next photograph" onclick={() => step(1)}
					><ChevronRight /></button
				>
			</div>{/if}
	</div>
</dialog>

<style>
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 24px;
	}
	figure {
		margin: 0;
		min-width: 0;
	}
	.gallery-thumb {
		position: relative;
		width: 100%;
		height: 240px;
		padding: 0;
		border: 1px solid #ffffff18;
		border-radius: 5px;
		overflow: hidden;
		background: #101824;
	}
	.gallery-thumb > .enlarge-icon {
		position: absolute;
		bottom: 12px;
		right: 12px;
		display: grid;
		place-items: center;
		width: 33px;
		height: 33px;
		background: #080d15d9;
		border: 1px solid #ffffff39;
		border-radius: 4px;
	}
	.gallery-thumb:hover {
		border-color: #8bacf5;
	}
	figcaption {
		padding-top: 14px;
		font-size: 10px;
	}
	figcaption strong {
		color: #bbcce8;
		font-weight: 500;
	}
	figcaption p {
		color: #a2afc4;
		font-size: 11px;
		margin-block: 7px 10px;
	}
	figcaption > span {
		display: block;
		color: #8998b0;
		margin-bottom: 9px;
		font-size: 9px;
	}
	dialog {
		width: min(960px, calc(100% - 32px));
		max-height: calc(100dvh - 32px);
		margin: auto;
		background: #0c1421;
		border: 1px solid #53637c;
		border-radius: 8px;
		color: #f0f4fc;
		padding: 20px;
		box-shadow: 0 25px 100px #000a;
	}
	dialog::backdrop {
		background: #03070fe8;
	}
	.lightbox-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 14px;
		margin-bottom: 16px;
	}
	.lightbox-head > span {
		font-size: 9px;
		color: #a5b7d1;
		letter-spacing: 0.1em;
	}
	.lightbox-head > span > span {
		color: #e2ebff;
		margin-left: 20px;
	}
	.lightbox-image {
		height: min(57vh, 590px);
	}
	.lightbox-image :global(img) {
		object-fit: contain;
	}
	.lightbox-caption {
		display: flex;
		justify-content: space-between;
		align-items: start;
		gap: 24px;
		padding-top: 19px;
	}
	.lightbox-caption p {
		font-size: 12px;
		color: #bac8dd;
		margin-top: 12px;
	}
	.credit {
		display: inline-block;
		margin: 10px 18px 0 0;
		color: #99aac4;
		font-size: 10px;
	}
	.lightbox-controls {
		display: flex;
		gap: 8px;
	}
	@media (max-width: 540px) {
		.gallery-grid {
			grid-template-columns: 1fr;
		}
		.gallery-thumb {
			height: 260px;
		}
		dialog {
			padding: 14px;
		}
		.lightbox-caption {
			flex-wrap: wrap;
		}
		.lightbox-image {
			height: 42vh;
		}
	}
</style>
