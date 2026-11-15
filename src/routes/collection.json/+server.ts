import { json } from '@sveltejs/kit';
import { equipment } from '$lib/data/equipment';
import { sources } from '$lib/data/sources';
import { editorialMedia } from '$lib/data/media';
import { challenge } from '$lib/data/challenge';

export const prerender = true;

export function GET() {
	return json(
		{
			title: 'Abandoned but Not Forgotten',
			schemaVersion: '1.0',
			curatedAt: '2026-11-15',
			disclaimer:
				'Independent educational project. Not affiliated with or endorsed by NASA. This is a curated historical dataset, not live telemetry or a complete inventory.',
			aiDisclosure: {
				tool: 'Kilo Code',
				model: 'gpt-6-astra (agent_router12/gpt-6-astra)',
				uses: [
					'Code',
					'Source retrieval assistance',
					'Educational wording',
					'Data structuring',
					'Tests'
				],
				generatedImages: false,
				generatedVideo: false,
				generatedAudio: false,
				humanScientificReview: 'Not claimed; required before final submission'
			},
			challenge,
			equipment,
			editorialMedia,
			sources
		},
		{ headers: { 'Cache-Control': 'public, max-age=3600' } }
	);
}
