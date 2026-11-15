<script lang="ts">
	import { base } from '$app/paths';
	import { ImageOff } from '@lucide/svelte';
	import type { Media } from '$lib/data/types';
	let {
		image,
		eager = false,
		class: className = ''
	}: { image: Media; eager?: boolean; class?: string } = $props();
	let failed = $state(false);
	$effect(() => {
		image.src;
		failed = false;
	});
</script>

<span class={`media-image ${className}`}>
	{#if failed}
		<span class="image-fallback" role="img" aria-label={image.alt}>
			<ImageOff size={25} /><span>Archive image unavailable</span><span
				>The original source is listed in the image credits.</span
			>
		</span>
	{:else}
		<img
			src={`${base}${image.src}`}
			alt={image.alt}
			loading={eager ? 'eager' : 'lazy'}
			fetchpriority={eager ? 'high' : 'auto'}
			decoding="async"
			onerror={() => (failed = true)}
		/>
	{/if}
	{#if image.aiGenerated}<span class="ai-watermark"
			>AI-GENERATED VISUAL<br />NOT AN AUTHENTIC NASA PHOTOGRAPH</span
		>{/if}
</span>

<style>
	.media-image {
		display: block;
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #101824;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.image-fallback {
		min-height: 180px;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 12px;
		color: #a6b5cc;
		padding: 24px;
		text-align: center;
		font-size: 11px;
	}
	.ai-watermark {
		position: absolute;
		bottom: 10px;
		left: 10px;
		right: 10px;
		background: #080d15ef;
		border: 1px solid white;
		color: white;
		padding: 12px;
		font-size: 14px;
		font-weight: 700;
		line-height: 1.5;
		text-align: center;
		z-index: 5;
	}
</style>
