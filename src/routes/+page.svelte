<script lang="ts">
	import { base } from '$app/paths';
	import {
		ArrowRight,
		ArrowUpRight,
		ArrowDown,
		ChevronLeft,
		ChevronRight,
		Sparkles,
		Compass,
		BookOpen,
		MapPin
	} from '@lucide/svelte';
	import { equipment } from '$lib/data/equipment';
	import { heroImage, moonImage, marsImage, learningImage } from '$lib/data/media';
	import EquipmentCard from '$lib/components/EquipmentCard.svelte';
	import MediaImage from '$lib/components/MediaImage.svelte';
	let destination = $state('All destinations');
	let factIndex = $state(0);
	const preferred = ['apollo-15-rover', 'opportunity', 'insight'];
	let featured = $derived(
		destination === 'All destinations'
			? preferred.map((id) => equipment.find((item) => item.id === id)!).filter(Boolean)
			: equipment.filter((item) => item.destination === destination).slice(0, 3)
	);
	const previewIds = [
		'eagle-descent-stage',
		'apollo-15-rover',
		'viking-1',
		'opportunity',
		'insight'
	];
	const moments = previewIds.map((id) => equipment.find((item) => item.id === id)!).filter(Boolean);
	const facts = equipment.filter((item) => item.interestingFacts.length > 0);
	let factItem = $derived(facts[factIndex % facts.length]);
</script>

<svelte:head>
	<title>Abandoned but Not Forgotten | A Digital Space Museum</title>
	<meta
		name="description"
		content="Meet the machines humanity left behind. Explore eight source-linked stories from the Moon, Mars, and deep space in an independent, interactive space museum."
	/>
</svelte:head>

<section class="hero" aria-labelledby="hero-heading">
	<div class="hero-visual"><MediaImage image={heroImage} eager /></div>
	<div class="hero-shade"></div>
	<div class="shell hero-inner">
		<div class="hero-copy">
			<div class="hero-kicker">
				<span class="live-dot"></span>A DIGITAL MUSEUM OF SPACE EXPLORATION
			</div>
			<h1 id="hero-heading">Left behind.<br /><span>Not forgotten.</span></h1>
			<p>
				Out there, the machines that changed our world stand silent. Discover what they did, what
				they taught us, and why their stories still matter.
			</p>
			<div class="hero-actions">
				<a class="button button-primary" href={`${base}/explore`}
					>Start exploring <ArrowUpRight /></a
				><a class="hero-secondary" href={`${base}/atlas`}
					><Compass size={17} /> Open the space atlas</a
				>
			</div>
			<div class="hero-trail">
				<span>THE MOON</span><i></i><span>MARS</span><i></i><span>BEYOND</span>
			</div>
		</div>
		<div class="hero-caption">
			<span class="caption-cross">+</span>
			<div>
				<span>TAURUS-LITTROW, THE MOON</span>
				<p>Apollo 17 · December 1972</p>
			</div>
		</div>
		<div class="hero-bottom">
			<a href="#destinations"><ArrowDown size={13} /> A little curiosity goes a long way</a><a
				href={heroImage.originalUrl}
				target="_blank"
				rel="noreferrer">Photograph: NASA / Eugene Cernan <ArrowUpRight size={10} /></a
			>
		</div>
	</div>
</section>

<div class="collection-strip">
	<div class="shell strip-inner">
		<div class="strip-intro">
			<span class="tiny-label">THE MACHINES STAYED.</span>
			<p>Their impact came home.</p>
		</div>
		<div class="strip-stat">
			<strong>{String(equipment.length).padStart(2, '0')}</strong><span>CURATED STORIES</span>
		</div>
		<div class="strip-stat">
			<strong
				>{String(new Set(equipment.map((item) => item.destination)).size).padStart(2, '0')}</strong
			><span>DESTINATIONS</span>
		</div>
		<div class="strip-stat"><strong>01</strong><span>SHARED HUMAN STORY</span></div>
	</div>
</div>

<section id="destinations" class="section shell" aria-labelledby="destinations-heading">
	<div class="section-topline">
		<div>
			<span class="eyebrow">PICK YOUR NEXT STOP</span>
			<h2 class="section-title" id="destinations-heading">A universe of stories awaits.</h2>
		</div>
		<a class="text-link" href={`${base}/atlas`}>Explore the atlas <ArrowUpRight /></a>
	</div>
	<div class="destination-grid">
		<a class="destination-card moon-card" href={`${base}/explore?destination=Moon`}>
			<div class="planet-visual"><MediaImage image={moonImage} /></div>
			<div class="destination-copy">
				<span class="destination-number">01 / OUR NEAREST NEIGHBOR</span>
				<h3>The Moon</h3>
				<p>Small steps. Giant discoveries.<br />The hardware that made history.</p>
				<span class="destination-link"
					>Explore {equipment.filter((item) => item.destination === 'Moon').length} stories <ArrowUpRight
						size={15}
					/></span
				>
			</div>
		</a>
		<a class="destination-card mars-card" href={`${base}/explore?destination=Mars`}>
			<div class="planet-visual"><MediaImage image={marsImage} /></div>
			<div class="destination-copy">
				<span class="destination-number">02 / THE RED PLANET</span>
				<h3>Mars</h3>
				<p>Fearless explorers.<br />A world of extraordinary questions.</p>
				<span class="destination-link"
					>Explore {equipment.filter((item) => item.destination === 'Mars').length} stories <ArrowUpRight
						size={15}
					/></span
				>
			</div>
		</a>
	</div>
	<a class="deep-space-strip" href={`${base}/explore?destination=Deep%20Space`}
		><span
			><Sparkles size={15} /><strong>There is more beyond the horizon.</strong><span
				>Meet the spacecraft that looked farther.</span
			></span
		><span>Explore deep space <ArrowRight size={14} /></span></a
	>
	<div class="destination-credit">
		Planetary imagery: NASA / JPL / USGS. <a href={`${base}/sources#image-moon`}
			>View image credits <ArrowUpRight size={10} /></a
		>
	</div>
</section>

<section class="featured-section section" aria-labelledby="featured-heading">
	<div class="shell">
		<div class="section-topline">
			<div>
				<span class="eyebrow">OBJECTS WITH EXTRAORDINARY LIVES</span>
				<h2 class="section-title" id="featured-heading">Meet the quiet pioneers.</h2>
				<p class="section-description">Not just equipment. The beginning of a discovery.</p>
			</div>
			<a class="text-link" href={`${base}/explore`}>View the collection <ArrowUpRight /></a>
		</div>
		<div class="featured-tabs" role="group" aria-label="Featured destination">
			{#each ['All destinations', 'Moon', 'Mars', 'Deep Space'] as option}<button
					class:chosen={destination === option}
					aria-pressed={destination === option}
					onclick={() => (destination = option)}>{option}</button
				>{/each}
		</div>
		<div class="equipment-grid" aria-live="polite">
			{#each featured as item (item.id)}<EquipmentCard {item} />{/each}
		</div>
	</div>
</section>

<section class="section shell journey-section" aria-labelledby="journey-heading">
	<div class="section-topline">
		<div>
			<span class="eyebrow">ONE DISCOVERY LEADS TO ANOTHER</span>
			<h2 class="section-title" id="journey-heading">Decades of daring.</h2>
			<p class="section-description">
				Follow the moments that took us from first steps to new frontiers.
			</p>
		</div>
		<a class="text-link" href={`${base}/timeline`}>Travel through time <ArrowUpRight /></a>
	</div>
	<div class="timeline-preview">
		{#each moments as item, i}
			<a href={`${base}/timeline?equipment=${item.id}`} class="timeline-moment"
				><span class="moment-index">0{i + 1}</span><span class="moment-dot"></span><strong
					>{(item.deploymentDate ?? item.launchDate).slice(0, 4)}</strong
				><span class="moment-name">{item.shortName}</span><span class="moment-destination"
					><MapPin size={10} />{item.destination}</span
				></a
			>
		{/each}
	</div>
	<p class="timeline-footnote">
		Selected landing and deployment years. Explore the full timeline for launch, science, and
		mission conclusion dates.
	</p>
</section>

<section class="learning-section shell" aria-labelledby="learning-heading">
	<div class="learning-photo">
		<MediaImage image={learningImage} /><span class="learning-photo-credit"
			>APOLLO 17 · PHOTOGRAPH: NASA / EUGENE CERNAN</span
		>
	</div>
	<div class="learning-copy">
		<span class="eyebrow">FOR THE NEXT GENERATION OF EXPLORERS</span>
		<h2 id="learning-heading">Stay curious.<br />Space has a lot to teach us.</h2>
		<p>
			How does a rover find signs of ancient water? Can a mirror on the Moon still do science? Big
			ideas start with little questions.
		</p>
		<div class="learning-features">
			<span><BookOpen size={13} /> Bite-sized science</span><span
				><Compass size={13} /> Hands-on discovery</span
			>
		</div>
		<a class="button button-primary" href={`${base}/learn`}
			>Enter the learning lab <ArrowUpRight /></a
		>
	</div>
</section>

<section class="section shell" aria-labelledby="fact-heading">
	<div class="fact-card">
		<div class="fact-icon"><Sparkles size={22} strokeWidth={1.3} /></div>
		<div class="fact-content">
			<span class="eyebrow">A SMALL FACT. A BIG UNIVERSE.</span>
			<h2 id="fact-heading">{factItem.shortName}</h2>
			<p>{factItem.interestingFacts[0].text}</p>
			<a class="source-ref" href={`${base}/equipment/${factItem.id}#facts`}
				>Discover the story & sources <ArrowUpRight size={11} /></a
			>
		</div>
		<div class="fact-controls">
			<span class="mono"
				>{String(factIndex + 1).padStart(2, '0')}
				<span>/ {String(facts.length).padStart(2, '0')}</span></span
			>
			<div>
				<button
					class="icon-button"
					aria-label="Previous fact"
					onclick={() => (factIndex = (factIndex - 1 + facts.length) % facts.length)}
					><ChevronLeft /></button
				><button
					class="icon-button"
					aria-label="Next fact"
					onclick={() => (factIndex = (factIndex + 1) % facts.length)}><ChevronRight /></button
				>
			</div>
		</div>
	</div>
	<div class="closing-note">
		<span></span>
		<p>Even when a mission ends, its discoveries should never be forgotten.</p>
		<span></span>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 664px;
		overflow: hidden;
		background: #070b12;
	}
	.hero-visual {
		position: absolute;
		inset: 0 0 0 27%;
	}
	.hero-visual :global(.media-image) {
		background: black;
	}
	.hero-visual :global(img) {
		object-position: 50% 60%;
		filter: brightness(0.72);
	}
	.hero-shade {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(90deg, #080d15 0%, #080d15ed 21%, #080d15a1 40%, #080d1500 70%),
			linear-gradient(0deg, #080d15 0%, transparent 26%, #080d151a 85%, #080d1555);
	}
	.hero-inner {
		position: relative;
		min-height: 664px;
		display: flex;
		align-items: center;
	}
	.hero-copy {
		max-width: 700px;
		position: relative;
		z-index: 1;
		padding-bottom: 40px;
	}
	.hero-kicker {
		display: flex;
		align-items: center;
		gap: 9px;
		font-size: 9px;
		color: #b9c9e5;
		letter-spacing: 0.17em;
		margin-bottom: 31px;
	}
	.live-dot {
		width: 5px;
		height: 5px;
		background: #7ea8ff;
		border-radius: 50%;
	}
	h1 {
		font-size: clamp(66px, 7.1vw, 96px);
		font-weight: 500;
		line-height: 1.03;
		letter-spacing: -0.065em;
	}
	h1 span {
		color: #a4b8d8;
	}
	.hero-copy > p {
		font-size: 14px;
		color: #b5becc;
		max-width: 395px;
		line-height: 1.9;
		margin-top: 27px;
	}
	.hero-actions {
		display: flex;
		align-items: center;
		gap: 25px;
		margin-top: 29px;
	}
	.hero-actions .button {
		min-height: 48px;
		padding-inline: 23px;
	}
	.hero-secondary {
		display: flex;
		align-items: center;
		gap: 9px;
		font-size: 11px;
		color: #d7e0ec;
	}
	.hero-secondary:hover {
		color: #9bbcff;
	}
	.hero-trail {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-top: 39px;
		font-size: 8px;
		letter-spacing: 0.17em;
		color: #92a1b7;
	}
	.hero-trail i {
		width: 2px;
		height: 2px;
		background: #72839a;
		border-radius: 50%;
	}
	.hero-caption {
		position: absolute;
		right: 0;
		bottom: 99px;
		display: flex;
		gap: 13px;
		align-items: center;
	}
	.caption-cross {
		font-size: 28px;
		color: #d5dfea;
		font-weight: 200;
	}
	.hero-caption div > span {
		font-size: 8px;
		letter-spacing: 0.15em;
		color: #d5dfea;
	}
	.hero-caption p {
		color: #a4afbd;
		font-size: 10px;
		margin-top: 5px;
	}
	.hero-bottom {
		position: absolute;
		bottom: 23px;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		color: #a5b1c1;
		font-size: 9px;
	}
	.hero-bottom a {
		display: flex;
		align-items: center;
		gap: 9px;
	}
	.hero-bottom a:hover {
		color: #f4f6fb;
	}
	.collection-strip {
		border-block: 1px solid var(--line);
		background: #0b111b;
	}
	.strip-inner {
		display: grid;
		grid-template-columns: 1.6fr 1fr 1fr 1.1fr;
		align-items: center;
		min-height: 108px;
	}
	.tiny-label {
		font-size: 8px;
		letter-spacing: 0.15em;
		color: #8493a9;
	}
	.strip-intro p {
		font-size: 15px;
		font-family: var(--font-display);
		margin-top: 7px;
	}
	.strip-stat {
		border-left: 1px solid var(--line);
		padding-left: 40px;
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.strip-stat strong {
		font-family: var(--font-display);
		font-size: 29px;
		font-weight: 400;
		color: #e5edf8;
		letter-spacing: -0.04em;
	}
	.strip-stat span {
		max-width: 77px;
		font-size: 8px;
		line-height: 1.7;
		letter-spacing: 0.1em;
		color: #a1adbe;
	}
	.destination-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 22px;
	}
	.destination-card {
		position: relative;
		min-height: 266px;
		overflow: hidden;
		border: 1px solid #ffffff12;
		background: #0f1722;
		border-radius: 7px;
		transition: border-color 0.25s;
	}
	.destination-card:hover {
		border-color: #7b9ecc75;
	}
	.mars-card {
		background: #191719;
	}
	.planet-visual {
		position: absolute;
		height: 285px;
		width: 285px;
		right: -49px;
		top: 28px;
		transform: rotate(-14deg);
		transition: transform 0.5s;
	}
	.destination-card:hover .planet-visual {
		transform: rotate(-10deg) scale(1.035);
	}
	.planet-visual :global(.media-image) {
		background: transparent;
		border-radius: 50%;
	}
	.planet-visual :global(img) {
		mix-blend-mode: screen;
		opacity: 0.85;
		border-radius: 50%;
	}
	.destination-card::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, #0f1722 0%, #0f1722ee 20%, #0f172229 62%, transparent);
		pointer-events: none;
	}
	.mars-card::after {
		background: linear-gradient(90deg, #191719 0%, #191719ee 20%, #19171929 62%, transparent);
	}
	.destination-copy {
		position: relative;
		z-index: 1;
		padding: 31px;
	}
	.destination-number {
		color: #9aaabe;
		font-size: 8px;
		letter-spacing: 0.1em;
	}
	.destination-copy h3 {
		font-size: 34px;
		font-weight: 500;
		letter-spacing: -0.04em;
		margin-top: 17px;
	}
	.destination-copy p {
		font-size: 11px;
		color: #adb9ca;
		line-height: 1.8;
		margin-top: 8px;
	}
	.destination-link {
		display: flex;
		align-items: center;
		gap: 13px;
		font-size: 10px;
		margin-top: 23px;
	}
	.deep-space-strip {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		padding: 19px 0 13px;
		font-size: 10px;
	}
	.deep-space-strip > span {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.deep-space-strip strong {
		font-weight: 400;
		color: #c3cddc;
	}
	.deep-space-strip > span > span {
		color: #8c9aaf;
	}
	.deep-space-strip > span > :global(svg) {
		color: #9baccc;
	}
	.deep-space-strip:hover > span:last-child {
		color: #9bbcff;
	}
	.destination-credit {
		color: #7c8aa1;
		font-size: 8px;
		display: flex;
		gap: 6px;
	}
	.destination-credit a {
		display: inline-flex;
		align-items: center;
		gap: 2px;
		text-decoration: underline;
	}
	.featured-section {
		border-block: 1px solid var(--line);
		background: #0b111b;
	}
	.featured-tabs {
		display: flex;
		gap: 7px;
		margin-block: -5px 24px;
	}
	.featured-tabs button {
		background: transparent;
		border: 1px solid transparent;
		color: #99a7bb;
		padding: 8px 12px;
		font-size: 10px;
		border-radius: 4px;
	}
	.featured-tabs button:hover {
		color: #d7e4fa;
	}
	.featured-tabs button.chosen {
		border-color: #5f89d744;
		background: #3f67b319;
		color: #adc5ff;
	}
	.equipment-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 22px;
	}
	.timeline-preview {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		padding-top: 14px;
	}
	.timeline-moment {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 7px;
		padding-top: 9px;
	}
	.timeline-moment::after {
		position: absolute;
		content: '';
		left: 0;
		right: 0;
		height: 1px;
		background: #30415c;
		top: 45px;
	}
	.timeline-moment:last-child::after {
		background: linear-gradient(90deg, #30415c, transparent);
	}
	.moment-index {
		color: #788ba8;
		font-size: 8px;
		letter-spacing: 0.1em;
	}
	.moment-dot {
		position: relative;
		z-index: 1;
		height: 8px;
		width: 8px;
		border-radius: 50%;
		background: #88a9ee;
		outline: 5px solid #080d15;
		margin-block: 12px 14px;
	}
	.timeline-moment:hover .moment-dot {
		background: white;
	}
	.timeline-moment > strong {
		font-size: 27px;
		font-family: var(--font-display);
		font-weight: 400;
		color: #dbe6f9;
	}
	.moment-name {
		font-size: 11px;
		color: #c1cbdc;
	}
	.moment-destination {
		display: flex;
		gap: 5px;
		align-items: center;
		font-size: 9px;
		color: #8496af;
		margin-top: 3px;
	}
	.timeline-footnote {
		color: #8593a8;
		font-size: 9px;
		margin-top: 30px;
	}
	.learning-section {
		display: grid;
		grid-template-columns: 1fr 1.12fr;
		border: 1px solid #ffffff14;
		border-radius: 8px;
		overflow: hidden;
		background: #101a29;
	}
	.learning-photo {
		position: relative;
		min-height: 358px;
	}
	.learning-photo :global(img) {
		object-position: 45% 55%;
		filter: brightness(0.78);
	}
	.learning-photo::after {
		content: '';
		position: absolute;
		inset: 70% 0 0;
		background: linear-gradient(transparent, #080d15c9);
	}
	.learning-photo-credit {
		position: absolute;
		z-index: 1;
		left: 19px;
		right: 19px;
		bottom: 17px;
		font-size: 7px;
		letter-spacing: 0.06em;
		color: #c1cbd8;
	}
	.learning-copy {
		padding: 43px;
	}
	.learning-copy .eyebrow {
		font-size: 8px;
	}
	.learning-copy h2 {
		font-size: 32px;
		line-height: 1.22;
		letter-spacing: -0.045em;
		font-weight: 500;
		margin-top: 17px;
	}
	.learning-copy > p {
		font-size: 12px;
		color: #a9b6c9;
		line-height: 1.8;
		margin-top: 17px;
		max-width: 350px;
	}
	.learning-features {
		display: flex;
		gap: 20px;
		margin-top: 23px;
		font-size: 9px;
		color: #c4d0e3;
	}
	.learning-features span {
		display: flex;
		align-items: center;
		gap: 7px;
	}
	.learning-copy .button {
		margin-top: 26px;
		font-size: 10px;
	}
	.fact-card {
		display: flex;
		align-items: center;
		gap: 30px;
		padding: 27px 30px;
		border: 1px solid var(--line);
		border-radius: 6px;
	}
	.fact-icon {
		color: #95b6ff;
		height: 53px;
		width: 53px;
		flex-shrink: 0;
		display: grid;
		place-items: center;
		border: 1px solid #4f75b93b;
		background: #2138623b;
		border-radius: 50%;
	}
	.fact-content {
		flex: 1;
	}
	.fact-content .eyebrow {
		font-size: 8px;
	}
	.fact-content .eyebrow::before {
		display: none;
	}
	.fact-content h2 {
		font-size: 18px;
		font-weight: 500;
		margin-top: 9px;
	}
	.fact-content p {
		font-size: 11px;
		color: #a7b3c5;
		margin-block: 8px 7px;
		max-width: 720px;
	}
	.fact-controls {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
	}
	.fact-controls > span {
		font-size: 11px;
	}
	.fact-controls > span > span {
		color: #7e8ea8;
	}
	.fact-controls > div {
		display: flex;
		gap: 7px;
	}
	.fact-controls .icon-button {
		width: 31px;
		height: 31px;
	}
	.fact-controls .icon-button :global(svg) {
		width: 14px;
	}
	.closing-note {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 23px;
		margin-top: 63px;
	}
	.closing-note > span {
		width: 42px;
		height: 1px;
		background: #2d3d55;
	}
	.closing-note > p {
		text-align: center;
		font-family: var(--font-display);
		color: #a4b3c9;
		font-size: 13px;
	}
	@media (min-width: 1600px) {
		.hero-visual {
			left: 35%;
		}
	}
	@media (max-width: 1024px) {
		.hero-caption {
			right: 0;
			bottom: 90px;
		}
		.hero-copy {
			max-width: 600px;
		}
		.strip-stat {
			padding-left: 24px;
		}
		.deep-space-strip > span > span {
			display: none;
		}
		.learning-copy {
			padding: 32px;
		}
		.equipment-grid {
			gap: 16px;
		}
		.planet-visual {
			right: -85px;
		}
		.destination-copy {
			padding: 26px;
		}
	}
	@media (max-width: 760px) {
		.hero,
		.hero-inner {
			min-height: 660px;
		}
		.hero-visual {
			left: 18%;
		}
		.hero-shade {
			background:
				linear-gradient(90deg, #080d15f5, #080d15a3 55%, #080d154a),
				linear-gradient(0deg, #080d15, transparent 50%);
		}
		.hero-copy {
			padding-bottom: 60px;
		}
		.hero-copy > p {
			max-width: 380px;
		}
		.hero-caption {
			display: none;
		}
		.strip-inner {
			grid-template-columns: repeat(3, 1fr);
			padding-block: 24px;
			gap: 20px;
		}
		.strip-intro {
			grid-column: 1 / -1;
			display: flex;
			align-items: center;
			gap: 16px;
		}
		.strip-intro p {
			margin: 0;
		}
		.strip-stat {
			padding-left: 0;
			border: 0;
		}
		.strip-stat + .strip-stat {
			padding-left: 18px;
			border-left: 1px solid var(--line);
		}
		.destination-grid {
			gap: 15px;
		}
		.planet-visual {
			width: 250px;
			height: 250px;
			right: -114px;
			top: 80px;
			opacity: 0.7;
		}
		.destination-copy {
			padding: 23px;
		}
		.destination-number {
			font-size: 7px;
		}
		.destination-copy h3 {
			font-size: 29px;
		}
		.equipment-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.equipment-grid > :global(:last-child:nth-child(3)) {
			display: none;
		}
		.learning-section {
			grid-template-columns: 1fr;
		}
		.learning-photo {
			min-height: 280px;
			height: 280px;
		}
		.learning-copy {
			padding: 32px;
		}
		.learning-copy h2 {
			font-size: 33px;
		}
		.learning-copy > p {
			max-width: none;
		}
		.fact-card {
			gap: 20px;
			padding: 23px;
		}
		.fact-icon {
			display: none;
		}
	}
	@media (max-width: 540px) {
		.hero,
		.hero-inner {
			min-height: 668px;
		}
		.hero-kicker {
			font-size: 7px;
			letter-spacing: 0.13em;
			margin-bottom: 27px;
		}
		h1 {
			font-size: clamp(45px, 13.6vw, 60px);
		}
		.hero-copy {
			padding-bottom: 70px;
		}
		.hero-copy > p {
			font-size: 13px;
			max-width: 310px;
		}
		.hero-visual {
			left: 0;
			right: -55%;
		}
		.hero-visual :global(img) {
			object-position: center;
		}
		.hero-shade {
			background:
				linear-gradient(90deg, #080d15e6 5%, #080d1590 58%, #080d1526),
				linear-gradient(0deg, #080d15, transparent 70%);
		}
		.hero-actions {
			gap: 17px;
			flex-wrap: wrap;
		}
		.hero-secondary {
			font-size: 10px;
		}
		.hero-bottom {
			flex-direction: column;
			align-items: start;
			gap: 11px;
			bottom: 24px;
			font-size: 8px;
		}
		.hero-trail {
			margin-top: 27px;
		}
		.strip-intro {
			display: none;
		}
		.strip-stat {
			gap: 9px;
		}
		.strip-stat strong {
			font-size: 25px;
		}
		.strip-stat span {
			font-size: 6px;
		}
		.strip-stat + .strip-stat {
			padding-left: 12px;
		}
		.strip-inner {
			gap: 12px;
			min-height: 86px;
		}
		.destination-grid {
			grid-template-columns: 1fr;
		}
		.destination-card {
			min-height: 246px;
		}
		.planet-visual {
			width: 265px;
			height: 265px;
			right: -55px;
			top: 24px;
			opacity: 1;
		}
		.destination-number {
			font-size: 8px;
		}
		.destination-copy {
			padding: 25px;
		}
		.destination-copy h3 {
			font-size: 34px;
		}
		.destination-link {
			margin-top: 20px;
		}
		.deep-space-strip {
			flex-direction: column;
			align-items: start;
			gap: 13px;
			padding-block: 21px 16px;
		}
		.deep-space-strip > span:last-child {
			padding-left: 25px;
		}
		.destination-credit {
			flex-wrap: wrap;
			font-size: 7px;
		}
		.equipment-grid {
			grid-template-columns: 1fr;
			gap: 21px;
		}
		.equipment-grid > :global(:last-child:nth-child(3)) {
			display: block;
		}
		.featured-tabs {
			gap: 2px;
		}
		.featured-tabs button {
			font-size: 9px;
			padding: 8px 9px;
		}
		.timeline-preview {
			overflow-x: auto;
			grid-template-columns: repeat(5, 145px);
			padding-bottom: 8px;
		}
		.moment-name {
			font-size: 10px;
		}
		.timeline-footnote {
			margin-top: 18px;
			font-size: 8px;
		}
		.learning-copy {
			padding: 27px;
		}
		.learning-copy .eyebrow {
			font-size: 7px;
		}
		.learning-features {
			gap: 18px;
			font-size: 8px;
		}
		.fact-card {
			flex-wrap: wrap;
		}
		.fact-content {
			flex-basis: 100%;
		}
		.fact-controls {
			flex-direction: row;
			justify-content: space-between;
			width: 100%;
		}
		.fact-controls .icon-button {
			width: 40px;
			height: 40px;
		}
		.closing-note {
			margin-top: 39px;
			gap: 14px;
		}
		.closing-note > p {
			font-size: 11px;
		}
		.closing-note > span {
			width: 20px;
		}
	}
</style>
