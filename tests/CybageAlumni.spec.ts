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
    console.log(`Banner Text of Cybage Alumni Network is:\n${bannertext}`);
    const wholebanner = await page.locator('div.overlay');
    await expect(wholebanner).toBeVisible();
    await wholebanner.screenshot({ path: 'Screenshots/01-wholebanner.png' });
    await page.screenshot({path:'Screenshots/02-Homepage without login.png',fullPage:true});
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
  const upload=page.locator('input[name="files[field_profile_image]"]');
  const img=upload;
  await img.setInputFiles('tests/UploadFiles/LoveWork.jpg');
  await page.waitForTimeout(2000);
  const save=page.getByLabel('Change Your Profile Picture').getByRole('button', { name: 'Save' });
  await save.click();
  await page.screenshot({ path: 'Screenshots/05-after-upload.png' });
  await page.waitForSelector('img[src*="profile"]');
  await page.waitForTimeout(3000);
  //verifying user logo on header
  await page.locator('img.header-profile-icon').click();
  await page.waitForTimeout(2000);
  await page.locator('img.hide-profile-rightbar').click();
  //verifying user profile's 1st page Title by combining multiple xpath using pipe "|"
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
  //adding scroll
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
  await page.screenshot({path:'Screenshots/06-user-profileform page1 full page-image.png',fullPage:true});
  await page.locator('input#edit-submit').click();
  //verifying user profile's 2nd page Title by combining multiple xpath using pipe |
  await expect(page.locator('//h2[text()="EXPERIENCE AT"]|//h2[text()="CYBAGE"]')).toHaveText(['EXPERIENCE AT', 'CYBAGE']);
  //printing user profile's page 2 Title
  const ttl1=await page.locator('//h2[text()="EXPERIENCE AT"]').innerText();
  const ttl2=await page.locator('//h2[text()="CYBAGE"]').innerText();
  const ttl=ttl1+' '+ttl2;
  console.log(`User Profile's 2nd page title:\n${ttl}`);
  //yoj function call
  await yoj(page,'2021');
  await page.waitForTimeout(1000);
  //yol function call
  await yol(page,'2023');
  await page.waitForTimeout(2000);
  //Select Rejoining choice function call
  await rejoin(page,"1");
  await page.waitForTimeout(2000);
  //Select experience satisfaction function call
  await expsat(page,"1");
  await page.waitForTimeout(2000);
  //Giving input to textbox
  const text=await page.locator('input#edit-field-comment-for-is-cybage-bett');
  await text.fill("CYBAGE IS THE 1ST COMAPNY I JOINED");
  await page.waitForTimeout(1000);
  //Select cybage fulfillment choice function call
  await cybffl(page,"1");
  await page.waitForTimeout(2000);
  //Giving input to textbox
  const text2=await page.locator('input#edit-field-comment-for-has-cybage-ful');
  await text2.fill("YES,I GOT TO LEARN ABOUT THE INDUSTRIAL WORK & PROCESS");
  await page.waitForTimeout(1000);
  //adding scroll
  const ele=await page.locator('input#edit-field-comment-for-is-your-experi');
  await ele.scrollIntoViewIfNeeded();
  //Select learning at cybage function call
  await realise(page,"1");
  await page.waitForTimeout(2000);
  //Giving input to textbox
  const text3=await page.locator('input#edit-field-comment-for-is-your-experi');
  await text3.fill("I HIGHLY AGREE");
  await page.waitForTimeout(2000);
  //Entering input inside the text area
  const textarea=await page.locator('//textarea[@placeholder="Add Your Text Here.."]');
  textarea.fill("NO SUGGESTIONS AS SUCH.... :)");
  await page.waitForTimeout(1000);
  //page scroll
  const smiley=await page.locator('div.smiley-table');
  smiley.scrollIntoViewIfNeeded();
  await page.waitForTimeout(3000);
  //opinion expressions
  const op1=await page.locator('img#comc_4');
  op1.click();
  await page.waitForTimeout(1000);
  const op2=await page.locator('img#wlb_5');
  op2.click();
  await page.waitForTimeout(1000);
  const op3=await page.locator('img#opg_3');
  op3.click();
  await page.waitForTimeout(1000);
  const op4=await page.locator('img#mal_4');
  op4.click();
  await page.waitForTimeout(1000);
  const op5=await page.locator('img#pb_2');
  op5.click();
  //page scroll
  const save2=await page.locator('input#edit-submit--2');
  save2.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  //taking user profile page2 snapshot
  await page.screenshot({path:'Screenshots/07-user-profileform page2 full page-image.png',fullPage:true});
  await save2.click();
  //verifying the user profile's page3 title
  await expect((page.locator('//h2[text()="CHERISHED"] | //h2[text()="MOMENTS"]'))).toHaveText(['CHERISHED','MOMENTS']);
  //printing user profile's page 3 title
  const heading1=await page.locator('//h2[text()="CHERISHED"]').innerText();
  const heading2=await page.locator('//h2[text()="MOMENTS"]').innerText();
  const heading=heading1+' '+heading2;
  console.log(`Title of user profile's 3rd page is:\n${heading}`);
  await page.waitForTimeout(1000);
  //Select cherished moments function call
  await cherished(page,"1");
  await page.waitForTimeout(1000);
  //scrolling the page for text editor proper visibility
  const texteditor=await page.locator('div#cke_edit-field-share-your-over-all-experi-value');
  await texteditor.scrollIntoViewIfNeeded();
  

  



  
  
  


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
//function to select joining year
async function yoj(page:any,option:string)
{
  //dynamic selection of joining year
  const year=await page.locator('select[name="field_year_of_joining_cybage"]');
  await year.selectOption({label:option});
}
//function to select last year at cybage
async function yol(page:any,option:string)
{
  //dynamic selection of last year at cybage
  const yr=await page.locator('select[name="field_year_you_left_cybage"]');
  await yr.selectOption({value:option});
}
//function to select cybage rejoining 
async function rejoin(page:any,option:string)
{
  //dynamic selection of rejoining interest
  const re=await page.locator('input#edit-intrested-in-cybage-1');
  await re.check();
}
//function to select experience satisfaction
async function expsat(page:any,option:string)
{
  //dynamic seelction of experience satisfaction
  const exp=await page.locator('input#edit-field-is-cybage-better-than-your-1');
  await exp.check();

}
//function to select cybage fulfillment choice
async function cybffl(page:any,option:string)
{
  //dynamic selection of fufillment choice
  const ffl=await page.locator('input#edit-field-has-cybage-fulfilled-your-1');
  await ffl.check();
}
//function to select learning at cybage choice
async function realise(page:any,option:string)
{
  //dynamic selection of cybage learning choice
  const rl=await page.locator('input#edit-field-is-your-experience-learnin-1');
  await rl.check();
}
//function to select cherished moment sharing
async function cherished(page:any,option:string)
{
  //dynamic selection of cherished moment
  const moment=await page.locator('input#edit-field-any-cherished-moments-at-c-1');
  moment.check();
}