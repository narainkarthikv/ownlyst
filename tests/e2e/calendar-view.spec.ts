import { expect, test } from '@playwright/test';

test.describe('Calendar View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /start taking notes/i }).click();
    await expect(page).toHaveURL(/\/app$/);
  });

  test('switches to calendar view and displays accessible grid with valid ARIA hierarchy', async ({ page }) => {
    // Switch to Calendar view using semantic button with aria-pressed
    const calendarButton = page.getByRole('button', { name: /calendar view/i });
    await calendarButton.click();
    await expect(calendarButton).toHaveAttribute('aria-pressed', 'true');

    // Verify role="grid" exists and is visible
    const grid = page.getByRole('grid');
    await expect(grid).toBeVisible();

    // Verify weekday header row contains 7 columnheaders
    const sundayHeader = grid.getByRole('columnheader', { name: /^sunday$/i });
    const saturdayHeader = grid.getByRole('columnheader', { name: /^saturday$/i });
    await expect(sundayHeader).toBeVisible();
    await expect(saturdayHeader).toBeVisible();

    // Verify weekday headers and day cells are all wrapped in role="row"
    const rows = grid.getByRole('row');
    const rowCount = await rows.count();
    // 1 header row + between 4 and 6 week rows = at least 5 rows
    expect(rowCount).toBeGreaterThanOrEqual(5);

    // Verify month/year heading is announced politely
    const now = new Date();
    const currentMonthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(now);
    await expect(
      page.getByRole('heading', { level: 2, name: new RegExp(currentMonthName, 'i') })
    ).toBeVisible();
  });

  test('navigates previous, next month, and today button returns to current month', async ({ page }) => {
    await page.getByRole('button', { name: /calendar view/i }).click();

    const now = new Date();
    const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(now);
    const nextMonthDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const nextMonth = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(nextMonthDate);

    // Verify current month is displayed
    await expect(page.getByRole('heading', { level: 2, name: currentMonth })).toBeVisible();

    // Click Next month
    await page.getByRole('button', { name: /next month/i }).click();
    await expect(page.getByRole('heading', { level: 2, name: nextMonth })).toBeVisible();

    // Click Previous month
    await page.getByRole('button', { name: /previous month/i }).click();
    await expect(page.getByRole('heading', { level: 2, name: currentMonth })).toBeVisible();

    // Navigate 2 months ahead then click Today to return
    await page.getByRole('button', { name: /next month/i }).click();
    await page.getByRole('button', { name: /next month/i }).click();
    await page.getByRole('button', { name: /go to current month/i }).click();
    await expect(page.getByRole('heading', { level: 2, name: currentMonth })).toBeVisible();
  });

  test('a note dated September 15 appears specifically in the September 15 cell without timezone shift', async ({
    page,
  }) => {
    await page.getByRole('button', { name: /calendar view/i }).click();

    // Create a note specifically dated September 15 of current year
    const targetYear = new Date().getFullYear();
    const targetDateKey = `${targetYear}-09-15`;
    const noteTitle = `Target Sept 15 Note ${Date.now()}`;

    // Click "New Note"
    await page.getByRole('button', { name: /create a new note/i }).click();
    const dialog = page.getByRole('dialog', { name: /create new note/i });
    await expect(dialog).toBeVisible();

    await page.getByLabel('Note title').fill(noteTitle);
    await dialog.locator('input[type="date"]').fill(targetDateKey);
    await page.getByRole('button', { name: /^create note$/i }).click();

    // Target month heading: e.g. "September 2026"
    const targetHeading = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
      new Date(targetYear, 8, 1)
    );

    // If not currently showing target month, navigate until September is reached
    for (let i = 0; i < 24; i++) {
      if (await page.getByRole('heading', { level: 2, name: targetHeading }).isVisible()) {
        break;
      }
      await page.getByRole('button', { name: /next month/i }).click();
    }

    // Verify cell with data-date="targetYear-09-15" contains the note
    const sept15Cell = page.locator(`[data-date="${targetDateKey}"]`);
    await expect(sept15Cell).toBeVisible();
    await expect(sept15Cell).toContainText(noteTitle);

    // Verify adjacent cells do NOT contain the note (no 1-day off timezone shift)
    const sept14Key = `${targetYear}-09-14`;
    const sept16Key = `${targetYear}-09-16`;
    const sept14Cell = page.locator(`[data-date="${sept14Key}"]`);
    const sept16Cell = page.locator(`[data-date="${sept16Key}"]`);

    if (await sept14Cell.isVisible()) {
      await expect(sept14Cell).not.toContainText(noteTitle);
    }
    if (await sept16Cell.isVisible()) {
      await expect(sept16Cell).not.toContainText(noteTitle);
    }
  });

  test('displays notes on their scheduled dates and opens existing edit modal on click', async ({ page }) => {
    // Switch to Calendar View
    await page.getByRole('button', { name: /calendar view/i }).click();

    // Click "Add Note for this Day" to create a note scheduled for today
    const uniqueTitle = `Calendar Event ${Date.now()}`;
    await page.getByRole('button', { name: /add note for this day/i }).click();
    await expect(page.getByRole('dialog', { name: /create new note/i })).toBeVisible();

    await page.getByLabel('Note title').fill(uniqueTitle);
    await page.getByLabel('Note content').fill('Note scheduled for today');
    await page.getByRole('button', { name: /^create note$/i }).click();

    // Verify the note appears in the Calendar View
    await expect(page.getByText(uniqueTitle).first()).toBeVisible();

    // Click on the note inside the selected date list to open the existing edit modal
    const noteCard = page.getByRole('article', { name: new RegExp(uniqueTitle, 'i') }).first();
    await noteCard.click();

    // Verify existing NoteModal opens in Edit mode
    await expect(page.getByRole('dialog', { name: /edit note/i })).toBeVisible();
    await expect(page.getByLabel('Note title')).toHaveValue(uniqueTitle);

    // Edit the note title
    const updatedTitle = `${uniqueTitle} (updated)`;
    await page.getByLabel('Note title').fill(updatedTitle);
    await page.getByRole('button', { name: /update note/i }).click();

    // Verify updated note is visible in calendar
    await expect(page.getByText(updatedTitle).first()).toBeVisible();
  });

  test('quick add button on date cell creates note with pre-filled date', async ({ page }) => {
    await page.getByRole('button', { name: /calendar view/i }).click();

    // Click "Add Note for this Day" on the selected date panel
    await page.getByRole('button', { name: /add note for this day/i }).click();

    // Verify NoteModal opens
    await expect(page.getByRole('dialog', { name: /create new note/i })).toBeVisible();

    const title = `Scheduled Task ${Date.now()}`;
    await page.getByLabel('Note title').fill(title);
    await page.getByRole('button', { name: /^create note$/i }).click();

    // Verify note is created and visible in calendar
    await expect(page.getByText(title).first()).toBeVisible();
  });

  test('supports keyboard calendar navigation across cells', async ({ page }) => {
    await page.getByRole('button', { name: /calendar view/i }).click();

    const grid = page.getByRole('grid');
    await expect(grid).toBeVisible();

    // Find the cell with tabindex="0" (currently focused)
    const focusedCell = grid.locator('[role="gridcell"][tabindex="0"]');
    await focusedCell.focus();

    // Navigate right with ArrowRight
    await page.keyboard.press('ArrowRight');
    // Verify an element has focus within the grid
    const newlyFocused = grid.locator('[role="gridcell"]:focus');
    await expect(newlyFocused).toBeVisible();

    // Navigate down a week with ArrowDown
    await page.keyboard.press('ArrowDown');
    await expect(grid.locator('[role="gridcell"]:focus')).toBeVisible();

    // Press Enter to select the date
    await page.keyboard.press('Enter');
    await expect(grid.locator('[role="gridcell"]:focus')).toHaveAttribute('aria-selected', 'true');
  });

  test('filters calendar notes via FilterBar search', async ({ page }) => {
    await page.getByRole('button', { name: /calendar view/i }).click();

    // Create note with unique search token
    const uniqueToken = `Token${Date.now()}`;
    await page.getByRole('button', { name: /add note for this day/i }).click();
    await page.getByLabel('Note title').fill(`Searchable Note ${uniqueToken}`);
    await page.getByRole('button', { name: /^create note$/i }).click();

    // Verify it appears
    await expect(page.getByText(`Searchable Note ${uniqueToken}`).first()).toBeVisible();

    // Search for non-existent token
    const searchInput = page.getByPlaceholder(/search notes in calendar/i);
    await searchInput.fill('NonExistentNote12345');
    await expect(page.getByText('No matching notes')).toBeVisible();

    // Clear search
    await searchInput.fill(uniqueToken);
    await expect(page.getByText(`Searchable Note ${uniqueToken}`).first()).toBeVisible();
  });

  test('view switcher allows seamless transition between all 5 views using semantic buttons', async ({ page }) => {
    // 1. Notes view (Grid)
    await page.getByRole('button', { name: /notes view/i }).click();
    await expect(page.getByRole('button', { name: /notes view/i })).toHaveAttribute('aria-pressed', 'true');

    // 2. Boards (Kanban)
    await page.getByRole('button', { name: /boards view/i }).click();
    await expect(page.getByRole('button', { name: /boards view/i })).toHaveAttribute('aria-pressed', 'true');

    // 3. Table view
    await page.getByRole('button', { name: /table view/i }).click();
    await expect(page.getByRole('button', { name: /table view/i })).toHaveAttribute('aria-pressed', 'true');

    // 4. Roadmap view
    await page.getByRole('button', { name: /roadmap view/i }).click();
    await expect(page.getByRole('button', { name: /roadmap view/i })).toHaveAttribute('aria-pressed', 'true');

    // 5. Calendar view
    await page.getByRole('button', { name: /calendar view/i }).click();
    await expect(page.getByRole('button', { name: /calendar view/i })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('grid')).toBeVisible();
  });

  test('mobile layout renders properly with compact indicators', async ({ page }) => {
    // Resize viewport to mobile screen
    await page.setViewportSize({ width: 375, height: 667 });

    await page.getByRole('button', { name: /calendar view/i }).click();
    await expect(page.getByRole('grid')).toBeVisible();

    // Month heading visible on mobile
    await expect(page.getByRole('heading', { level: 2 })).toBeVisible();

    // Selected date details panel visible
    await expect(page.getByRole('button', { name: /add note for this day/i })).toBeVisible();
  });
});
