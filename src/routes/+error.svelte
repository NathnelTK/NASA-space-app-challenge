<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { Compass, ArrowLeft } from '@lucide/svelte';
</script>

<svelte:head
	><title>{page.status} | A little off course</title><meta
		name="robots"
		content="noindex"
	/></svelte:head
>
<section class="shell error-page">
	<Compass size={44} strokeWidth={1} /><span class="eyebrow"
		>{page.status} / A LITTLE OFF COURSE</span
	>
	<h1>This corner of space<br />is still unexplored.</h1>
	<p>
		{page.status === 404
			? 'The exhibit you are looking for is not in our collection. There are eight extraordinary stories waiting on the main route.'
			: 'The museum could not load this page. Return to the collection and try again.'}
	</p>
	<a class="button button-primary" href={`${base}/explore`}><ArrowLeft /> Back to the collection</a>
</section>

<style>
	.error-page {
		padding-block: 100px;
		min-height: 70vh;
	}
	.error-page > :global(svg) {
		color: #8aaeff;
		margin-bottom: 25px;
	}
	h1 {
		font-weight: 500;
		font-size: clamp(36px, 6vw, 64px);
		line-height: 1.1;
		letter-spacing: -0.05em;
		margin-top: 20px;
	}
	p {
		max-width: 540px;
		color: #a6b7d2;
		font-size: 14px;
		margin-top: 25px;
	}
	.button {
		margin-top: 28px;
	}
</style>
