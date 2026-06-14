import { expect, test } from '@playwright/test';

test.describe('Import / Export', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /start taking notes/i }).click();
    await expect(page).toHaveURL(/\/app$/);
  });

  test('exports JSON & CSV and imports JSON backup', async ({ page }) => {
    // Export JSON
    await page.locator('button[title="Data import/export"]').click();
    const [jsonDownload] = await Promise.all([
      page.waitForEvent('download'),
      page.getByText('Backup (JSON)').click(),
    ]);
    expect(jsonDownload.suggestedFilename()).toMatch(/ownlyst-backup-.*\.json/);

    // Export CSV
    await page.locator('button[title="Data import/export"]').click();
    const [csvDownload] = await Promise.all([
      page.waitForEvent('download'),
      page.getByText('Backup (CSV)').click(),
    ]);
    expect(csvDownload.suggestedFilename()).toMatch(/ownlyst-backup-.*\.csv/);

    // Import JSON backup
    // Resolve fixture path in ESM environment
    const filePath = new URL('../fixtures/backup.json', import.meta.url).pathname;
    await page.locator('button[title="Data import/export"]').click();
    const input = page.locator('input[type="file"][accept=".json"]');
    await input.setInputFiles(filePath);

    // After import the imported note should be visible
    await expect(page.getByText('Imported Note')).toBeVisible();
  });
});
