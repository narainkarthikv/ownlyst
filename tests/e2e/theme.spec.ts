import { expect, test } from '@playwright/test';

test.describe('Theme toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /start taking notes/i }).click();
    await expect(page).toHaveURL(/\/app$/);
  });

  test('cycles theme preference and persists to localStorage', async ({ page }) => {
    const PREF_KEY = 'sticky-user-preferences';

    // Read current preference
    const before = await page.evaluate((k) => {
      try {
        return JSON.parse(window.localStorage.getItem(k) || '{}').themePreference || 'system';
      } catch {
        return 'system';
      }
    }, PREF_KEY);

    // Click the theme toggle button (aria-label starts with 'Theme preference')
    await page.locator('button[aria-label^="Theme preference"]').click();

    // Read updated preference from localStorage
    const after = await page.evaluate((k) => {
      try {
        return JSON.parse(window.localStorage.getItem(k) || '{}').themePreference;
      } catch {
        return null;
      }
    }, PREF_KEY);

    const order = ['system', 'light', 'dark'];
    const expected = order[(order.indexOf(before) + 1) % order.length];
    expect(after).toBe(expected);
  });
});
