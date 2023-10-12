import { test, expect } from '@playwright/test';
 
const repositorySelector = 'a[href="/microsoft/playwright"]'; // Selector for the repository link
const forksSelector = '#fork-button #repo-network-counter'; // Selector for the forks count
 
test.beforeEach(async ({ page }) => {
  await page.goto('https://github.com');
});
 
test.describe('GitHub Fork Count', () => {
  test('Get Fork Count for a Repository', async ({ page }) => {
    // Click on the search icon to reveal the input field
    await page.click('.flex-1[data-target="qbsearch-input.inputButtonText"]');
 
    // Type the repository name in the revealed input field
    await page.type('input[data-target="query-builder.input"]', 'playwright');
 
    // Press 'Enter' to perform the search
    await page.press('input[data-target="query-builder.input"]', 'Enter');
 
    // Wait for the repository link to appear
    await page.waitForSelector(repositorySelector, { state: 'visible' });
 
    // Click on the specific repository link
    await page.click(repositorySelector);
 
    // Wait for the forks selector to appear
    await page.waitForSelector(forksSelector, { state: 'visible' });
 
    // Get the number of forks
    const forksCount = await page.innerText(forksSelector);
 
    console.log(`Forks for the repository 'playwright': ${forksCount}`);
    expect(parseInt(forksCount)).toBeGreaterThan(0);
  });
});