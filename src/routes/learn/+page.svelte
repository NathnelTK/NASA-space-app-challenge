<script lang="ts">
	import { tick } from 'svelte';
	import { base } from '$app/paths';
	import {
		Activity,
		ArrowRight,
		ArrowUpRight,
		BookOpen,
		ChevronRight,
		CircleCheck,
		CircleX,
		Compass,
		GitCompareArrows,
		Lightbulb,
		Orbit,
		RotateCcw
	} from '@lucide/svelte';
	import EquipmentCard from '$lib/components/EquipmentCard.svelte';
	import { equipment } from '$lib/data/equipment';
	import { learningQuestions } from '$lib/data/learning';
	import { sourceById } from '$lib/data/sources';
	import type { Equipment, Source } from '$lib/data/types';
	import { formatDate } from '$lib/utils';

	const questions = learningQuestions.flatMap((question) => {
		const item = equipment.find((item) => item.id === question.equipmentId);
		if (!item) return [];
		const sourceIds =
			question.evidence === 'scientificContributions'
				? item.scientificContributions.flatMap((claim) => claim.sourceIds)
				: item.fieldSources[question.evidence];
		const references = [...new Set(sourceIds)]
			.map((id) => sourceById[id])
			.filter((source): source is Source => Boolean(source));
		return references.length ? [{ ...question, item, references }] : [];
	});
	const concepts = questions.filter((question) => question.concept);
	const storyItems = ['opportunity', 'insight', 'kepler']
		.map((id) => equipment.find((item) => item.id === id))
		.filter((item): item is Equipment =>
			Boolean(item && item.images.length && !item.images[0].aiGenerated)
		);
	const challenges = [
		{
			id: 'apollo-11-reflector',
			title: 'Find the quiet experiment.',
			prompt:
				'Open the Moon in the atlas. Find the Apollo 11 reflector, then look in its profile for how scientists on Earth use it.',
			hint: 'Look for an instrument rather than a vehicle. Read the functionality and source notes before explaining how a reflector differs from a powered transmitter.'
		},
		{
			id: 'opportunity',
			title: 'Follow the evidence for water.',
			prompt:
				'Find Opportunity on Mars. Read its discoveries and identify a rock or mineral clue that tells us about water in the past.',
			hint: 'The evidence is in the rocks, not a photograph of an ocean. Open the scientific contributions and follow a source to check what was actually observed.'
		},
		{
			id: 'kepler',
			title: 'Find a mission that never landed.',
			prompt:
				"Use the atlas's deep-space register to find Kepler. Then open its profile to explain why a planetary landing pin would be misleading.",
			hint: 'Check the location description. A spacecraft in orbit around the Sun is not equipment on a planetary surface.'
		}
	].flatMap((challenge) => {
		const item = equipment.find((item) => item.id === challenge.id);
		return item ? [{ ...challenge, item }] : [];
	});

	let questionIndex = $state(0);
	let selectedAnswer = $state<number | null>(null);
	let answers = $state<{ choice: number; correct: boolean }[]>([]);
	let finished = $state(false);
	let quizAnnouncement = $state('');
	let questionHeading = $state<HTMLHeadingElement>();
	let resultHeading = $state<HTMLHeadingElement>();
	const currentQuestion = $derived(questions[questionIndex]);
	const submittedAnswer = $derived(answers[questionIndex]);
	const score = $derived(answers.filter((answer) => answer.correct).length);

	async function submitQuiz(event: SubmitEvent) {
		event.preventDefault();
		if (!currentQuestion || finished) return;
		if (!submittedAnswer) {
			if (selectedAnswer === null) return;
			const correct = selectedAnswer === currentQuestion.correctIndex;
			answers = [...answers, { choice: selectedAnswer, correct }];
			quizAnnouncement = `${correct ? 'Correct.' : `Incorrect. The correct answer is: ${currentQuestion.choices[currentQuestion.correctIndex]}.`} ${currentQuestion.explanation}`;
			return;
		}
		if (questionIndex === questions.length - 1) {
			finished = true;
			quizAnnouncement = `Quiz complete. You scored ${score} out of ${questions.length}.`;
			await tick();
			resultHeading?.focus();
		} else {
			questionIndex += 1;
			selectedAnswer = null;
			quizAnnouncement = `Question ${questionIndex + 1} of ${questions.length}.`;
			await tick();
			questionHeading?.focus();
		}
	}

	async function restartQuiz() {
		questionIndex = 0;
		selectedAnswer = null;
		answers = [];
		finished = false;
		quizAnnouncement = 'Quiz restarted. All previous answers have been cleared.';
		await tick();
		questionHeading?.focus();
	}

	const initialLeft = equipment.find((item) => item.id === 'apollo-11-reflector') ?? equipment[0];
	const initialRight =
		equipment.find((item) => item.id === 'insight' && item.id !== initialLeft?.id) ??
		equipment.find((item) => item.id !== initialLeft?.id);
	let leftId = $state(initialLeft?.id ?? '');
	let rightId = $state(initialRight?.id ?? '');
	const comparison = $derived(
		[leftId, rightId]
			.map((id) => equipment.find((item) => item.id === id))
			.filter((item): item is Equipment => Boolean(item))
	);
</script>

<svelte:head>
	<title>Learn & Discover | Abandoned but Not Forgotten</title>
	<meta
		name="description"
		content="Test your space knowledge with a source-backed quiz, compare museum objects, and follow self-guided discoveries through the Moon, Mars, and deep space."
	/>
</svelte:head>

{#snippet sourceLinks(references: Source[])}
	<ul class="reference-list" aria-label="Source records">
		{#each references as source (source.id)}<li>
				<a class="source-ref" href={source.url} target="_blank" rel="noreferrer"
					>{source.name}<ArrowUpRight aria-hidden="true" /><span class="sr-only">
						(opens in a new tab)</span
					></a
				>
			</li>{/each}
	</ul>
{/snippet}

<header class="page-heading shell learning-heading">
	<nav class="breadcrumb" aria-label="Breadcrumb">
		<a href={`${base}/`}>Home</a><ChevronRight aria-hidden="true" /><span aria-current="page"
			>Learn & discover</span
		>
	</nav>
	<span class="eyebrow">THE LEARNING LAB</span>
	<h1>Big discoveries start<br />with <span>little questions.</span></h1>
	<p>
		Read the clues. Test an idea. Follow the evidence. You do not need to be a rocket scientist to
		discover what these remarkable machines can teach us.
	</p>
	<nav class="activity-nav" aria-label="Learning activities">
		<a href="#quiz"><BookOpen size={16} aria-hidden="true" /> Test your knowledge</a><a
			href="#compare"><GitCompareArrows size={16} aria-hidden="true" /> Compare objects</a
		><a href="#discover"><Compass size={16} aria-hidden="true" /> Go on a discovery</a><a
			href="#concepts"><Lightbulb size={16} aria-hidden="true" /> Learn the concepts</a
		>
	</nav>
</header>

<section id="quiz" class="shell lab-section quiz-section" aria-labelledby="quiz-heading">
	<div class="section-intro">
		<span class="eyebrow">01 / TEST YOUR KNOWLEDGE</span>
		<h2 class="section-title" id="quiz-heading">Think like<br />an explorer.</h2>
		<p class="section-description">
			{questions.length} short questions. No timer. Choose one answer, then check it to uncover the science
			and the sources behind it.
		</p>
		<div class="quiz-method">
			<BookOpen size={19} aria-hidden="true" />
			<p>
				Every explanation leads back to an object in the collection and its source records. Getting
				curious matters more than getting everything right.
			</p>
		</div>
		<a class="text-link" href={`${base}/explore`}
			>Browse the collection first <ArrowRight aria-hidden="true" /></a
		>
	</div>
	<div class="quiz-panel line-panel">
		<p class="sr-only" role="status" aria-live="polite" aria-atomic="true">{quizAnnouncement}</p>
		{#if questions.length}
			<div class="quiz-progress">
				<div>
					<span
						>{finished
							? 'QUIZ COMPLETE'
							: `QUESTION ${String(questionIndex + 1).padStart(2, '0')} / ${String(questions.length).padStart(2, '0')}`}</span
					><span>{answers.length} of {questions.length} answered</span>
				</div>
				<progress
					max={questions.length}
					value={answers.length}
					aria-label={`${answers.length} of ${questions.length} questions answered`}
					>{answers.length} / {questions.length}</progress
				>
			</div>
			{#if finished}
				<div class="quiz-results">
					<span class="result-icon"><BookOpen size={25} aria-hidden="true" /></span>
					<h3 bind:this={resultHeading} tabindex="-1">Your quiz results</h3>
					<p class="score"><strong>{score}</strong><span>/ {questions.length}</span></p>
					<p class="result-message">
						{score === questions.length
							? 'Every answer correct. Keep following the evidence.'
							: 'A score is a starting point, not the end of the story. Revisit the objects below and keep exploring.'}
					</p>
					<ol class="result-list">
						{#each questions as question, index (question.id)}<li>
								<div>
									<span>{question.topic}</span><a href={`${base}/equipment/${question.item.id}`}
										>{question.item.shortName}<ArrowUpRight size={13} aria-hidden="true" /></a
									>
								</div>
								<span class="result-verdict"
									>{#if answers[index]?.correct}<CircleCheck size={16} aria-hidden="true" /> Correct{:else}<CircleX
											size={16}
											aria-hidden="true"
										/> Incorrect{/if}</span
								>
							</li>{/each}
					</ol>
					<button type="button" class="button button-primary" onclick={restartQuiz}
						><RotateCcw aria-hidden="true" /> Restart quiz</button
					>
					<p class="storage-note">This score is for this visit only. Nothing is saved.</p>
				</div>
			{:else if currentQuestion}
				<form onsubmit={submitQuiz}>
					<div class="question-topic">
						<span>{currentQuestion.topic}</span><span class="pill"
							>{currentQuestion.item.destination}</span
						>
					</div>
					<h3 class="question-heading" id="quiz-question" bind:this={questionHeading} tabindex="-1">
						{currentQuestion.prompt}
					</h3>
					<fieldset
						class="quiz-choices"
						disabled={Boolean(submittedAnswer)}
						aria-labelledby="quiz-question"
					>
						<legend class="sr-only">Choose one answer</legend>
						{#each currentQuestion.choices as choice, index}
							<label
								class="answer-choice"
								class:selected={selectedAnswer === index}
								class:correct={Boolean(submittedAnswer) && index === currentQuestion.correctIndex}
								class:incorrect={Boolean(submittedAnswer) &&
									selectedAnswer === index &&
									index !== currentQuestion.correctIndex}
							>
								<input type="radio" name="quiz-answer" value={index} bind:group={selectedAnswer} />
								<span
									><span class="choice-text">{choice}</span
									>{#if submittedAnswer && index === currentQuestion.correctIndex}<span
											class="choice-verdict"
											><CircleCheck size={13} aria-hidden="true" /> Correct answer</span
										>{:else if submittedAnswer && selectedAnswer === index}<span
											class="choice-verdict"
											><CircleX size={13} aria-hidden="true" /> Your answer: incorrect</span
										>{/if}</span
								>
							</label>
						{/each}
					</fieldset>
					{#if submittedAnswer}
						<div class="answer-feedback" class:answer-correct={submittedAnswer.correct}>
							<h4>
								{#if submittedAnswer.correct}<CircleCheck size={19} aria-hidden="true" /> Correct{:else}<CircleX
										size={19}
										aria-hidden="true"
									/> Incorrect{/if}
							</h4>
							<p>{currentQuestion.explanation}</p>
							<a class="text-link" href={`${base}/equipment/${currentQuestion.item.id}`}
								>Meet {currentQuestion.item.shortName}<ArrowRight aria-hidden="true" /></a
							>
							<div class="evidence-links">
								<span class="field-label">Read the evidence</span>{@render sourceLinks(
									currentQuestion.references
								)}
							</div>
						</div>
					{/if}
					<div class="quiz-actions">
						<button type="submit" class="button button-primary" disabled={selectedAnswer === null}
							>{submittedAnswer
								? questionIndex === questions.length - 1
									? 'See my score'
									: 'Next question'
								: 'Check answer'}<ArrowRight aria-hidden="true" /></button
						><button type="button" class="restart-button" onclick={restartQuiz}
							><RotateCcw size={14} aria-hidden="true" /> Restart quiz</button
						>
					</div>
					{#if !submittedAnswer}<p class="quiz-instruction">
							Select one answer. The explanation appears after you check it.
						</p>{/if}
				</form>
			{/if}
		{:else}
			<div class="empty-state">
				<BookOpen aria-hidden="true" />
				<h3>The quiz needs its source records.</h3>
				<p>No source-backed questions are available in this collection yet.</p>
				<a class="button button-secondary" href={`${base}/explore`}
					>Explore the collection <ArrowRight aria-hidden="true" /></a
				>
			</div>
		{/if}
	</div>
</section>

<section
	id="compare"
	class="shell lab-section comparison-section"
	aria-labelledby="compare-heading"
>
	<div class="section-topline">
		<div>
			<span class="eyebrow">02 / LOOK A LITTLE CLOSER</span>
			<h2 class="section-title" id="compare-heading">Two objects. Different ambitions.</h2>
			<p class="section-description">
				A rover and a reflector solve very different problems. Put any two objects alongside each
				other and see what changes.
			</p>
		</div>
		<GitCompareArrows class="section-symbol" size={30} strokeWidth={1.3} aria-hidden="true" />
	</div>
	{#if equipment.length >= 2 && comparison.length === 2}
		<div class="comparison-selects">
			<div class="field">
				<label for="compare-first">First object</label><select
					id="compare-first"
					bind:value={leftId}
					>{#each equipment.filter((item) => item.id !== rightId) as item}<option value={item.id}
							>{item.shortName}</option
						>{/each}</select
				>
			</div>
			<div class="field">
				<label for="compare-second">Second object</label><select
					id="compare-second"
					bind:value={rightId}
					>{#each equipment.filter((item) => item.id !== leftId) as item}<option value={item.id}
							>{item.shortName}</option
						>{/each}</select
				>
			</div>
		</div>
		<p class="sr-only" role="status" aria-live="polite" aria-atomic="true">
			Comparing {comparison[0].name} with {comparison[1].name}.
		</p>
		<p class="comparison-help" id="comparison-help">
			Each menu offers different objects. On a small screen, scroll the table to see both columns.
		</p>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex (Keyboard users need to focus and scroll this overflow region.) -->
		<div
			class="comparison-scroll"
			role="region"
			aria-label="Equipment comparison"
			aria-describedby="comparison-help"
			tabindex="0"
		>
			<table
				aria-label={`Compare the mission, dates, status, and purpose of ${comparison[0].shortName} and ${comparison[1].shortName}.`}
			>
				<thead
					><tr
						><th scope="col">In the collection</th>{#each comparison as item}<th scope="col"
								><a href={`${base}/equipment/${item.id}`}
									>{item.shortName}<ArrowUpRight size={17} aria-hidden="true" /></a
								></th
							>{/each}</tr
					></thead
				>
				<tbody>
					<tr
						><th scope="row">Mission</th>{#each comparison as item}<td>{item.mission}</td
							>{/each}</tr
					>
					<tr
						><th scope="row">Destination</th>{#each comparison as item}<td>{item.destination}</td
							>{/each}</tr
					>
					<tr
						><th scope="row">Equipment type</th>{#each comparison as item}<td
								>{item.equipmentType}</td
							>{/each}</tr
					>
					<tr
						><th scope="row">Launch</th>{#each comparison as item}<td
								><time datetime={item.launchDate}>{formatDate(item.launchDate)}</time></td
							>{/each}</tr
					>
					<tr
						><th scope="row">Arrival / deployment</th>{#each comparison as item}<td
								>{#if item.deploymentDate}<time datetime={item.deploymentDate}
										>{formatDate(item.deploymentDate)}</time
									>{:else}Not applicable{/if}<span class="cell-note">{item.deploymentLabel}</span
								></td
							>{/each}</tr
					>
					<tr
						><th scope="row">Mission end</th>{#each comparison as item}<td
								>{#if item.missionEndDate}<time datetime={item.missionEndDate}
										>{formatDate(item.missionEndDate)}</time
									>{:else}No end date recorded{/if}</td
							>{/each}</tr
					>
					<tr
						><th scope="row">Date notes</th>{#each comparison as item}<td class="date-cell"
								>{item.dateNote}</td
							>{/each}</tr
					>
					<tr
						><th scope="row">Status</th>{#each comparison as item}<td
								><span class="pill" class:pill-green={item.status === 'Passive science'}
									>{item.status}</span
								><span class="cell-note">{item.statusDetail}</span></td
							>{/each}</tr
					>
					<tr
						><th scope="row">Purpose</th>{#each comparison as item}<td>{item.purpose}</td
							>{/each}</tr
					>
					<tr
						><th scope="row">Read the record</th>{#each comparison as item}<td
								><a class="text-link" href={`${base}/equipment/${item.id}`}
									>Profile & sources <ArrowRight aria-hidden="true" /><span class="sr-only">
										for {item.shortName}</span
									></a
								></td
							>{/each}</tr
					>
				</tbody>
			</table>
		</div>
	{:else}
		<p class="notice">Two equipment records are needed for a comparison.</p>
	{/if}
</section>

<section id="discover" class="discovery-section" aria-labelledby="discover-heading">
	<div class="shell lab-section">
		<div class="section-topline">
			<div>
				<span class="eyebrow">03 / TAKE YOUR CURIOSITY SOMEWHERE</span>
				<h2 class="section-title" id="discover-heading">Your next small discovery.</h2>
				<p class="section-description">
					These are self-guided investigations, not tracked achievements. Open the records, follow a
					source, and explain what you find in your own words.
				</p>
			</div>
			<a class="text-link" href={`${base}/atlas`}
				>Open the atlas <ArrowUpRight aria-hidden="true" /></a
			>
		</div>
		<div class="challenge-grid">
			{#each challenges as challenge, index (challenge.id)}<article class="challenge-card">
					<span class="challenge-number">FIELD NOTE / 0{index + 1}</span><span class="pill"
						>{challenge.item.destination}</span
					>
					<h3>{challenge.title}</h3>
					<p>{challenge.prompt}</p>
					<a
						class="text-link challenge-start"
						href={`${base}/atlas?destination=${encodeURIComponent(challenge.item.destination)}`}
						>Start in the atlas <ArrowUpRight aria-hidden="true" /></a
					>
					<details>
						<summary>Reveal a hint <ChevronRight size={15} aria-hidden="true" /></summary>
						<p>{challenge.hint}</p>
						<a class="text-link" href={`${base}/equipment/${challenge.item.id}`}
							>Open {challenge.item.shortName}<ArrowRight aria-hidden="true" /></a
						>
					</details>
				</article>{/each}
		</div>
	</div>
</section>

{#if concepts.length}
	<section id="concepts" class="shell lab-section" aria-labelledby="concepts-heading">
		<div class="section-topline">
			<div>
				<span class="eyebrow">04 / A FEW USEFUL IDEAS</span>
				<h2 class="section-title" id="concepts-heading">Small concepts. Wider horizons.</h2>
				<p class="section-description">
					Three ways to turn an observation into understanding, with real instruments behind each
					idea.
				</p>
			</div>
		</div>
		<div class="concept-grid">
			{#each concepts as question (question.id)}{#if question.concept}<article class="concept-card">
						<span class="concept-icon"
							>{#if question.id === 'passive-reflector'}<Lightbulb
									size={24}
									strokeWidth={1.4}
									aria-hidden="true"
								/>{:else if question.id === 'marsquakes'}<Activity
									size={24}
									strokeWidth={1.4}
									aria-hidden="true"
								/>{:else}<Orbit size={24} strokeWidth={1.4} aria-hidden="true" />{/if}</span
						>
						<h3>{question.concept.title}</h3>
						<p>{question.concept.description}</p>
						<a class="text-link" href={`${base}/equipment/${question.item.id}`}
							>See it in {question.item.shortName}<ArrowRight aria-hidden="true" /></a
						>{@render sourceLinks(question.references)}
					</article>{/if}{/each}
		</div>
	</section>
{/if}

{#if storyItems.length}
	<section class="shell lab-section story-section" aria-labelledby="stories-heading">
		<div class="section-topline">
			<div>
				<span class="eyebrow">THE SCIENCE HAS A STORY</span>
				<h2 class="section-title" id="stories-heading">Get to know the explorers.</h2>
				<p class="section-description">
					Behind every answer is a mission worth spending a little more time with.
				</p>
			</div>
			<a class="text-link" href={`${base}/explore`}
				>All museum objects <ArrowUpRight aria-hidden="true" /></a
			>
		</div>
		<div class="story-grid">
			{#each storyItems as item (item.id)}<EquipmentCard {item} />{/each}
		</div>
	</section>
{/if}

<style>
	.learning-heading {
		padding-bottom: 0;
	}
	.learning-heading h1 > span {
		color: #a4b8d8;
	}
	.learning-heading > p {
		max-width: 600px;
	}
	.activity-nav {
		display: flex;
		flex-wrap: wrap;
		gap: 9px 26px;
		padding-block: 27px 25px;
		border-bottom: 1px solid var(--line);
		margin-top: 13px;
	}
	.activity-nav a {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		color: #b6c6df;
		min-height: 44px;
		font-size: 11px;
	}
	.activity-nav a :global(svg) {
		color: #86aaf3;
	}
	.activity-nav a:hover {
		color: white;
	}
	.lab-section {
		padding-block: 66px;
	}
	.quiz-section {
		display: grid;
		grid-template-columns: 0.7fr 1.3fr;
		gap: 65px;
		align-items: start;
	}
	.section-intro {
		padding-top: 15px;
		min-width: 0;
	}
	.section-intro .section-title {
		font-size: clamp(32px, 3.5vw, 43px);
	}
	.section-intro .section-description {
		font-size: 13px;
		line-height: 1.9;
	}
	.quiz-method {
		display: flex;
		align-items: start;
		gap: 13px;
		padding-top: 24px;
		margin-top: 26px;
		border-top: 1px solid var(--line);
		color: #9cb0d1;
	}
	.quiz-method > :global(svg) {
		margin-top: 3px;
		color: #9abafe;
	}
	.quiz-method p {
		font-size: 11px;
	}
	.section-intro > .text-link {
		min-height: 44px;
		white-space: normal;
		margin-top: 17px;
	}
	.quiz-panel {
		min-width: 0;
		padding: 29px;
	}
	.quiz-progress > div {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 8px;
		font-size: 9px;
		color: #9aacc7;
	}
	.quiz-progress > div > span:first-child {
		letter-spacing: 0.11em;
		color: #c0d4fb;
	}
	progress {
		display: block;
		width: 100%;
		height: 3px;
		border: 0;
		border-radius: 0;
		background: #263449;
		color: #79a1fc;
		margin-top: 15px;
		appearance: none;
	}
	progress::-webkit-progress-bar {
		background: #263449;
	}
	progress::-webkit-progress-value {
		background: #79a1fc;
	}
	progress::-moz-progress-bar {
		background: #79a1fc;
	}
	.question-topic {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin-top: 28px;
	}
	.question-topic > span:first-child {
		font-size: 10px;
		color: #b2c3df;
	}
	.question-topic .pill {
		font-size: 8px;
		flex-shrink: 0;
	}
	.question-heading {
		font-size: clamp(22px, 2.3vw, 28px);
		font-weight: 500;
		letter-spacing: -0.035em;
		line-height: 1.35;
		margin-block: 16px 23px;
	}
	.quiz-choices {
		display: grid;
		gap: 10px;
		border: 0;
		margin: 0;
		padding: 0;
		min-width: 0;
	}
	.answer-choice {
		display: flex;
		align-items: start;
		gap: 12px;
		min-height: 58px;
		padding: 16px;
		border: 1px solid #ffffff20;
		border-radius: 5px;
		background: #0c1420;
		cursor: pointer;
	}
	.answer-choice:hover {
		border-color: #829bc3;
	}
	.answer-choice:focus-within {
		outline: 2px solid #9bbaff;
		outline-offset: 3px;
	}
	.answer-choice.selected {
		border-color: #739cf2;
		background: #578bff13;
	}
	.answer-choice.correct {
		border-color: #82cbaa80;
		background: #5c9d751a;
	}
	.answer-choice.incorrect {
		border-color: #e6ad8270;
		background: #a56c4217;
	}
	.answer-choice input {
		margin: 2px 0 0;
		accent-color: #80aaff;
		width: 17px;
		height: 17px;
		flex-shrink: 0;
		cursor: pointer;
	}
	.answer-choice input:disabled {
		cursor: default;
	}
	.quiz-choices:disabled .answer-choice {
		cursor: default;
	}
	.choice-text {
		font-size: 12px;
		line-height: 1.6;
		color: #d0dbee;
		display: block;
	}
	.choice-verdict {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-top: 9px;
		font-size: 10px;
		color: #e3ecfa;
	}
	.answer-feedback {
		margin-top: 20px;
		padding: 20px;
		border: 1px solid #c3946b45;
		background: #a1763d0a;
		border-radius: 5px;
	}
	.answer-feedback.answer-correct {
		border-color: #76b49145;
		background: #4c966712;
	}
	.answer-feedback h4 {
		display: flex;
		align-items: center;
		gap: 9px;
		font-size: 15px;
		font-weight: 500;
		margin: 0 0 12px;
	}
	.answer-feedback > p {
		color: #c4d1e5;
		font-size: 12px;
		line-height: 1.85;
	}
	.answer-feedback > .text-link {
		min-height: 44px;
		margin-top: 8px;
		white-space: normal;
		font-size: 11px;
	}
	.evidence-links {
		border-top: 1px solid var(--line);
		padding-top: 16px;
		margin-top: 8px;
	}
	.reference-list {
		list-style: none;
		margin: 6px 0 0;
		padding: 0;
	}
	.reference-list a {
		min-height: 44px;
		padding-block: 7px;
		font-size: 10px;
		line-height: 1.65;
	}
	.quiz-actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin-top: 23px;
	}
	.quiz-actions .button {
		min-height: 46px;
	}
	.restart-button {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 10px 5px;
		min-height: 44px;
		border: 1px solid transparent;
		color: #aabbd6;
		background: transparent;
		font-size: 10px;
	}
	.restart-button:hover {
		color: white;
	}
	.quiz-instruction {
		color: #a5b5cd;
		font-size: 9px;
		margin-top: 15px;
	}
	.quiz-results {
		padding-top: 28px;
	}
	.result-icon {
		width: 49px;
		height: 49px;
		border: 1px solid #578bff50;
		background: #578bff12;
		display: grid;
		place-items: center;
		border-radius: 50%;
		color: #acc8ff;
		margin-bottom: 19px;
	}
	.quiz-results h3 {
		font-size: 28px;
		font-weight: 500;
		letter-spacing: -0.035em;
	}
	.score {
		display: flex;
		align-items: baseline;
		gap: 12px;
		font-family: var(--font-display);
		line-height: 1;
		margin-block: 17px 20px;
	}
	.score strong {
		font-size: 73px;
		font-weight: 400;
		letter-spacing: -0.065em;
		color: #b1ccff;
	}
	.score > span {
		font-size: 25px;
		color: #8ba1c4;
	}
	.result-message {
		color: #b4c4dd;
		font-size: 12px;
	}
	.result-list {
		list-style: none;
		margin: 24px 0;
		padding: 0;
	}
	.result-list > li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 15px;
		padding-block: 12px;
		border-top: 1px solid var(--line);
	}
	.result-list > li > div > span {
		display: block;
		font-size: 10px;
		color: #c1cee3;
	}
	.result-list a {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		min-height: 44px;
		font-size: 11px;
		color: #aac8ff;
	}
	.result-list a:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.result-verdict {
		display: flex;
		align-items: center;
		gap: 7px;
		flex-shrink: 0;
		font-size: 10px;
	}
	.storage-note {
		font-size: 10px;
		color: #91a5c5;
		margin-top: 16px;
	}
	.comparison-section {
		position: relative;
		border-top: 1px solid var(--line);
		min-width: 0;
		overflow: hidden;
	}
	.comparison-section :global(.section-symbol) {
		color: #7495c9;
	}
	.comparison-selects {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 22px;
	}
	.comparison-selects .field {
		min-width: 0;
	}
	.comparison-help {
		color: #9aacc7;
		font-size: 10px;
		margin-block: 16px;
	}
	.comparison-scroll {
		width: 100%;
		max-width: 100%;
		min-width: 0;
		overflow-x: auto;
		border: 1px solid var(--line);
		border-radius: 6px;
	}
	table {
		width: 100%;
		min-width: 620px;
		border-collapse: collapse;
		table-layout: fixed;
		text-align: left;
	}
	th,
	td {
		vertical-align: top;
		padding: 17px 23px;
		border-bottom: 1px solid var(--line);
		font-size: 12px;
		line-height: 1.8;
		overflow-wrap: anywhere;
	}
	th + th,
	td {
		border-left: 1px solid var(--line);
	}
	thead {
		background: #111c2b;
	}
	thead th:first-child {
		width: 19%;
		font-size: 9px;
		color: #95a9c8;
		font-family: var(--font-sans);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		vertical-align: middle;
	}
	thead th {
		font-weight: 500;
		font-family: var(--font-display);
		font-size: 21px;
		letter-spacing: -0.025em;
	}
	thead a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		min-height: 44px;
	}
	thead a:hover {
		color: #a8c5ff;
	}
	thead a :global(svg) {
		color: #9ab8ef;
	}
	tbody th {
		color: #b4c2d8;
		font-size: 10px;
		font-weight: 500;
		background: #0d1420;
	}
	td {
		color: #cad6e8;
	}
	tbody tr:nth-child(even) td {
		background: #ffffff02;
	}
	tbody tr:last-child th,
	tbody tr:last-child td {
		border-bottom: 0;
	}
	.cell-note {
		display: block;
		font-size: 10px;
		color: #9eafc9;
		margin-top: 7px;
		line-height: 1.8;
	}
	td.date-cell {
		font-size: 10px;
		color: #9eafc9;
	}
	td .text-link {
		min-height: 44px;
		white-space: normal;
		font-size: 11px;
		color: #b0caff;
	}
	.discovery-section {
		background: #0c131e;
		border-block: 1px solid var(--line);
	}
	.challenge-grid,
	.concept-grid,
	.story-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 22px;
	}
	.challenge-card {
		display: flex;
		flex-direction: column;
		align-items: start;
		min-width: 0;
		padding: 26px;
		background: #101a28;
		border: 1px solid var(--line);
		border-radius: 6px;
	}
	.challenge-number {
		font-size: 9px;
		color: #8aa7d4;
		letter-spacing: 0.12em;
		margin-bottom: 21px;
	}
	.challenge-card .pill {
		margin-bottom: 15px;
	}
	.challenge-card h3 {
		font-size: 22px;
		font-weight: 500;
		letter-spacing: -0.03em;
		line-height: 1.3;
	}
	.challenge-card > p {
		font-size: 12px;
		color: #acbdd5;
		margin-block: 16px;
		line-height: 1.85;
	}
	.challenge-start {
		margin-top: auto;
	}
	.challenge-card .text-link {
		min-height: 44px;
		white-space: normal;
		font-size: 11px;
	}
	.challenge-card details {
		width: 100%;
		border-top: 1px solid var(--line);
		margin-top: 12px;
		padding-top: 6px;
	}
	.challenge-card summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		list-style: none;
		cursor: pointer;
		min-height: 44px;
		color: #b7c9e5;
		font-size: 11px;
	}
	.challenge-card summary::-webkit-details-marker {
		display: none;
	}
	.challenge-card summary:hover {
		color: white;
	}
	.challenge-card details[open] summary :global(svg) {
		transform: rotate(90deg);
	}
	.challenge-card details > p {
		font-size: 11px;
		color: #a9bbd7;
		margin-block: 7px 10px;
	}
	.concept-card {
		padding: 0 25px 0 0;
		min-width: 0;
	}
	.concept-card + .concept-card {
		padding-left: 25px;
		border-left: 1px solid var(--line);
	}
	.concept-icon {
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		border: 1px solid #507dc24a;
		color: #91b3f8;
		border-radius: 50%;
		margin-bottom: 22px;
		background: #2445721a;
	}
	.concept-card h3 {
		font-size: 23px;
		font-weight: 500;
		letter-spacing: -0.03em;
	}
	.concept-card > p {
		font-size: 12px;
		color: #aebdd5;
		margin-top: 15px;
		line-height: 1.85;
	}
	.concept-card > .text-link {
		min-height: 44px;
		white-space: normal;
		font-size: 11px;
		margin-top: 13px;
	}
	.concept-card .reference-list {
		border-top: 1px solid var(--line);
		padding-top: 9px;
		margin-top: 10px;
	}
	.story-section {
		border-top: 1px solid var(--line);
		padding-bottom: 80px;
	}
	@media (max-width: 1050px) {
		.quiz-section {
			grid-template-columns: 0.75fr 1.25fr;
			gap: 32px;
		}
		.quiz-panel {
			padding: 24px;
		}
		.challenge-grid,
		.concept-grid,
		.story-grid {
			gap: 17px;
		}
		.challenge-card {
			padding: 22px;
		}
		.concept-card {
			padding-right: 10px;
		}
		.concept-card + .concept-card {
			padding-left: 20px;
		}
	}
	@media (max-width: 800px) {
		.quiz-section {
			grid-template-columns: 1fr;
		}
		.section-intro {
			padding-top: 0;
		}
		.section-intro .section-title br {
			display: none;
		}
		.section-intro .section-description {
			max-width: 580px;
		}
		.quiz-method {
			max-width: 580px;
			margin-top: 20px;
			padding-top: 20px;
		}
		.challenge-grid {
			grid-template-columns: 1fr;
		}
		.challenge-card {
			display: block;
		}
		.challenge-number {
			display: block;
			margin-bottom: 15px;
		}
		.challenge-card > p {
			max-width: 560px;
		}
		.challenge-start {
			margin-top: 0;
		}
		.concept-grid {
			grid-template-columns: 1fr;
			gap: 28px;
		}
		.concept-card {
			padding: 0;
		}
		.concept-card + .concept-card {
			border-left: 0;
			border-top: 1px solid var(--line);
			padding: 28px 0 0;
		}
		.concept-icon {
			margin-bottom: 16px;
		}
		.story-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 600px) {
		.lab-section {
			padding-block: 45px;
		}
		.activity-nav {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 6px 14px;
			margin-top: 5px;
		}
		.activity-nav a {
			font-size: 10px;
			line-height: 1.6;
			align-items: start;
			padding-block: 12px;
		}
		.activity-nav a :global(svg) {
			margin-top: 1px;
		}
		.comparison-selects {
			grid-template-columns: 1fr;
			gap: 18px;
		}
		.story-grid {
			grid-template-columns: 1fr;
			gap: 22px;
		}
		.quiz-panel {
			padding: 21px;
		}
		.quiz-actions {
			flex-wrap: wrap;
		}
		.question-heading {
			font-size: 25px;
		}
		.answer-choice {
			padding: 14px 12px;
			gap: 10px;
		}
		.answer-feedback {
			padding: 16px;
		}
		.result-list > li {
			align-items: start;
			flex-direction: column;
			gap: 3px;
			padding-block: 15px;
		}
		th,
		td {
			padding: 15px 18px;
		}
		.comparison-section :global(.section-symbol) {
			display: none;
		}
	}
	@media (max-width: 380px) {
		.learning-heading h1 {
			font-size: 38px;
		}
		.activity-nav {
			grid-template-columns: 1fr;
		}
		.activity-nav a {
			padding-block: 10px;
		}
		.quiz-panel {
			padding: 17px;
		}
		.question-topic {
			align-items: start;
			flex-direction: column;
			gap: 9px;
		}
		.question-heading {
			font-size: 23px;
		}
		.choice-text {
			font-size: 11px;
		}
		.quiz-actions {
			align-items: stretch;
			flex-direction: column;
		}
		.restart-button {
			justify-content: center;
		}
		.challenge-card {
			padding: 21px;
		}
	}
</style>
