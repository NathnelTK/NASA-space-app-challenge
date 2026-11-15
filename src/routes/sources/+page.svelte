<script lang="ts">
	import { base } from '$app/paths';
	import {
		Search,
		ArrowUpRight,
		ExternalLink,
		BookOpen,
		ShieldCheck,
		Download,
		Info
	} from '@lucide/svelte';
	import { equipment } from '$lib/data/equipment';
	import { sources, isObservedChallengeSource } from '$lib/data/sources';
	import { challenge } from '$lib/data/challenge';
	import { formatDate } from '$lib/utils';
	let search = $state('');
	let category = $state('All resources');
	const categories = ['All resources', 'Science & history', 'Images', 'Tools & fonts', 'Policies'];
	let filtered = $derived(
		sources.filter((source) => {
			const categoryMatch =
				category === 'All resources' ||
				(category === 'Images' && source.type === 'Image archive') ||
				(category === 'Tools & fonts' && ['Software', 'Font'].includes(source.type)) ||
				(category === 'Policies' && source.type === 'Policy') ||
				(category === 'Science & history' &&
					['Mission record', 'Science & history', 'Data archive'].includes(source.type));
			return (
				categoryMatch &&
				`${source.name} ${source.organization} ${source.usage}`
					.toLowerCase()
					.includes(search.trim().toLowerCase())
			);
		})
	);
	const matched = sources.filter(isObservedChallengeSource);
	function usedBy(id: string) {
		return equipment.filter((item) => item.sources.includes(id));
	}
</script>

<svelte:head
	><title>Sources, Credits & AI Disclosure | Abandoned but Not Forgotten</title><meta
		name="description"
		content="Trace every museum story to its NASA sources, inspect image credits and usage conditions, and read the project's transparent AI and challenge-verification disclosures."
	/></svelte:head
>

<div class="shell sources-shell">
	<header class="page-heading">
		<span class="eyebrow">THE EVIDENCE BEHIND THE EXPERIENCE</span>
		<h1>Curiosity, with citations.</h1>
		<p>
			Good stories deserve good sources. Follow the mission records, historical photographs, and
			scientific evidence that make this museum possible.
		</p>
	</header>
	<div class="evidence-principles">
		<div>
			<ShieldCheck size={21} />
			<h2>Traceable, not invented.</h2>
			<p>
				Every equipment record carries references. Unresolved dates, positions, and physical
				conditions are stated, not filled in.
			</p>
		</div>
		<div>
			<BookOpen size={21} />
			<h2>Context comes first.</h2>
			<p>
				A mission-site marker is not an exact equipment survey. A photo mosaic is labeled. A lost
				signal does not prove destruction.
			</p>
		</div>
		<div>
			<Info size={21} />
			<h2>Independent by design.</h2>
			<p>
				This is an educational Space Apps project, not an official NASA product. NASA has not
				reviewed or endorsed this application.
			</p>
		</div>
	</div>
	<section class="challenge-section" id="challenge-resources" aria-labelledby="challenge-heading">
		<div class="section-topline">
			<div>
				<span class="eyebrow">NASA SPACE APPS 2026</span>
				<h2 class="section-title" id="challenge-heading">
					Organizer resources, honestly recorded.
				</h2>
			</div>
			<a class="text-link" href={challenge.resourcesUrl} target="_blank" rel="noreferrer"
				>The exact Resources tab <ArrowUpRight /></a
			>
		</div>
		<div class="notice">
			<strong>{challenge.verification}.</strong> On 15 November 2026, the exact 2026 Resources page
			returned HTTP 200 with certificate validation enabled. All {challenge.resourceLinks.length} NASA
			resource links below were confirmed in the rendered Resources section. {matched.length} exact listed
			source URLs are used in this collection. Earlier command-line certificate errors were resolved by
			this browser check. <strong>Global Award eligibility is not verified.</strong>
			Resource use is one requirement, not an award decision or acceptance of participant terms.
		</div>
		<details class="evidence-details">
			<summary
				>Inspect all {challenge.resourceLinks.length} verified organizer links and access evidence</summary
			>
			<p>{challenge.evidence}</p>
			<ol>
				{#each challenge.resourceLinks as resource}<li>
						<a href={resource.url} target="_blank" rel="noreferrer"
							>{resource.name}<ExternalLink size={11} /></a
						>{#if sources.some((source) => source.url.replace(/\/$/, '') === resource.url.replace(/\/$/, ''))}<span
								>Verified organizer source · used in this collection</span
							>{:else}<span>Verified organizer listing; not used in this collection</span>{/if}<code
							>{resource.url}</code
						>
					</li>{/each}
			</ol>
		</details>
		<div class="meaningful-use">
			<h3>How NASA information is actually used</h3>
			<p>
				Mission dates drive the collection filters and timeline. Equipment descriptions shape the
				stories and comparisons. Documented coordinates position atlas markers. Scientific findings
				support the learning questions. Historical photographs are stored locally with their
				original captions and credits. This is a curated local dataset, not a decorative citation
				list or a live telemetry service.
			</p>
			<a
				class="button button-secondary button-small"
				href={`${base}/collection.json`}
				download="museum-collection.json"><Download size={14} /> Download data & provenance</a
			>
		</div>
	</section>
	<section id="source-library" class="source-library" aria-labelledby="source-library-heading">
		<div class="section-topline">
			<div>
				<span class="eyebrow">THE REFERENCE LIBRARY</span>
				<h2 class="section-title" id="source-library-heading">Open a source. Go deeper.</h2>
			</div>
			<span class="source-total">{sources.length} credited resources</span>
		</div>
		<div class="source-toolbar">
			<div class="source-search">
				<Search size={16} /><label class="sr-only" for="source-search">Search references</label
				><input
					id="source-search"
					type="search"
					bind:value={search}
					placeholder="Search a source, mission, or organization"
				/>
			</div>
			<div class="source-categories" role="group" aria-label="Reference category">
				{#each categories as option}<button
						aria-pressed={category === option}
						class:active={category === option}
						onclick={() => (category = option)}>{option}</button
					>{/each}
			</div>
		</div>
		<p class="source-count" role="status" aria-live="polite">
			Showing {filtered.length} of {sources.length} resources
		</p>
		{#if filtered.length}<div class="source-list">
				{#each filtered as source}<article id={source.id} class="source-entry">
						<div class="source-entry-heading">
							<span class="pill">{source.type}</span>{#if isObservedChallengeSource(source)}<span
									class="pill pill-blue">Verified organizer source</span
								>{/if}<span class="access-date"
								>{source.verification === 'Verified' ? 'Reviewed' : 'Unavailable'}
								{formatDate(source.accessed)}</span
							>
						</div>
						<h3>
							<a href={source.url} target="_blank" rel="noreferrer"
								>{source.name}<ArrowUpRight size={17} /></a
							>
						</h3>
						<span class="source-organization">{source.organization}</span>
						<dl>
							<div>
								<dt>Information provided</dt>
								<dd>{source.provides}</dd>
							</div>
							<div>
								<dt>Used in this museum</dt>
								<dd>{source.usage}</dd>
							</div>
							<div>
								<dt>Usage conditions</dt>
								<dd>{source.license}</dd>
							</div>
						</dl>
						{#if usedBy(source.id).length}<div class="linked-records">
								<span>EXHIBITS</span>{#each usedBy(source.id) as item}<a
										href={`${base}/equipment/${item.id}`}
										>{item.shortName}<ArrowUpRight size={10} /></a
									>{/each}
							</div>{/if}<a class="source-url" href={source.url} target="_blank" rel="noreferrer"
							>{source.url}<ExternalLink size={10} /></a
						>
					</article>{/each}
			</div>{:else}<div class="empty-state">
				<Search />
				<h2>No matching references.</h2>
				<p>Try another term or reset the category.</p>
				<button
					class="button button-secondary"
					onclick={() => {
						search = '';
						category = 'All resources';
					}}>Reset reference search</button
				>
			</div>{/if}
	</section>
	<section class="disclosure-section" id="ai-disclosure">
		<span class="eyebrow">TRANSPARENCY IS PART OF THE MISSION</span>
		<h2 class="section-title">What was AI-assisted?</h2>
		<div class="disclosure-grid">
			<div>
				<h3>Code, writing, and research assistance</h3>
				<p>
					Kilo Code, reporting model <code>gpt-6-astra</code> (<code
						>agent_router12/gpt-6-astra</code
					>), assisted with architecture, UI code, tests, document drafting, source retrieval,
					explanatory writing, and data structuring. AI is not a scientific authority. Claims are
					linked to external evidence; a final human submission review remains necessary.
				</p>
				<h3>What came from people</h3>
				<p>
					The project brief, repository, educational goals, and design constraints were supplied by
					the project owner. NASA and its mission partners produced the original mission data and
					historical media. No unperformed human review is claimed.
				</p>
			</div>
			<div>
				<h3>No generated space imagery or audio</h3>
				<p>
					This release uses no AI-generated photographs, historical reconstructions, video, audio,
					or 3D models. NASA photo mosaics are labeled as mosaics, not generated photographs. The
					atlas is a mathematical coordinate diagram, not a photograph. UI icons come from Lucide.
				</p>
				<h3>Disclosure stays with the data</h3>
				<p>
					AI assistance is recorded here, in page metadata, in the downloadable dataset, and in <code
						>AI_DISCLOSURE.md</code
					>. Every media record includes an AI-generation flag. Any future generated visual must
					carry a clearly visible watermark and must not reproduce NASA branding.
				</p>
			</div>
		</div>
	</section>
	<section class="credits-section">
		<div>
			<span class="eyebrow">PROJECT CREDITS</span>
			<h2>Built for the next question.</h2>
			<p>
				Abandoned but Not Forgotten is an independent educational project prepared for NASA Space
				Apps Challenge 2026. The source code, submission checklist, demonstration script, and full
				disclosures are maintained in the project repository. Publishing and final Terms and
				Conditions acceptance are the team's responsibility.
			</p>
			<a class="text-link" href={`${base}/third-party-notices.txt`}
				>Open-source license notices <ArrowUpRight /></a
			>
		</div>
		<a
			class="button button-secondary"
			href="https://github.com/NathnelTK/NASA-space-app-challenge"
			target="_blank"
			rel="noreferrer">Project repository <ArrowUpRight /></a
		>
	</section>
</div>

<style>
	.sources-shell {
		padding-bottom: 70px;
	}
	.evidence-principles {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 28px;
		border-block: 1px solid var(--line);
		padding-block: 30px;
	}
	.evidence-principles > div > :global(svg) {
		color: #94b4f7;
	}
	.evidence-principles h2 {
		font-size: 17px;
		font-weight: 500;
		margin-top: 15px;
	}
	.evidence-principles p {
		color: #99acc7;
		font-size: 11px;
		margin-top: 10px;
	}
	.challenge-section {
		padding-block: 53px;
		border-bottom: 1px solid var(--line);
	}
	.challenge-section .section-title {
		font-size: 30px;
	}
	.evidence-details {
		margin-top: 20px;
		padding: 19px 22px;
		border: 1px solid var(--line);
		border-radius: 6px;
		background: #0c1522;
	}
	.evidence-details summary {
		color: #c1d0e9;
		font-size: 12px;
		cursor: pointer;
	}
	.evidence-details > p {
		color: #91a5c2;
		font-size: 11px;
		margin-top: 18px;
	}
	.evidence-details ol {
		padding-left: 20px;
		margin-block: 20px 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 22px 35px;
	}
	.evidence-details li {
		color: #8fa8d0;
		font-size: 11px;
		min-width: 0;
	}
	.evidence-details li a {
		display: inline-flex;
		gap: 7px;
		align-items: center;
		color: #c0d4f8;
	}
	.evidence-details li > span {
		display: block;
		font-size: 9px;
		margin-top: 7px;
		color: #94a6c1;
	}
	.evidence-details code {
		display: block;
		font-size: 9px;
		line-height: 1.6;
		margin-top: 7px;
		overflow-wrap: anywhere;
		color: #7e93b2;
	}
	.meaningful-use {
		margin-top: 26px;
	}
	.meaningful-use h3 {
		font-size: 18px;
		font-weight: 500;
	}
	.meaningful-use p {
		margin-top: 12px;
		font-size: 12px;
		color: #9aadc8;
		max-width: 850px;
	}
	.meaningful-use .button {
		margin-top: 20px;
	}
	.source-library {
		padding-block: 48px;
	}
	.source-total {
		font-size: 10px;
		color: #8ba1c1;
	}
	.source-toolbar {
		border: 1px solid var(--line);
		border-radius: 6px;
		background: #0e1826;
		padding: 16px 20px;
	}
	.source-search {
		display: flex;
		gap: 11px;
		align-items: center;
		color: #8da8d0;
	}
	.source-search input {
		width: 100%;
		color: #dbe8ff;
		padding: 10px 0;
		background: transparent;
		border: 0;
		font-size: 12px;
		min-width: 0;
	}
	.source-search input::placeholder {
		color: #869dbd;
	}
	.source-categories {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		border-top: 1px solid var(--line);
		padding-top: 14px;
		margin-top: 10px;
	}
	.source-categories button {
		padding: 7px 10px;
		background: transparent;
		color: #93a7c5;
		border: 1px solid transparent;
		border-radius: 4px;
		font-size: 10px;
	}
	.source-categories button.active {
		color: #b9d0ff;
		background: #3a65b024;
		border-color: #5479b74d;
	}
	.source-count {
		font-size: 10px;
		color: #8fa4c1;
		margin-block: 18px;
	}
	.source-list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 22px;
	}
	.source-entry {
		padding: 24px;
		border: 1px solid var(--line);
		border-radius: 6px;
		background: #0d1623;
		min-width: 0;
	}
	.source-entry:target {
		border-color: #83a9f4;
		box-shadow: 0 0 0 3px #5486e521;
	}
	.source-entry-heading {
		display: flex;
		gap: 8px;
		align-items: center;
		flex-wrap: wrap;
	}
	.source-entry-heading .pill {
		font-size: 7px;
	}
	.access-date {
		color: #8096b8;
		font-size: 8px;
		margin-left: auto;
	}
	.source-entry h3 {
		font-size: 19px;
		line-height: 1.35;
		margin-top: 17px;
		font-weight: 500;
	}
	.source-entry h3 a {
		display: flex;
		align-items: start;
		justify-content: space-between;
		gap: 18px;
	}
	.source-entry h3 a :global(svg) {
		color: #8eabe0;
		margin-top: 3px;
	}
	.source-organization {
		display: block;
		font-size: 9px;
		color: #97afd4;
		margin-top: 9px;
	}
	dl {
		margin: 20px 0;
	}
	dl > div + div {
		margin-top: 13px;
	}
	dt {
		color: #c2d0e8;
		font-size: 10px;
	}
	dd {
		margin: 6px 0 0;
		font-size: 11px;
		line-height: 1.8;
		color: #95a9c6;
	}
	.linked-records {
		border-top: 1px solid var(--line);
		padding-block: 15px 0;
		margin-bottom: 15px;
		display: flex;
		gap: 8px 14px;
		align-items: center;
		flex-wrap: wrap;
	}
	.linked-records > span {
		font-size: 7px;
		letter-spacing: 0.12em;
		color: #849cc0;
	}
	.linked-records a {
		display: inline-flex;
		gap: 5px;
		align-items: center;
		font-size: 10px;
		color: #b5cbf1;
	}
	.source-url {
		display: flex;
		align-items: start;
		gap: 7px;
		overflow-wrap: anywhere;
		color: #7f9bca;
		font-size: 9px;
		line-height: 1.6;
	}
	.source-url :global(svg) {
		margin-top: 3px;
	}
	.disclosure-section {
		padding-block: 43px;
		border-block: 1px solid var(--line);
	}
	.disclosure-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
		margin-top: 27px;
	}
	.disclosure-grid h3 {
		font-size: 18px;
		font-weight: 500;
		margin-bottom: 12px;
	}
	.disclosure-grid p {
		color: #9fb1cc;
		font-size: 12px;
	}
	.disclosure-grid p + h3 {
		margin-top: 27px;
	}
	.disclosure-grid code {
		font-size: 10px;
		overflow-wrap: anywhere;
		color: #b0c5e8;
	}
	.credits-section {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 40px;
		padding-top: 44px;
	}
	.credits-section h2 {
		font-size: 29px;
		margin-top: 15px;
		font-weight: 500;
		letter-spacing: -0.04em;
	}
	.credits-section p {
		font-size: 12px;
		color: #9bafcd;
		max-width: 700px;
		margin-top: 14px;
	}
	.credits-section .button {
		white-space: nowrap;
		font-size: 11px;
	}
	@media (max-width: 900px) {
		.evidence-principles {
			gap: 20px;
		}
		.source-entry {
			padding: 20px;
		}
		.access-date {
			margin-left: 0;
			width: 100%;
		}
		.credits-section {
			flex-wrap: wrap;
			gap: 23px;
		}
	}
	@media (max-width: 640px) {
		.evidence-principles,
		.source-list,
		.disclosure-grid,
		.evidence-details ol {
			grid-template-columns: 1fr;
		}
		.evidence-principles {
			gap: 25px;
		}
		.evidence-principles h2 {
			margin-top: 10px;
		}
		.challenge-section,
		.source-library {
			padding-block: 36px;
		}
		.challenge-section .section-title {
			font-size: 27px;
		}
		.source-toolbar {
			padding: 15px;
		}
		.source-categories {
			gap: 4px;
		}
		.source-categories button {
			font-size: 9px;
			padding: 7px 8px;
		}
		.evidence-details {
			padding: 17px;
		}
		.sources-shell {
			padding-bottom: 45px;
		}
	}
</style>
