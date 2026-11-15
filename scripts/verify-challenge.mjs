import { chromium } from '@playwright/test';
import { challenge } from '../src/lib/data/challenge.ts';

// Research check only. Certificate validation remains enabled; no evidence is promoted automatically.
const browser = await chromium.launch();
try {
	const context = await browser.newContext({ ignoreHTTPSErrors: false });
	const page = await context.newPage();
	const response = await page.goto(challenge.resourcesUrl, {
		waitUntil: 'domcontentloaded',
		timeout: 45000
	});
	const heading = page.getByText('NASA Data & Resources', { exact: true }).first();
	await heading.waitFor({ timeout: 20000 });
	const anchors = await heading.evaluate((element) => {
		let section = element.parentElement;
		while (
			section &&
			!Array.from(section.querySelectorAll('a')).some((link) => link.href.includes('1969-059C'))
		)
			section = section.parentElement;
		if (!section) return [];
		return Array.from(section.querySelectorAll('a[href]')).map((link) => ({
			name: link.textContent?.trim(),
			url: link.href
		}));
	});
	const membership = challenge.resourceLinks.map((resource) => ({
		...resource,
		present: anchors.some((link) => link.url.replace(/\/$/, '') === resource.url.replace(/\/$/, ''))
	}));
	console.log(
		JSON.stringify(
			{
				url: page.url(),
				status: response?.status(),
				title: await page.title(),
				tlsValidationDisabled: false,
				resourceSectionLinks: anchors,
				membership
			},
			null,
			2
		)
	);
	if (!response?.ok() || membership.some((entry) => !entry.present)) process.exitCode = 1;
} catch (error) {
	console.error(`Challenge verification remains unresolved: ${error.message}`);
	process.exitCode = 1;
} finally {
	await browser.close();
}
