import { test, expect } from '@playwright/test';

//playwright hook which will run before each test
test.beforeEach(async ({ page }) =>
{
   //runs before each test
    await page.goto('/'); 
});