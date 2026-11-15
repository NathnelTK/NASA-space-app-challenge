import { chromium } from '@playwright/test';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';

const videoPath = fileURLToPath(
	new URL('../static/demo/abandoned-but-not-forgotten-30s.webm', import.meta.url)
);
const file = await stat(videoPath);
if (file.size < 100_000) throw new Error(`Demo video is unexpectedly small: ${file.size} bytes`);

const server = createServer((request, response) => {
	if (request.url === '/demo.webm') {
		response.writeHead(200, {
			'Content-Type': 'video/webm',
			'Content-Length': file.size,
			'Cache-Control': 'no-store'
		});
		createReadStream(videoPath).pipe(response);
		return;
	}
	response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	response.end('<!doctype html><video id="demo" src="/demo.webm" preload="metadata"></video>');
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const address = server.address();
if (!address || typeof address === 'string') throw new Error('Could not open verification server');

const browser = await chromium.launch();
try {
	const page = await browser.newPage();
	await page.goto(`http://127.0.0.1:${address.port}/`);
	const metadata = await page.locator('#demo').evaluate(
		(video) =>
			new Promise((resolve, reject) => {
				const read = () =>
					resolve({
						duration: video.duration,
						width: video.videoWidth,
						height: video.videoHeight,
						readyState: video.readyState
					});
				if (video.readyState >= 1) read();
				else {
					video.addEventListener('loadedmetadata', read, { once: true });
					video.addEventListener(
						'error',
						() => reject(new Error('Chromium could not decode the demo video')),
						{
							once: true
						}
					);
				}
			})
	);
	if (!Number.isFinite(metadata.duration) || metadata.duration < 28 || metadata.duration > 30) {
		throw new Error(`Demo must be 28–30 seconds; received ${metadata.duration}`);
	}
	if (metadata.width !== 1280 || metadata.height !== 720) {
		throw new Error(`Demo must be 1280×720; received ${metadata.width}×${metadata.height}`);
	}
	console.log(JSON.stringify({ ...metadata, bytes: file.size, codecContainer: 'WebM' }, null, 2));
} finally {
	await browser.close();
	await new Promise((resolve, reject) =>
		server.close((error) => (error ? reject(error) : resolve()))
	);
}
