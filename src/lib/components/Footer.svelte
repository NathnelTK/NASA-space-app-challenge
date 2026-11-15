<script lang="ts">
	import { base } from '$app/paths';
	import { Orbit, ArrowUpRight } from '@lucide/svelte';
</script>

<footer>
	<div class="shell footer-main">
		<div class="footer-story">
			<a href={`${base}/`} class="footer-brand"
				><Orbit size={23} strokeWidth={1.3} /><span>Abandoned but Not Forgotten</span></a
			>
			<p>The missions may be over.<br />The discoveries are here to stay.</p>
			<span class="project-label">AN INDEPENDENT SPACE APPS 2026 PROJECT</span>
		</div>
		<div class="footer-links">
			<span>THE MUSEUM</span><a href={`${base}/explore`}>Explore the collection</a><a
				href={`${base}/atlas`}>Space atlas</a
			><a href={`${base}/timeline`}>Mission timeline</a>
		</div>
		<div class="footer-links">
			<span>KEEP DISCOVERING</span><a href={`${base}/learn`}>Learning lab</a><a
				href={`${base}/sources`}>Sources & credits <ArrowUpRight size={11} /></a
			><a href={`${base}/sources#ai-disclosure`}>AI disclosure</a>
		</div>
	</div>
	<div class="shell footer-bottom">
		<p>Built for curiosity. Grounded in NASA research.</p>
		<p>Independent educational project. Not affiliated with or endorsed by NASA.</p>
	</div>
</footer>

<style>
	footer {
		background: #070b12;
		border-top: 1px solid var(--line);
	}
	.footer-main {
		display: grid;
		grid-template-columns: 1.8fr 1fr 1fr;
		gap: 50px;
		padding-block: 53px 46px;
	}
	.footer-brand {
		display: flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-display);
		font-size: 15px;
	}
	.footer-brand :global(svg) {
		color: #9ab7fc;
	}
	.footer-story p {
		font-size: 12px;
		color: var(--muted);
		margin-top: 16px;
		line-height: 1.8;
	}
	.project-label {
		display: block;
		margin-top: 23px;
		color: #71839d;
		font-size: 8px;
		letter-spacing: 0.13em;
	}
	.footer-links {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 13px;
		font-size: 11px;
		color: #a7b1c1;
	}
	.footer-links > span {
		font-size: 9px;
		color: #e0e6f0;
		letter-spacing: 0.1em;
		margin-bottom: 7px;
	}
	.footer-links a {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.footer-links a:hover {
		color: #92b4ff;
	}
	.footer-bottom {
		border-top: 1px solid var(--line);
		display: flex;
		justify-content: space-between;
		gap: 20px;
		padding-block: 19px;
		color: #8391a6;
		font-size: 9px;
	}
	@media (max-width: 640px) {
		.footer-main {
			grid-template-columns: 1fr 1fr;
			gap: 32px 20px;
			padding-block: 38px;
		}
		.footer-story {
			grid-column: 1 / -1;
		}
		.footer-bottom {
			display: block;
		}
		.footer-bottom p + p {
			margin-top: 8px;
		}
	}
</style>
