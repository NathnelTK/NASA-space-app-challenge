<script lang="ts">
	import { base } from '$app/paths';
	import { ArrowUpRight } from '@lucide/svelte';
	import { sourceById } from '$lib/data/sources';
	let { ids }: { ids: string[] } = $props();
</script>

<div class="source-refs" aria-label="Supporting sources">
	{#each [...new Set(ids)] as id}
		{#if sourceById[id]}<a class="source-ref" href={`${base}/sources#${id}`}
				>{sourceById[id].name}<ArrowUpRight size={10} /></a
			>{/if}
	{/each}
</div>

<style>
	.source-refs {
		display: flex;
		gap: 5px 14px;
		flex-wrap: wrap;
		margin-top: 12px;
	}
</style>
