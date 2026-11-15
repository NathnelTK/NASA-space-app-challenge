import type { Source } from './types';
import { lunarSources } from './lunar.ts';
import { marsDeepSources } from './mars-deep.ts';
import { mediaSources } from './media.ts';
import { challenge } from './challenge.ts';

const software: {
	id: string;
	name: string;
	url: string;
	organization: string;
	license: string;
	usage: string;
	type?: 'Font';
}[] = [
	{
		id: 'software-svelte',
		name: 'Svelte 5',
		url: 'https://svelte.dev/',
		organization: 'Svelte contributors',
		license: 'MIT',
		usage: 'Reactive components, accessible interactions, and compiled user interface.'
	},
	{
		id: 'software-sveltekit',
		name: 'SvelteKit 2, adapter-static, vite-plugin-svelte, svelte-check',
		url: 'https://svelte.dev/docs/kit/introduction',
		organization: 'Svelte contributors',
		license: 'MIT',
		usage: 'Routing, prerendering, static deployment, compiler integration, and type checks.'
	},
	{
		id: 'software-tailwind',
		name: 'Tailwind CSS and @tailwindcss/vite',
		url: 'https://tailwindcss.com/',
		organization: 'Tailwind Labs',
		license: 'MIT',
		usage: 'CSS foundation, theme tokens, responsive styling, and build integration.'
	},
	{
		id: 'software-d3',
		name: 'D3 Geo',
		url: 'https://d3js.org/d3-geo',
		organization: 'Mike Bostock and D3 contributors',
		license: 'ISC',
		usage:
			'Orthographic planetary-coordinate projections and graticules. No Earth basemap or invented planetary surface data.'
	},
	{
		id: 'software-lucide',
		name: 'Lucide (@lucide/svelte)',
		url: 'https://lucide.dev/license',
		organization: 'Lucide contributors',
		license: 'ISC; some inherited Feather icons are MIT',
		usage: 'Interface icons and the independent museum orbit symbol. Not NASA branding.'
	},
	{
		id: 'font-inter',
		name: 'Inter Variable via Fontsource',
		url: 'https://fontsource.org/fonts/inter',
		organization: 'Rasmus Andersson; Fontsource distributors',
		license: 'SIL Open Font License 1.1; Fontsource packaging MIT',
		usage: 'Locally served body and interface typography; no Google Fonts runtime requests.',
		type: 'Font'
	},
	{
		id: 'font-space-grotesk',
		name: 'Space Grotesk Variable via Fontsource',
		url: 'https://fontsource.org/fonts/space-grotesk',
		organization: 'Florian Karsten; Fontsource distributors',
		license: 'SIL Open Font License 1.1; Fontsource packaging MIT',
		usage: 'Locally served editorial headings and numerical labels.',
		type: 'Font'
	},
	{
		id: 'software-typescript',
		name: 'TypeScript',
		url: 'https://www.typescriptlang.org/',
		organization: 'Microsoft and TypeScript contributors',
		license: 'Apache-2.0',
		usage: 'Typed records, field-level provenance, and application validation.'
	},
	{
		id: 'software-vite',
		name: 'Vite',
		url: 'https://vite.dev/',
		organization: 'Vite contributors',
		license: 'MIT',
		usage: 'Local development and production bundling. Dev server binds to localhost.'
	},
	{
		id: 'software-playwright',
		name: 'Playwright Test',
		url: 'https://playwright.dev/',
		organization: 'Microsoft and Playwright contributors',
		license: 'Apache-2.0',
		usage:
			'Browser tests for navigation, filters, profiles, atlas, timeline, learning, accessibility, and mobile viewports.'
	},
	{
		id: 'software-node',
		name: 'Node.js and npm',
		url: 'https://nodejs.org/',
		organization: 'OpenJS Foundation and npm contributors',
		license: 'Node.js MIT with bundled third-party notices; npm Artistic-2.0',
		usage:
			'Build runtime, native unit tests, package resolution, link checks, and reproducible archive downloads.'
	},
	{
		id: 'software-prettier',
		name: 'Prettier and prettier-plugin-svelte',
		url: 'https://prettier.io/',
		organization: 'Prettier and Svelte plugin contributors',
		license: 'MIT',
		usage: 'Consistent code formatting.'
	},
	{
		id: 'software-types',
		name: '@types/node and @types/d3-geo',
		url: 'https://github.com/DefinitelyTyped/DefinitelyTyped',
		organization: 'DefinitelyTyped contributors',
		license: 'MIT',
		usage: 'Development-only TypeScript declarations.'
	},
	{
		id: 'tool-kilo',
		name: 'Kilo Code AI assistant',
		url: 'https://kilo.ai/',
		organization: 'Kilo; model reported as gpt-6-astra (agent_router12/gpt-6-astra)',
		license:
			'Tool use subject to provider terms; not a license for referenced NASA or third-party assets.',
		usage:
			'AI-assisted research retrieval, source curation, explanatory writing, architecture, code, and tests. No AI-generated image, video, or audio assets.'
	}
];

const softwareSources: Source[] = software.map((entry) => ({
	...entry,
	type: entry.type ?? 'Software',
	provides:
		entry.type === 'Font'
			? 'Openly licensed font files.'
			: 'Application or development tooling, not scientific evidence.',
	accessed: '2026-11-15',
	verification: 'Verified',
	challengeResource: null
}));

const policySources: Source[] = [
	{
		id: 'policy-nasa-media',
		name: 'NASA Images and Media Usage Guidelines',
		url: 'https://www.nasa.gov/nasa-brand-center/images-and-media/',
		organization: 'NASA',
		type: 'Policy',
		provides:
			'Educational use, credits, third-party rights, generated content, and endorsement guidance.',
		usage:
			'Guides selection and crediting of authentic archive media. Credit does not replace third-party permission.',
		license: 'Policy reference, not a blanket license for third-party content.',
		accessed: '2026-11-15',
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'policy-nasa-brand',
		name: 'NASA Brand Guidelines',
		url: 'https://www.nasa.gov/nasa-brand-center/brand-guidelines/',
		organization: 'NASA',
		type: 'Policy',
		provides: 'Restrictions on NASA insignia, logotypes, and implied endorsement.',
		usage:
			'No NASA insignia, mission patches, or NASA Data Insignia are used as project branding. Insignia incidentally present in authentic historical photographs are not generated.',
		license:
			'Branding rights are reserved; ordinary NASA image use does not grant branding permission.',
		accessed: '2026-11-15',
		verification: 'Verified',
		challengeResource: null
	}
];

export const sources: Source[] = [
	...lunarSources,
	...marsDeepSources,
	...mediaSources,
	...policySources,
	...softwareSources
].map((source) => ({ ...source, challengeResource: isObservedChallengeSource(source) }));
export const sourceById: Record<string, Source> = Object.fromEntries(
	sources.map((source) => [source.id, source])
);

export function isObservedChallengeSource(source: Source): boolean {
	const normalize = (url: string) => url.replace(/\/$/, '');
	return challenge.resourceLinks.some(
		(resource) => normalize(resource.url) === normalize(source.url)
	);
}
