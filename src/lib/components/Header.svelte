<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { afterNavigate } from '$app/navigation';
	import { Orbit, ArrowUpRight, Menu, X, BookOpen } from '@lucide/svelte';
	let menuOpen = $state(false);
	let menuToggle = $state<HTMLButtonElement>();
	const links = [
		{ href: '/explore', label: 'The collection' },
		{ href: '/atlas', label: 'Space atlas' },
		{ href: '/timeline', label: 'Timeline' },
		{ href: '/learn', label: 'Learn & discover' }
	];
	afterNavigate(() => {
		menuOpen = false;
	});
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape' && menuOpen) {
			menuOpen = false;
			menuToggle?.focus();
		}
	}}
/>

<header class="site-header">
	<div class="shell header-inner">
		<a class="wordmark" href={`${base}/`} aria-label="Abandoned but Not Forgotten, home">
			<span class="brand-icon"><Orbit size={30} strokeWidth={1.35} /></span>
			<span><strong>ABANDONED</strong><span>BUT NOT FORGOTTEN</span></span>
		</a>
		<nav class="desktop-nav" aria-label="Main navigation">
			{#each links as link}
				<a
					href={`${base}${link.href}`}
					class:active={page.url.pathname.startsWith(`${base}${link.href}`)}
					aria-current={page.url.pathname.startsWith(`${base}${link.href}`) ? 'page' : undefined}
					>{link.label}</a
				>
			{/each}
		</nav>
		<a class="sources-nav" href={`${base}/sources`}
			><BookOpen size={14} /> Our sources <ArrowUpRight size={13} /></a
		>
		<button
			bind:this={menuToggle}
			class="icon-button mobile-toggle"
			aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
			aria-expanded={menuOpen}
			aria-controls="mobile-navigation"
			onclick={() => (menuOpen = !menuOpen)}
		>
			{#if menuOpen}<X />{:else}<Menu />{/if}
		</button>
	</div>
	{#if menuOpen}
		<nav id="mobile-navigation" class="mobile-nav shell" aria-label="Mobile navigation">
			{#each links as link}<a
					href={`${base}${link.href}`}
					aria-current={page.url.pathname.startsWith(`${base}${link.href}`) ? 'page' : undefined}
					>{link.label}<ArrowUpRight size={16} /></a
				>{/each}
			<a href={`${base}/sources`}>Our sources<BookOpen size={16} /></a>
		</nav>
	{/if}
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 40;
		background: #080d15f5;
		border-bottom: 1px solid #ffffff0d;
	}
	.header-inner {
		height: 84px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 26px;
	}
	.wordmark {
		display: flex;
		align-items: center;
		gap: 11px;
		flex-shrink: 0;
	}
	.brand-icon {
		display: grid;
		place-items: center;
		color: #9ab7fc;
	}
	.wordmark strong {
		display: block;
		font-family: var(--font-display);
		font-size: 14px;
		font-weight: 700;
		letter-spacing: 0.13em;
	}
	.wordmark span span {
		display: block;
		color: #9daac0;
		font-size: 8px;
		letter-spacing: 0.205em;
		margin-top: 3px;
	}
	.desktop-nav {
		display: flex;
		align-items: center;
		gap: 29px;
	}
	.desktop-nav a {
		font-size: 11px;
		color: #aab3c1;
		position: relative;
		padding-block: 32px;
	}
	.desktop-nav a:hover,
	.desktop-nav a.active {
		color: #f5f7fb;
	}
	.desktop-nav a.active::after {
		position: absolute;
		content: '';
		background: #578bff;
		height: 2px;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.sources-nav {
		display: flex;
		align-items: center;
		gap: 9px;
		border: 1px solid #ffffff24;
		border-radius: 5px;
		padding: 10px 12px;
		font-size: 10px;
	}
	.sources-nav:hover {
		border-color: #578bff;
	}
	.mobile-toggle {
		display: none;
	}
	.mobile-nav {
		display: grid;
		padding-bottom: 20px;
	}
	.mobile-nav a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15px 0;
		font-size: 14px;
		border-bottom: 1px solid var(--line);
	}
	@media (max-width: 1024px) {
		.desktop-nav {
			gap: 20px;
		}
		.sources-nav {
			display: none;
		}
	}
	@media (max-width: 760px) {
		.desktop-nav {
			display: none;
		}
		.mobile-toggle {
			display: inline-grid;
		}
		.header-inner {
			height: 72px;
		}
	}
</style>
