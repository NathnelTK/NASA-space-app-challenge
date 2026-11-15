import { sources } from '../src/lib/data/sources.ts';
import { challenge } from '../src/lib/data/challenge.ts';

const urls = [...new Set([...sources.map((source) => source.url), challenge.resourcesUrl])];
let next = 0;
let failures = 0;

async function worker() {
	while (next < urls.length) {
		const url = urls[next++];
		try {
			const response = await fetch(url, {
				redirect: 'follow',
				signal: AbortSignal.timeout(25000),
				headers: { 'User-Agent': 'AbandonedNotForgotten-EducationalLinkCheck/1.0' }
			});
			const originalPath = new URL(url).pathname;
			const finalPath = new URL(response.url).pathname;
			const suspiciousRedirect = originalPath !== '/' && finalPath === '/';
			if (!response.ok || suspiciousRedirect) failures++;
			console.log(
				JSON.stringify({
					url,
					status: response.status,
					finalUrl: response.url,
					needsReview: !response.ok || suspiciousRedirect
				})
			);
			await response.body?.cancel();
		} catch (error) {
			failures++;
			console.log(
				JSON.stringify({ url, status: 'UNVERIFIED', error: error.cause?.code ?? error.message })
			);
		}
	}
}

await Promise.all(Array.from({ length: 4 }, worker));
console.log(
	`Checked ${urls.length} URLs. ${failures} require review. A response does not independently verify factual content or usage rights.`
);
if (failures) process.exitCode = 1;
