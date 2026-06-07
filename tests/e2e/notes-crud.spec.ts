import { expect, test } from '@playwright/test';

test.describe('Notes CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /start taking notes/i }).click();
    await expect(page).toHaveURL(/\/app$/);
  });

  test('create, edit, pin, and delete a note', async ({ page }) => {
    const title = `Playwright CRUD ${Date.now()}`;
    const content = 'Initial content';

    // Create
    await page.getByRole('button', { name: /create a new note/i }).click();
    await expect(
      page.getByRole('dialog', { name: /create new note/i })
    ).toBeVisible();
    await page.getByLabel('Note title').fill(title);
    await page.getByLabel('Note content').fill(content);
    await page.getByRole('button', { name: /^create note$/i }).click();

    // Ensure note appears
    await page.getByPlaceholder(/search notes by title, content, or tags/i).fill(
      title
    );
    await expect(page.getByText(title)).toBeVisible();

    // Edit the note by opening the card (opens edit modal)
    const card = page.locator('.group', { hasText: title }).first();
    await card.click();
    await expect(page.getByRole('dialog', { name: /edit note/i })).toBeVisible();
    const newTitle = `${title} (edited)`;
    await page.getByLabel('Note title').fill(newTitle);
    await page.getByRole('button', { name: /update note/i }).click();

    // Confirm edited note is visible
    await page
      .getByPlaceholder(/search notes by title, content, or tags/i)
      .fill(newTitle);
    await expect(page.getByText(newTitle)).toBeVisible();

    // Pin the note (hover to reveal actions)
    await card.hover();
    const pinBtn = card.locator('button[aria-label="Pin note"]');
    await pinBtn.click();
    // After pinning the aria-label should change to 'Unpin note'
    await expect(card.locator('button[aria-label="Unpin note"]')).toBeVisible();

    // Delete the note via its card action
    await card.locator('button[aria-label="Delete note"]').click();

    // Confirm deletion (no matching card)
    await page
      .getByPlaceholder(/search notes by title, content, or tags/i)
      .fill(newTitle);
    await expect(page.getByText(newTitle)).toHaveCount(0);
  });
});
