import { chromium } from '@playwright/test';
import { createReadStream } from 'node:fs';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { basename, dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const screenshotRoot = resolve(root, 'screenshots');
const output = resolve(root, 'static/demo/abandoned-but-not-forgotten-30s.webm');

const images = {
	home: 'image.png',
	atlas: 'Screenshot_15-11-2026_173356_127.0.0.1.jpeg',
	collection: 'Screenshot_15-11-2026_17366_127.0.0.1.jpeg',
	timeline: 'Screenshot_15-11-2026_173713_127.0.0.1.jpeg',
	learn: 'Screenshot_15-11-2026_173816_127.0.0.1.jpeg'
};

for (const file of Object.values(images)) {
	if ((await stat(resolve(screenshotRoot, file))).size < 10_000) {
		throw new Error(`Screenshot is unexpectedly small: ${file}`);
	}
}
await mkdir(dirname(output), { recursive: true });

const assets = new Map(
	Object.entries(images).map(([id, file]) => [`/screenshots/${encodeURIComponent(file)}`, resolve(screenshotRoot, file)])
);
const server = createServer((request, response) => {
	const asset = assets.get(request.url ?? '');
	if (asset) {
		const type = extname(asset).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg';
		response.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
		createReadStream(asset).pipe(response);
		return;
	}
	response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	response.end(
		'<!doctype html><meta name="viewport" content="width=device-width"><style>html,body{margin:0;background:#050912;overflow:hidden}canvas{display:block;width:1280px;height:720px}</style><canvas id="movie" width="1280" height="720"></canvas>'
	);
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const address = server.address();
if (!address || typeof address === 'string') throw new Error('Could not open demo rendering server');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.exposeFunction('saveDemoVideo', async (base64) => {
	await writeFile(output, Buffer.from(base64, 'base64'));
});
await page.goto(`http://127.0.0.1:${address.port}/`);

try {
	const result = await page.evaluate(
		async ({ imageUrls }) => {
			const width = 1280;
			const height = 720;
			const duration = 28.4;
			const canvas = document.querySelector('#movie');
			const context = canvas.getContext('2d', { alpha: false });
			context.imageSmoothingEnabled = true;
			context.imageSmoothingQuality = 'high';

			const loaded = Object.fromEntries(
				await Promise.all(
					Object.entries(imageUrls).map(
						([id, url]) =>
							new Promise((resolve, reject) => {
								const image = new Image();
								image.onload = () => resolve([id, image]);
								image.onerror = () => reject(new Error(`Could not decode ${id}`));
								image.src = url;
							})
					)
				)
			);

			const scenes = [
				{
					start: 0,
					end: 3.4,
					image: 'home',
					y0: 0,
					y1: 0.025,
					zoom0: 1,
					zoom1: 1.06,
					path: 'src/routes · lib/components',
					kicker: 'SvelteKit 2 + Svelte 5',
					title: 'One codebase. A complete digital museum.',
					copy: 'Reusable routes, navigation, cards, galleries, and responsive layouts compose the whole experience.'
				},
				{
					start: 3.4,
					end: 6.8,
					image: 'home',
					y0: 0.18,
					y1: 0.3,
					zoom0: 1.04,
					zoom1: 1.12,
					path: 'src/lib/data/equipment.ts',
					kicker: 'Typed local data',
					title: 'One evidence model drives every exhibit.',
					copy: 'Eight records feed destination cards, profiles, dates, status, media, related missions, and citations.'
				},
				{
					start: 6.8,
					end: 10.3,
					image: 'collection',
					y0: 0.015,
					y1: 0.2,
					zoom0: 1,
					zoom1: 1.1,
					path: 'src/routes/explore/+page.svelte',
					kicker: 'Reactive explorer',
					title: 'Search state stays useful and shareable.',
					copy: 'URL-backed controls combine destination, mission, equipment type, launch year, text search, and sorting.'
				},
				{
					start: 10.3,
					end: 13.8,
					image: 'atlas',
					y0: 0.01,
					y1: 0.16,
					zoom0: 1.02,
					zoom1: 1.14,
					path: 'src/lib/atlas.ts · d3-geo',
					kicker: 'Coordinate projection',
					title: 'Source coordinates become an atlas.',
					copy: 'D3 Geo projects documented sites while null, approximate, shared, and deep-space locations remain explicit.'
				},
				{
					start: 13.8,
					end: 17.3,
					image: 'timeline',
					y0: 0,
					y1: 0.16,
					zoom0: 1,
					zoom1: 1.12,
					path: 'src/routes/timeline/+page.svelte',
					kicker: 'Data-driven chronology',
					title: 'One event model. Decades of history.',
					copy: 'Every milestone is sorted, filtered, expandable, date-aware, and linked back to its supporting evidence.'
				},
				{
					start: 17.3,
					end: 20.8,
					image: 'learn',
					y0: 0.01,
					y1: 0.14,
					zoom0: 1.02,
					zoom1: 1.13,
					path: 'src/lib/data/learning.ts',
					kicker: 'Interactive learning state',
					title: 'Questions become scientific explanations.',
					copy: 'The quiz checks answers, reveals cited reasoning, tracks progress, restarts cleanly, and supports keyboard users.'
				},
				{
					start: 20.8,
					end: 24.3,
					image: 'learn',
					y0: 0.25,
					y1: 0.47,
					zoom0: 1,
					zoom1: 1.1,
					path: 'SourceRefs.svelte · sources.ts',
					kicker: 'Shared provenance',
					title: 'The same evidence powers every activity.',
					copy: 'Comparisons, concepts, discovery challenges, image credits, and downloadable data reuse field-level sources.'
				},
				{
					start: 24.3,
					end: 28.4,
					image: 'home',
					y0: 0.71,
					y1: 0.84,
					zoom0: 1.03,
					zoom1: 1.13,
					path: 'adapter-static · collection.json · Playwright',
					kicker: 'Static. Testable. Ready to share.',
					title: 'Abandoned but Not Forgotten',
					copy: 'Eight sourced exhibits. Verified NASA resources. 44 browser journeys. Transparent AI and media disclosure.'
				}
			];

			const ease = (value) => value * value * (3 - 2 * value);
			const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
			const roundRect = (x, y, w, h, r) => {
				context.beginPath();
				context.roundRect(x, y, w, h, r);
			};
			const wrap = (text, maxWidth) => {
				const words = text.split(' ');
				const lines = [];
				let line = '';
				for (const word of words) {
					const candidate = line ? `${line} ${word}` : word;
					if (line && context.measureText(candidate).width > maxWidth) {
						lines.push(line);
						line = word;
					} else line = candidate;
				}
				if (line) lines.push(line);
				return lines;
			};

			function drawScene(scene, elapsed) {
				const image = loaded[scene.image];
				const local = clamp((elapsed - scene.start) / (scene.end - scene.start), 0, 1);
				const motion = ease(local);
				const zoom = scene.zoom0 + (scene.zoom1 - scene.zoom0) * motion;
				const sourceWidth = image.naturalWidth / zoom;
				const sourceHeight = sourceWidth * (height / width);
				const maxY = Math.max(0, image.naturalHeight - sourceHeight);
				const sourceY = maxY * (scene.y0 + (scene.y1 - scene.y0) * motion);
				const sourceX = (image.naturalWidth - sourceWidth) / 2;
				context.fillStyle = '#050912';
				context.fillRect(0, 0, width, height);
				context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);

				const cutFade = Math.min(1, local / 0.12, (1 - local) / 0.1);
				context.fillStyle = `rgba(4, 8, 15, ${0.08 + (1 - cutFade) * 0.92})`;
				context.fillRect(0, 0, width, height);
				const gradient = context.createLinearGradient(0, 280, 0, 720);
				gradient.addColorStop(0, 'rgba(4, 8, 15, 0)');
				gradient.addColorStop(1, 'rgba(4, 8, 15, .9)');
				context.fillStyle = gradient;
				context.fillRect(0, 240, width, 480);

				const captionIn = ease(clamp(local / 0.18, 0, 1));
				context.save();
				context.globalAlpha = captionIn;
				context.translate(0, (1 - captionIn) * 18);
				context.fillStyle = 'rgba(7, 13, 23, .9)';
				context.strokeStyle = 'rgba(126, 165, 255, .55)';
				context.lineWidth = 1;
				roundRect(46, 478, 805, 190, 8);
				context.fill();
				context.stroke();
				context.fillStyle = '#89adff';
				context.font = '700 12px Consolas, monospace';
				context.fillText(scene.kicker.toUpperCase(), 70, 512);
				context.fillStyle = '#f4f7ff';
				context.font = '600 31px "Segoe UI", Arial, sans-serif';
				const titleLines = wrap(scene.title, 735).slice(0, 2);
				titleLines.forEach((line, index) => context.fillText(line, 70, 554 + index * 36));
				context.fillStyle = '#b9c8df';
				context.font = '400 15px "Segoe UI", Arial, sans-serif';
				const copyY = 606 + Math.max(0, titleLines.length - 1) * 24;
				wrap(scene.copy, 735)
					.slice(0, 2)
					.forEach((line, index) => context.fillText(line, 70, copyY + index * 23));
				context.restore();

				context.save();
				context.globalAlpha = captionIn;
				context.fillStyle = 'rgba(7, 13, 23, .86)';
				roundRect(870, 34, 364, 44, 6);
				context.fill();
				context.strokeStyle = 'rgba(255, 255, 255, .18)';
				context.stroke();
				context.fillStyle = '#a9bde0';
				context.font = '500 12px Consolas, monospace';
				context.textAlign = 'right';
				context.fillText(scene.path, 1212, 61);
				context.restore();

				context.fillStyle = 'rgba(255,255,255,.15)';
				context.fillRect(46, 697, 1188, 2);
				context.fillStyle = '#6493ff';
				context.fillRect(46, 697, 1188 * (elapsed / duration), 2);
			}

			const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
				? 'video/webm;codecs=vp9'
				: 'video/webm;codecs=vp8';
			const stream = canvas.captureStream(30);
			const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8_000_000 });
			const chunks = [];
			recorder.addEventListener('dataavailable', (event) => {
				if (event.data.size) chunks.push(event.data);
			});
			const stopped = new Promise((resolve) => recorder.addEventListener('stop', resolve, { once: true }));
			recorder.start(1000);
			const started = performance.now();
			await new Promise((resolve) => {
				const render = (now) => {
					const elapsed = (now - started) / 1000;
					const scene = scenes.find((candidate) => elapsed >= candidate.start && elapsed < candidate.end) ?? scenes.at(-1);
					drawScene(scene, Math.min(elapsed, duration));
					if (elapsed < duration) requestAnimationFrame(render);
					else resolve();
				};
				requestAnimationFrame(render);
			});
			recorder.stop();
			await stopped;
			stream.getTracks().forEach((track) => track.stop());
			const blob = new Blob(chunks, { type: mimeType });
			const base64 = await new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => resolve(reader.result.split(',')[1]);
				reader.onerror = () => reject(reader.error);
				reader.readAsDataURL(blob);
			});
			await window.saveDemoVideo(base64);
			return { bytes: blob.size, duration, mimeType, scenes: scenes.length };
		},
		{
			imageUrls: Object.fromEntries(
				Object.entries(images).map(([id, file]) => [
					id,
					`http://127.0.0.1:${address.port}/screenshots/${encodeURIComponent(basename(file))}`
				])
			)
		}
	);
	console.log(JSON.stringify({ output, ...result }, null, 2));
} finally {
	await browser.close();
	await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}
