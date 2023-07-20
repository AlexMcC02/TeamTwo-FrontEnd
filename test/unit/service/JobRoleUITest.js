const { Builder, By, Key, until } = require('selenium-webdriver');


async function JobRolesUITest() {

  const driver = await new Builder().forBrowser('chrome').build();

  try {

    await driver.get('http://localhost:3000/job_roles');

    const textElement = await driver.findElement(By.xpath("//h1[normalize-space()='View Job Roles']"));

    const actualText = await textElement.getText();

    const expectedText = 'View Job Roles';

    if (actualText === expectedText) {
      console.log('\u001B[32m✔ Job Role UI Test Successful, "View Job Roles" found\u001B[0m');
    } else {
      console.log('\u001B[31mTest Failed. Expected:', expectedText, 'Actual:', actualText, '\u001B[0m');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {

    await driver.quit();
  }
}

JobRolesUITest();
