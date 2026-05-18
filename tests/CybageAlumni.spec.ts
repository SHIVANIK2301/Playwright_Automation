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
    //verifying page scroll till footer(scroll down)
    const footer=await page.locator('div.footer-section');
    await page.getByRole('navigation', { name: 'Footer' }).scrollIntoViewIfNeeded();
    await footer.highlight();
    await page.waitForTimeout(3000);
    //verifying page scroll back to header(scroll up)
    const header = page.getByRole('navigation', { name: 'Main Menu' });
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    await header.highlight();
    await page.waitForTimeout(3000);
});
test('CAN After Login', async({page})=>{
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
  await Typepassword(page,'Shivani@123');
  await expect(EmailId).toHaveValue('shivanik5510@gmail.com');
  await page.screenshot({ path: 'Screenshots/03-full-login.png', fullPage: true });
  await page.locator('input[value="SIGN IN"]').click();
  const user = page.locator('h4.name-on-profile');
  //verifying user email id & name of signed in user profile page
  const email=page.locator('span.email-on-profile').first();
  await expect(user).toBeVisible({ timeout: 10000 });
  await expect(user).toHaveText('Shivani kulthe');
  await expect(email).toBeVisible();
  await expect(email).toHaveText('shivanik5510@gmail.com');
  const usertext=await user.textContent();
  const emailid=await email.textContent();
  console.log(`Successfully Signed In to: \n ${usertext} account with Email Id:${emailid}`);
  await page.screenshot({ path: 'Screenshots/04-before-upload.png' });
  //editing profile image
  await page.waitForSelector('img.edit-profile');
  const edit = page.locator('img.edit-profile').first();
  await expect(edit).toBeVisible();
  await edit.click();
<<<<<<< HEAD
  const upload=page.locator('input[name="files[field_profile_image]"]');
  const img=upload;
  await img.setInputFiles('tests/UploadFiles/LoveWork.jpg');
  await page.waitForTimeout(2000);
  const save=page.getByLabel('Change Your Profile Picture').getByRole('button', { name: 'Save' });
  await save.click();
  await page.screenshot({ path: 'Screenshots/05-after-upload.png' });
  await page.waitForSelector('img[src*="profile"]');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'Screenshots/06-updated-profile-image.png' });
  //verifying user logo on header
  await page.locator('img.header-profile-icon').click();
  await page.waitForTimeout(2000);
  await page.locator('img.hide-profile-rightbar').click();
  //verifying user profile's 1st page Title by combining multiple xpath using pipe |
  await expect(page.locator('//h2[text()="Personal"] | //h2[text()="details"]')).toHaveText(['Personal', 'details']);
  //printing the user profile's page 1 title
  const title1=await page.locator('//h2[text()="Personal"]');
  const title2=await page.locator('//h2[text()="details"]');
  const full_title=await title1.innerText()+'  '+await title2.innerText();
  console.log(`User Profile's 1st page title is:\n ${full_title}`);


  //filling the user profile data
  const Current_Company=await page.locator('input[name="field_current_company"]');
  const Current_Location=await page.locator('input[name="field_current_location"]');
  const Current_Designation=await page.locator('input[name="field_current_designation"]');
  Current_Company.fill("CYABGE SOFTWARE PVT LTD");
  await page.waitForTimeout(1000);
  Current_Location.fill("PUNE");
  await page.waitForTimeout(1000);
  Current_Designation.fill("QA ENGINEER");
  await page.waitForTimeout(1000);
  //selectDOB function call
  await selectDOB(page,'1998-01-23');
  await page.waitForTimeout(1000);
  //selectGender function call
  await selectGender(page,"Female");
  await page.waitForTimeout(1000);
  //selectMaritalStatus function call
  await selectMaritalStatus(page,'Single');
  await page.waitForTimeout(1000);
  //uploading resume
  const uploadresume=await page.locator('input[name="files[field_upload_latest_resume]"]');
  await uploadresume.setInputFiles('tests/UploadFiles/dummypdf.pdf');
  await page.waitForTimeout(1000);
 //selection of previous cybage location
  const element = page.locator('#edit-field-cybage-location');
  await page.screenshot({ path: 'Screenshots/07-user-profileform page1.1-image.png' });
  await element.scrollIntoViewIfNeeded();
  await Cybloc(page,'32');
  await page.waitForTimeout(2000);
  //selection of department
  await Cybdpt(page,13);
  await page.waitForTimeout(2000);
  const li=await page.locator('input[name="field_linkedin_profile"]');
  const twitter=await page.locator('input[name="field_twitter_profile"]');
  const facebook=await page.locator('input[name="field_facebook_profile"]');
  //enetring li profile details
  li.fill('Not Available');
  await page.waitForTimeout(1000);
  //enetring twitter profile details
  twitter.fill('Not Available');
  await page.waitForTimeout(1000);
  //etnering facebook profile details
  facebook.fill('Not Available');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'Screenshots/07-user-profileform page1.2-image.png' });
  await page.locator('input#edit-submit').click();









   
=======
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
  
>>>>>>> 9b702e43fe1045b0bb179d80627d8642465f6313
});
//function to enter password
async function Typepassword(page:any ,passwordfill:string)
{
  //dynamically passing password 
  const password=await page.getByLabel('Password');
  await password.fill(`${passwordfill}`);
  await expect(password).toHaveValue(passwordfill);
}
//function to select DOB
async function selectDOB(page: any, dob: string)
{
  const bd=await page.locator('input#edit-field-date-of-birth');
  await bd.fill(dob);
}

//function to select gender
async function selectGender(page:any , option:string)
{
  //dynamic creation of loactor of selected option
  const gender=await page.locator(`//label[text()="${option}"]`);
  await gender.check();
}
//function to select marital status
async function selectMaritalStatus(page:any,option:string)
{
  //dynamic selection of marital status using label
  const maritalstatus=await page.locator('[name=field_marital_status]');
  await maritalstatus.selectOption({label:option});

}
//function to select previous cybage location 
async function Cybloc(page:any,option:string)
{
 //dynamic selection of location using value
 const location=await page.locator('#edit-field-cybage-location');
 await location.selectOption({value:option});
}
//function to select department 
async function Cybdpt(page:any,index:number)
{
  //dynamic selection of department using index
  const dpt=await page.locator('select[name="field_depatment"]');
  await dpt.selectOption({index:index});
}