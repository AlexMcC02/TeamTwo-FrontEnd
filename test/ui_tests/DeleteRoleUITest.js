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

      await driver.findElement(webdriver.By.id('bandLevel')).getText().then(function(value) {
        chai.assert.equal(value, 'Band Level')
      });
      //click delete
      await driver.findElement(webdriver.By.xpath('//tbody/tr[26]/td[5]/button[1]')).click()
      //click ok on popup                          
      driver.switchTo().alert().accept();

      

  await driver.quit();
})
});