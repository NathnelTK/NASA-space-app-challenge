import { test as base, expect } from '@playwright/test';

export const test = base.extend<{ runtimeErrors: string[] }>({
	runtimeErrors: [
		async ({ page }, use) => {
			const errors: string[] = [];
			page.on('pageerror', (error) => errors.push(error.message));
			page.on('console', (message) => {
				const text = message.text();
				const expectedFailure =
					text.startsWith('Failed to load resource') &&
					/\/media\/lunar-hero\.jpg|\/equipment\/(not-a-real-object|constructor|__proto__)\//.test(
						message.location().url
					);
				if (
					!expectedFailure &&
					(message.type() === 'error' ||
						/hydration_(mismatch|attribute_changed|html_changed)/i.test(text))
				)
					errors.push(text);
			});
			await use(errors);
			expect(errors, 'No runtime errors or Svelte hydration diagnostics').toEqual([]);
		},
		{ auto: true }
	]
});

export { expect };
