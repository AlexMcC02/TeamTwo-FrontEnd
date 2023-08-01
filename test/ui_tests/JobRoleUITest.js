const webdriver = require('selenium-webdriver');
const chai = require('chai');  



describe('JobRoleUITest', async () => {

  it('should check if JobRole are elements on the JobRole page are present', async () => {

    var driver = new webdriver.Builder().
      withCapabilities(webdriver.Capabilities.chrome()).
      build();

      await driver.get(process.env.UI_TEST_URL);
      
      await driver.findElement(webdriver.By.id('header')).getText().then(function(value) {
        chai.assert.equal(value, 'View Job Roles')
      });
      await driver.findElement(webdriver.By.id('jobs')).getText().then(function(value) {
        chai.assert.equal(value, 'Jobs')
      });
      await driver.findElement(webdriver.By.id('name')).getText().then(function(value) {
        chai.assert.equal(value, 'Name')
      });
      await driver.findElement(webdriver.By.id('capability')).getText().then(function(value) {
        chai.assert.equal(value, 'Capability')
      });
      await driver.findElement(webdriver.By.id('specificationLink')).getText().then(function(value) {
        chai.assert.equal(value, 'Dr Dre')
      });
      // specification page navigation
      await driver.findElement(webdriver.By.id('specificationLink')).click()

      await driver.findElement(webdriver.By.id('name')).getText().then(function(value) {
        chai.assert.equal(value, 'Name')
      });
      await driver.findElement(webdriver.By.id('specification')).getText().then(function(value) {
        chai.assert.equal(value, 'Specification')
      });
      await driver.findElement(webdriver.By.id('linkTitle')).getText().then(function(value) {
        chai.assert.equal(value, 'Link:')
      });

      await driver.findElement(webdriver.By.id('link')).click()

      await driver.navigate().back();

      await driver.findElement(webdriver.By.id('backToJobRolesButton')).getText().then(function(value) {
        chai.assert.equal(value, 'Back to Job Roles')
      });

      await driver.findElement(webdriver.By.id('backToJobRolesButton')).click()

      
  await driver.quit();
})
});