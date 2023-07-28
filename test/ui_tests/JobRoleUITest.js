const webdriver = require('selenium-webdriver');
const chai = require('chai');  

describe('JobRolesUITest', async () => {

  it('should check if elements on the JobRoles page are present', async () => {

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
      await driver.findElement(webdriver.By.id('specification')).getText().then(function(value) {
        chai.assert.equal(value, 'Specification')
      });
      await driver.findElement(webdriver.By.id('capability')).getText().then(function(value) {
        chai.assert.equal(value, 'Capability')
      });
      await driver.findElement(webdriver.By.id('bandlevel')).getText().then(function(value) {
        chai.assert.equal(value, 'Band Level')
      });
      
    await driver.quit();
  });
});