const { Builder, By, Key, until } = require('selenium-webdriver');


async function runTest() {

  const driver = await new Builder().forBrowser('chrome').build();

  try {

    await driver.get('http://localhost:3000/job_roles');

    const textElement = await driver.findElement(By.xpath("//h1[normalize-space()='View Job Roles']"));

    const actualText = await textElement.getText();

    const expectedText = 'View Job Roles';

    if (actualText === expectedText) {
      console.log('Job Role UI Test Successful,  "View Job Roles" found');
    } else {
      console.log('Test Failed. Expected:', expectedText, 'Actual:', actualText);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {

    await driver.quit();
  }
}

runTest();
