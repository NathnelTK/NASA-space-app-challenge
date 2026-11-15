import { test, expect } from './fixtures';
import { equipment, equipmentById } from '../../src/lib/data/equipment.ts';
import { learningQuestions } from '../../src/lib/data/learning.ts';

test('planetary atlas has selectable true-coordinate markers, filters, and view controls', async ({
	page
}, testInfo) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	await page.goto('/atlas/?destination=Moon');
	await expect(
		page.getByRole('figure', { name: /Moon: schematic coordinate atlas/ })
	).toBeVisible();
	await expect(page.locator('.site-marker')).toHaveCount(3);
	await page.locator('.site-marker').last().click();
	await expect(page.locator('#selected-record-heading')).toBeVisible();
	await page.getByRole('button', { name: 'Zoom in', exact: true }).click();
	await expect(page.getByLabel('Zoom level')).toHaveText('125%');
	await page.getByRole('button', { name: 'Rotate east by 15 degrees' }).click();
	await page.getByRole('button', { name: 'Reset view', exact: true }).click();
	await expect(page.getByLabel('Zoom level')).toHaveText('100%');
	await page.getByLabel('Equipment type', { exact: true }).selectOption('Rovers');
	await expect(page.locator('.site-marker')).toHaveCount(1);
	await expect(page.getByRole('button', { name: /^Select / })).toHaveCount(1);
	await page.getByRole('button', { name: 'Mars', exact: true }).click();
	await expect(
		page.getByRole('figure', { name: /Mars: schematic coordinate atlas/ })
	).toBeVisible();
	await page.getByLabel('Equipment type', { exact: true }).selectOption('');
	await page
		.getByRole('button', { name: new RegExp(`^Select ${equipmentById.insight.name}`) })
		.click();
	await expect(page.locator('#selected-record-heading')).toHaveText(
		equipmentById.insight.shortName
	);
	await expect(page.locator('#selected-record-details')).toContainText(
		equipmentById.insight.location.name
	);
	await page.screenshot({ path: `test-results/atlas-${testInfo.project.name}.png` });
	expect(errors).toEqual([]);
});

test('atlas preserves unplotted deep-space information and equipment deep links', async ({
	page
}) => {
	await page.goto('/atlas/?destination=Deep%20Space');
	await expect(page.locator('#beyond-surface')).toContainText('Kepler');
	await expect(page.locator('#beyond-surface')).toContainText('Pioneer');
	await expect(page.locator('#beyond-surface')).toContainText('Not plotted');
	await page.goto('/atlas/?destination=Moon&equipment=apollo-11-reflector');
	await expect(page.locator('#selected-record-heading')).toHaveText(
		equipmentById['apollo-11-reflector'].shortName
	);
});

test('timeline uses dated events, query links, event kinds, and recoverable empty states', async ({
	page
}) => {
	await page.goto('/timeline/?equipment=opportunity');
	await expect(page.getByLabel('Equipment', { exact: true })).toHaveValue('opportunity');
	await expect(page.locator('.timeline-list > li')).toHaveCount(
		equipmentById.opportunity.timeline.length
	);
	await page.getByRole('button', { name: 'Launch', exact: true }).click();
	await expect(page.locator('.timeline-list > li')).toHaveCount(1);
	await expect(page.locator('.timeline-list')).toContainText('Jul 8, 2003');
	await page.getByLabel('Destination', { exact: true }).selectOption('Moon');
	await expect(page.getByRole('heading', { name: 'No milestones in this view.' })).toBeVisible();
	await page.getByRole('button', { name: 'Show all events' }).click();
	await expect(page.locator('.timeline-list > li')).toHaveCount(
		equipment.reduce((sum, item) => sum + item.timeline.length, 0)
	);
	await page.locator('.timeline-list > li').nth(1).locator('summary').click();
	await expect(page.locator('.timeline-list > li').nth(1).locator('details')).toHaveAttribute(
		'open',
		''
	);
	await expect(
		page.locator('.timeline-list > li').nth(1).locator('.event-sources a').first()
	).toBeVisible();
	await page.reload();
	await expect(page.getByLabel('Equipment', { exact: true })).toHaveValue('');
});

test('quiz shows real feedback, completes five questions, and fully restarts', async ({ page }) => {
	await page.goto('/learn/');
	await expect(page.getByRole('button', { name: 'Check answer', exact: true })).toBeDisabled();
	await expect(page.locator('.answer-feedback')).toHaveCount(0);
	await page.getByRole('radio', { name: learningQuestions[0].choices[0], exact: true }).check();
	await page.getByRole('button', { name: 'Check answer', exact: true }).click();
	await expect(page.locator('.answer-feedback h4')).toContainText('Incorrect');
	await expect(page.locator('.answer-feedback')).toContainText('passive optical instrument');
	await page.getByRole('button', { name: 'Restart quiz', exact: true }).click();
	for (const [index, question] of learningQuestions.entries()) {
		await expect(page.locator('#quiz-question')).toHaveText(question.prompt);
		await page
			.getByRole('radio', { name: question.choices[question.correctIndex], exact: true })
			.check();
		await page.getByRole('button', { name: 'Check answer', exact: true }).click();
		await expect(page.locator('.answer-feedback h4')).toHaveText('Correct');
		await expect(page.locator('.answer-feedback .source-ref').first()).toBeVisible();
		await page
			.getByRole('button', {
				name: index === learningQuestions.length - 1 ? 'See my score' : 'Next question',
				exact: true
			})
			.click();
	}
	await expect(page.getByRole('heading', { name: 'Your quiz results' })).toBeVisible();
	await expect(page.locator('.score strong')).toHaveText('5');
	await page.getByRole('button', { name: 'Restart quiz', exact: true }).click();
	await expect(page.getByRole('button', { name: 'Check answer', exact: true })).toBeDisabled();
	await expect(page.locator('.quiz-progress')).toContainText('0 of 5 answered');
});

test('comparison offers distinct objects and reflects the selected evidence', async ({ page }) => {
	await page.goto('/learn/#compare');
	await page.getByLabel('First object', { exact: true }).selectOption('kepler');
	await page.getByLabel('Second object', { exact: true }).selectOption('opportunity');
	await expect(page.locator('#compare-first option[value="opportunity"]')).toHaveCount(0);
	await expect(page.locator('#compare-second option[value="kepler"]')).toHaveCount(0);
	await expect(
		page.getByRole('region', { name: 'Equipment comparison', exact: true })
	).toContainText('Kepler');
	await expect(
		page.getByRole('region', { name: 'Equipment comparison', exact: true })
	).toContainText('Opportunity');
	await expect(
		page.getByRole('region', { name: 'Equipment comparison', exact: true })
	).toContainText('Not applicable');
});
