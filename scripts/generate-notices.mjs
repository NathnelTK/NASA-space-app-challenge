import { readFile, readdir, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const lock = JSON.parse(await readFile(new URL('package-lock.json', root), 'utf8'));
const notices = [
	'ABANDONED BUT NOT FORGOTTEN - OPEN-SOURCE SOFTWARE NOTICES',
	'',
	'This inventory includes installed application dependencies and development tooling. It does not grant rights to NASA or third-party media, establish a project-wide code license, or imply endorsement. Media sources and conditions are recorded separately in SOURCES.md and /sources.',
	''
];
let count = 0;
for (const [path, metadata] of Object.entries(lock.packages ?? {})) {
	if (!path.includes('node_modules/')) continue;
	const directory = new URL(`${path}/`, root);
	const files = await readdir(directory, { withFileTypes: true }).catch(() => []);
	if (!files.length) continue;
	const licenseFiles = files.filter(
		(file) => file.isFile() && /^(licen[cs]e|copying|ofl|notice)([.-].*)?$/i.test(file.name)
	);
	const name = path.slice(path.lastIndexOf('node_modules/') + 'node_modules/'.length);
	notices.push(
		'='.repeat(72),
		`${name} ${metadata.version ?? ''}`,
		`Declared license: ${metadata.license ?? 'See distributed package'}`,
		`Registry: https://www.npmjs.com/package/${name}`,
		''
	);
	if (licenseFiles.length) {
		for (const file of licenseFiles)
			notices.push(`${file.name}:`, await readFile(new URL(file.name, directory), 'utf8'), '');
	} else {
		notices.push(
			'No root license file was included in this installed package. Consult the package distribution and repository for its complete terms.',
			''
		);
	}
	count++;
}
await writeFile(new URL('static/third-party-notices.txt', root), notices.join('\n'), 'utf8');
console.log(`Stored notices for ${count} installed software packages.`);
