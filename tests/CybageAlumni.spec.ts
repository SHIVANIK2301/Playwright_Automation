import { test, expect } from '@playwright/test';
import path from 'node:path';

//playwright hook which will run before each test
test.beforeEach(async ({ page }) =>
{
    await page.goto('/'); 
});
test('CAN Home Page Banner', async ({ page }) =>
{
    //Verifying the Banner Text of home page
    const banner=await page.locator('div.welcome-txt');
    const bannertext=await banner.textContent();
    await expect(banner).toBeVisible({ timeout: 20000 });
    await expect(banner).toHaveText('WELCOME TO CYBAGE ALUMNI NETWORK.');
    console.log(`Banner Text:'${bannertext}'has been verified`);
    const wholebanner = await page.locator('div.overlay');
    await expect(wholebanner).toBeVisible();
    await wholebanner.screenshot({ path: 'Screenshots/01-wholebanner.png' });
    const footer=await page.locator('div.footer-section');
    await page.getByRole('navigation', { name: 'Footer' }).scrollIntoViewIfNeeded();
    await footer.highlight();
    await page.waitForTimeout(3000);
    const header = page.getByRole('navigation', { name: 'Main Menu' });
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    await header.highlight();
    await page.waitForTimeout(3000);
});
test('CAN Login Functionality', async({page})=>{
  const header=await page.locator('nav.block-menu.navigation.menu--main-menu');
  await header.screenshot({ path: 'Screenshots/02-header-with-login.png' });
  //verifying login button on homepage
  const login = page.getByRole('link', { name: 'Log in' });
  await expect(login).toBeVisible();
  const buttonText = await login.textContent();
  console.log(`Button name: ${buttonText} button is present on page`);
  await login.click();
  //verifying login functionality with valid email id & password
  const EmailId=await page.getByRole('textbox', { name: 'Email Id' });
  await EmailId.fill('shivanik5510@gmail.com');
  const Password=await page.getByLabel('Password');
  await Password.fill('Shivani@123');
  await expect(EmailId).toHaveValue('shivanik5510@gmail.com');
  await expect(Password).toHaveValue('Shivani@123');
  await page.screenshot({ path: 'Screenshots/03-full-login.png', fullPage: true });
  await page.locator('input[value="SIGN IN"]').click();
  const user = page.locator('h4.name-on-profile');
  const email=page.locator('span.email-on-profile').first();
  await expect(user).toBeVisible({ timeout: 10000 });
  await expect(user).toHaveText('Shivani kulthe');
  await expect(email).toBeVisible();
  await expect(email).toHaveText('shivanik5510@gmail.com');
  const usertext=await user.textContent();
  const emailid=await email.textContent();
  console.log(`Successfully Signed In to: \n ${usertext} account with Email Id:${emailid}`);
  await page.screenshot({ path: 'Screenshots/04-before-upload.png' });
  await page.waitForSelector('img.edit-profile');
  const edit = page.locator('img.edit-profile').first();
  await expect(edit).toBeVisible();
  await edit.click();
  const upload=page.locator('input.js-form-file.form-file');
  //await upload.click();
  const img=upload
  await img.setInputFiles('tests/UploadFiles/LoveWork.jpg');
  await page.waitForTimeout(2000);
  await expect(page.getByText('LoveWork.jpg')).toBeVisible({ timeout: 5000 });
  const save=page.getByLabel('Change Your Profile Picture').getByRole('button', { name: 'Save' });
  await save.click();
  await page.screenshot({ path: 'Screenshots/05-after-upload.png' });
  await page.waitForTimeout(5000);
  
});
