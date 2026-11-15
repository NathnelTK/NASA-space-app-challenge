import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { basename, join } from 'node:path';

const root = fileURLToPath(new URL('../static/media/', import.meta.url));
const manifestFiles = ['media-manifest.json', 'lunar-media.json', 'mars-deep-media.json'];
const manifest = (
	await Promise.all(
		manifestFiles.map(async (file) =>
			JSON.parse(await readFile(new URL(`./${file}`, import.meta.url), 'utf8'))
		)
	)
).flat();
if (new Set(manifest.map(({ file }) => file)).size !== manifest.length) {
	throw new Error('Duplicate media filenames across manifests');
}
await mkdir(root, { recursive: true });
let failed = false;

for (const { file, url } of manifest) {
	if (basename(file) !== file) throw new Error(`Unsafe media filename: ${file}`);
	const output = join(root, file);
	if (
		await stat(output)
			.then((s) => s.size > 1000)
			.catch(() => false)
	) {
		console.log(`Already stored: ${file}`);
		continue;
	}
	try {
		const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
		if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) {
			throw new Error(`Expected an image, received HTTP ${response.status}`);
		}
		const bytes = Buffer.from(await response.arrayBuffer());
		if (bytes.length < 1000) throw new Error('Suspiciously small image response');
		await writeFile(output, bytes);
		console.log(`Stored: ${file} (${bytes.length} bytes)`);
	} catch (error) {
		failed = true;
		console.error(`Could not fetch ${file}: ${error.message}`);
	}
}

if (failed) process.exitCode = 1;
