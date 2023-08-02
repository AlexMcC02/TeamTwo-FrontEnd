const webdriver = require('selenium-webdriver');
const chai = require('chai');  

describe('JobRoleUITest', async () => {

  it('should check if A JobRole can be edited', async () => {

    var driver = new webdriver.Builder().
      withCapabilities(webdriver.Capabilities.chrome()).
      build();

      await driver.get(process.env.UI_TEST_URL);

      await driver.findElement(webdriver.By.id('header')).getText().then(function(value) {
        chai.assert.equal(value, 'Edit Job Role')
      });
      await driver.findElement(webdriver.By.id('nameLabel')).getText().then(function(value) {
        chai.assert.equal(value, 'Job Role Name:')
      });
      await driver.findElement(webdriver.By.id('specLabel')).getText().then(function(value) {
        chai.assert.equal(value, 'Job Role Specification:')
      });
      await driver.findElement(webdriver.By.id('urlLabel')).getText().then(function(value) {
        chai.assert.equal(value, 'Sharepoint URL')
      });
      await driver.findElement(webdriver.By.id('bandAndCapabilityLabel')).getText().then(function(value) {
        chai.assert.equal(value, 'Please specify the Capability & Band Level for this role')
      });

      //entry
      await driver.findElement(webdriver.By.id('name')).clear()
      await driver.findElement(webdriver.By.id('name')).sendKeys('Philip Wilson')

      await driver.findElement(webdriver.By.id('specification')).clear()
      await driver.findElement(webdriver.By.id('specification')).sendKeys('Also pulling his hair out')

      await driver.findElement(webdriver.By.id('urlLink')).clear()
      await driver.findElement(webdriver.By.id('urlLink')).sendKeys('https://www.youtube.com/')

      await driver.findElement(webdriver.By.id('capabilitySelect')).sendKeys('Data & Artificial Intelligence')

      await driver.findElement(webdriver.By.id('bandSelect')).sendKeys('Consultant')
      await driver.findElement(webdriver.By.id('updateButton')).click()

  await driver.quit();
})
});
