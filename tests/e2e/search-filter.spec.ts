import { expect, test } from '@playwright/test';

const STORAGE_KEY = 'sticky-notes';

test.use({
  storageState: {
    cookies: [],
    origins: [
      {
        origin: 'http://127.0.0.1:4173',
        localStorage: [
          {
            name: STORAGE_KEY,
            value: JSON.stringify([
              {
                id: 'note-alpha',
                title: 'Alpha Note',
                content: 'Alpha content',
                priority: 'low',
                status: 'todo',
                isPinned: false,
                createdAt: '2026-01-01T00:00:00.000Z',
                tags: ['alpha'],
              },
              {
                id: 'note-beta',
                title: 'Beta Note',
                content: 'Beta content',
                priority: 'high',
                status: 'in-progress',
                isPinned: true,
                createdAt: '2026-01-02T00:00:00.000Z',
                tags: ['beta'],
              },
              {
                id: 'note-gamma',
                title: 'Gamma Note',
                content: 'Gamma content',
                priority: 'medium',
                status: 'done',
                isPinned: false,
                createdAt: '2026-01-03T00:00:00.000Z',
                tags: ['gamma'],
              },
            ]),
          },
        ],
      },
    ],
  },
});

test.describe('Search and Filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /start taking notes/i }).click();
    await expect(page).toHaveURL(/\/app$/);
  });

  test('search filters by title and filter sidebar works', async ({ page }) => {
    // Search for Alpha
    await page
      .getByPlaceholder(/search notes by title, content, or tags/i)
      .fill('Alpha');

    await expect(page.getByText('Alpha Note')).toBeVisible();
    await expect(page.getByText('Beta Note')).toHaveCount(0);
    await expect(page.getByText('Gamma Note')).toHaveCount(0);

    // Clear search
    await page.getByPlaceholder(/search notes by title, content, or tags/i).fill('');

    // Open filters and filter by status: Done
    await page.getByRole('button', { name: /^Filter(?:\s*\d+)?$/i }).click();
    await page.getByRole('button', { name: /^Done$/i }).click();
    // Only Gamma Note (done) should be visible
    await expect(page.getByText('Gamma Note')).toBeVisible();
    await expect(page.getByText('Alpha Note')).toHaveCount(0);
    await expect(page.getByText('Beta Note')).toHaveCount(0);

    // Open filters and toggle Pinned Only
    await page.getByRole('button', { name: /^Filter(?:\s*\d+)?$/i }).click();
    await page.getByRole('button', { name: /Pinned Only/i }).click();
    // Only Beta Note (pinned) should be visible
    await expect(page.getByText('Beta Note')).toBeVisible();
    await expect(page.getByText('Alpha Note')).toHaveCount(0);
    await expect(page.getByText('Gamma Note')).toHaveCount(0);
  });
});
