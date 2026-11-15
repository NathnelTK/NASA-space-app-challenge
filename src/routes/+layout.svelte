<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { navigating } from '$app/state';
	let { children } = $props();
</script>

<a class="skip-link" href="#main-content">Skip to content</a>
<Header />
{#if navigating.to}<div class="route-progress" role="status">
		<span class="sr-only">Opening the next gallery...</span>
	</div>{/if}
<main id="main-content" tabindex="-1">{@render children()}</main>
<Footer />

<style>
	.route-progress {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 90;
		height: 3px;
		background: linear-gradient(90deg, transparent, #8bb0ff, transparent);
	}
</style>
