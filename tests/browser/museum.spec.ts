import { test, expect } from './fixtures';
import { equipment } from '../../src/lib/data/equipment.ts';

test('landing page loads local imagery and the primary journey works', async ({
	page
}, testInfo) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('Left behind.');
	await expect(page.locator('.hero-visual img')).toBeVisible();
	await expect
		.poll(() =>
			page.locator('.hero-visual img').evaluate((image) => (image as HTMLImageElement).naturalWidth)
		)
		.toBeGreaterThan(1000);
	await page.screenshot({ path: `test-results/home-${testInfo.project.name}.png` });
	await page.getByRole('link', { name: 'Start exploring', exact: false }).click();
	await expect(page).toHaveURL(/\/explore\//);
	await expect(page.locator('article.equipment-card')).toHaveCount(8);
	await expect(page.getByRole('heading', { level: 1 })).toContainText('Extraordinary machines');
	assertNoErrors(errors);
});

test('destination links preserve filters and search produces a recoverable empty state', async ({
	page
}) => {
	await page.goto('/explore/?destination=Moon');
	await expect(page.locator('article.equipment-card')).toHaveCount(3);
	await expect(page.getByRole('button', { name: /^Moon/ })).toHaveAttribute('aria-pressed', 'true');
	await page.getByLabel('Search equipment').fill('Opportunity');
	await expect(page.getByRole('heading', { name: 'No stories on this path. Yet.' })).toBeVisible();
	await page.getByRole('button', { name: 'Reset filters', exact: false }).click();
	await expect(page.locator('article.equipment-card')).toHaveCount(8);
	await page.getByLabel('Search equipment').fill('  opportunity  ');
	await expect(page.locator('article.equipment-card')).toHaveCount(1);
	await expect(page.locator('article.equipment-card h3')).toContainText('Opportunity');
	await page.reload();
	await expect(page.locator('article.equipment-card')).toHaveCount(1);
});

test('category, mission, year, sort, and reset controls work together', async ({ page }) => {
	await page.goto('/explore/');
	await page.getByLabel('Equipment type', { exact: true }).selectOption('Rovers');
	await expect(page.locator('article.equipment-card')).toHaveCount(2);
	await page.getByLabel('Launch year', { exact: true }).selectOption('1971');
	await expect(page.locator('article.equipment-card')).toHaveCount(1);
	await expect(page.locator('article.equipment-card h3')).toContainText(
		equipment.find((item) => item.id === 'apollo-15-rover')!.shortName
	);
	await page.getByRole('button', { name: 'Clear all filters', exact: false }).click();
	await page
		.getByLabel('Mission', { exact: true })
		.selectOption(equipment.find((item) => item.id === 'insight')!.mission);
	await expect(page.locator('article.equipment-card')).toHaveCount(1);
	await page.getByRole('button', { name: 'Clear all filters', exact: false }).click();
	await page.getByLabel('Sort collection').selectOption('newest');
	await expect(page.locator('article.equipment-card h3').first()).toContainText('InSight');
});

for (const item of equipment) {
	test(`exhibit ${item.id} has working narrative, archive, and source links`, async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (error) => errors.push(error.message));
		await page.goto(`/equipment/${item.id}/`);
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(item.name);
		await expect(page.locator('#references .reference-list a')).toHaveCount(item.sources.length);
		await expect(page.locator('.main-photo img')).toBeVisible();
		await page.locator('#history details').last().locator('summary').click();
		await expect(page.locator('#history details').last()).toHaveAttribute('open', '');
		await page.locator('.gallery-thumb').first().click();
		await expect(page.getByRole('dialog')).toBeVisible();
		await expect(page.getByRole('button', { name: 'Close gallery' })).toBeFocused();
		await page.keyboard.press('Escape');
		await expect(page.getByRole('dialog')).not.toBeVisible();
		await expect(page.locator('.gallery-thumb').first()).toBeFocused();
		assertNoErrors(errors);
	});
}

test('source library reports verified resources and real machine-readable provenance', async ({
	page,
	request
}) => {
	await page.goto('/sources/');
	await expect(
		page.getByText('Global Award eligibility is not verified.', { exact: true })
	).toBeVisible();
	await page.getByLabel('Search references').fill('galileo');
	await expect(page.locator('.source-entry')).toHaveCount(1);
	await page.getByLabel('Search references').fill('xyz-no-reference');
	await expect(page.getByRole('heading', { name: 'No matching references.' })).toBeVisible();
	await page.getByRole('button', { name: 'Reset reference search' }).click();
	await page.getByRole('button', { name: 'Images', exact: true }).click();
	await expect(page.locator('.source-entry').first()).toContainText('Image archive');
	const response = await request.get('/collection.json');
	expect(response.ok()).toBeTruthy();
	const data = await response.json();
	expect(data.equipment).toHaveLength(8);
	expect(data.aiDisclosure.generatedImages).toBe(false);
	expect(data.challenge.eligibility).toBe('Not verified');
});

test('mobile navigation, keyboard escape, and internal navigation are usable', async ({
	page,
	isMobile
}) => {
	await page.goto('/');
	if (isMobile) {
		await page.getByRole('button', { name: 'Open navigation' }).click();
		await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
		await page.keyboard.press('Escape');
		await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).not.toBeVisible();
		await page.getByRole('button', { name: 'Open navigation' }).click();
		await page
			.getByRole('navigation', { name: 'Mobile navigation' })
			.getByRole('link', { name: 'Timeline' })
			.click();
	} else {
		await page
			.getByRole('navigation', { name: 'Main navigation' })
			.getByRole('link', { name: 'Timeline' })
			.click();
	}
	await expect(page).toHaveURL(/\/timeline\//);
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('every main page fits narrow screens without horizontal overflow', async ({ page }) => {
	await page.setViewportSize({ width: 320, height: 780 });
	for (const path of [
		'/',
		'/explore/',
		'/atlas/',
		'/timeline/',
		'/learn/',
		'/sources/',
		'/equipment/apollo-11-reflector/'
	]) {
		await page.goto(path);
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
		await expect
			.poll(() =>
				page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)
			)
			.toBe(true);
	}
});

test('image failures show an honest fallback without breaking navigation', async ({ page }) => {
	await page.route('**/media/lunar-hero.jpg', (route) => route.abort());
	await page.goto('/');
	await expect(page.getByText('Archive image unavailable', { exact: true })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Start exploring', exact: false })).toBeVisible();
});

test('unknown exhibits return a real error page', async ({ page }) => {
	for (const id of ['not-a-real-object', 'constructor', '__proto__']) {
		const response = await page.goto(`/equipment/${id}/`);
		expect(response?.status()).toBe(404);
		await expect(
			page.getByRole('link', { name: 'Back to the collection', exact: false })
		).toBeVisible();
	}
});

test('open gallery is dismissed when browser history changes the exhibit', async ({ page }) => {
	await page.goto('/equipment/eagle-descent-stage/');
	await page.locator('.related-grid h3 a').first().click();
	await page.locator('.gallery-thumb').first().click();
	await expect(page.getByRole('dialog')).toBeVisible();
	await page.goBack();
	await expect(page).toHaveURL(/\/equipment\/eagle-descent-stage\//);
	await expect(page.locator('dialog')).not.toBeVisible();
});

function assertNoErrors(errors: string[]) {
	expect(errors).toEqual([]);
}
