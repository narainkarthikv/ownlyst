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
                id: 'seed-note-1',
                title: 'Seed note',
                content: 'Baseline note for deterministic e2e runs',
                priority: 'medium',
                status: 'todo',
                isPinned: false,
                createdAt: '2026-01-01T00:00:00.000Z',
                tags: ['seed'],
              },
            ]),
          },
        ],
      },
    ],
  },
});

test.describe('notes e2e', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /start taking notes/i }).click();
    await expect(page).toHaveURL(/\/app$/);
  });

  test('creates a note and persists it after reload', async ({ page }) => {
    const title = `Playwright persisted note ${Date.now()}`;
    const content = 'Persisted by Playwright and verified after reload';

    await page.getByRole('button', { name: /create a new note/i }).click();
    await expect(
      page.getByRole('dialog', { name: /create new note/i })
    ).toBeVisible();

    await page.getByLabel('Note title').fill(title);
    await page.getByLabel('Note content').fill(content);
    await page.getByRole('button', { name: /^create note$/i }).click();

    await page.getByPlaceholder(/search notes by title, content, or tags/i).fill(title);
    await expect(page.getByText(title)).toBeVisible();

    await expect
      .poll(
        async () =>
          page.evaluate(
            ({ storageKey, noteTitle }) => {
              const rawNotes = window.localStorage.getItem(storageKey);
              if (!rawNotes) return false;

              return JSON.parse(rawNotes).some(
                (note: { title?: string; content?: string }) =>
                  note.title === noteTitle &&
                  note.content ===
                    'Persisted by Playwright and verified after reload'
              );
            },
            { storageKey: STORAGE_KEY, noteTitle: title }
          ),
        { message: 'new note should be written to localStorage before reload' }
      )
      .toBe(true);

    await page.reload();
    await page.getByPlaceholder(/search notes by title, content, or tags/i).fill(title);
    await expect(page.getByText(title)).toBeVisible();
    await expect(page.getByText(content)).toBeVisible();
  });
});
