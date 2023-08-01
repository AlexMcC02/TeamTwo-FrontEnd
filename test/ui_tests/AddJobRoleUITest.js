const webdriver = require('selenium-webdriver');
const chai = require('chai');  

describe('JobRoleUITest', async () => {

  it('should check if a role can be added and if it exists in the database', async () => {

    var driver = new webdriver.Builder().
      withCapabilities(webdriver.Capabilities.chrome()).
      build();

      await driver.get(process.env.UI_TEST_URL);
    //page assertion
      await driver.findElement(webdriver.By.id('header')).getText().then(function(value) {
        chai.assert.equal(value, 'Add Job Role')
      });
      await driver.findElement(webdriver.By.id('nameLabel')).getText().then(function(value) {
        chai.assert.equal(value, 'Name')
      });
      await driver.findElement(webdriver.By.id('specLabel')).getText().then(function(value) {
        chai.assert.equal(value, 'Specification')
      });
      await driver.findElement(webdriver.By.id('urlLabel')).getText().then(function(value) {
        chai.assert.equal(value, 'Sharepoint URL')
      });
      await driver.findElement(webdriver.By.id('message')).getText().then(function(value) {
        chai.assert.equal(value, 'Please specify the Capability & Band Level for this role')
      });
      // data entry
     roleName = "SYSTEM ADMIN";
     spec = "Administrate the system...";
      await driver.findElement(webdriver.By.id('name')).sendKeys(roleName)
      await driver.findElement(webdriver.By.id('specification')).sendKeys(spec)
      await driver.findElement(webdriver.By.id('urlLink')).sendKeys("https://www.bbc.co.uk/")
      // dropdown lists
      await driver.findElement(webdriver.By.id('capabilitySelect')).sendKeys("Engineering")
      await driver.findElement(webdriver.By.id('bandSelect')).sendKeys("Manager")

      //submit
      await driver.findElement(webdriver.By.id('submitButton')).click();

      //validate entry
      await driver.findElement(webdriver.By.xpath("/html[1]/body[1]/main[1]/section[1]/table[1]/tbody[1]/tr[25]/td[1]")).getText().then(function(value) {
        chai.assert.equal(value, roleName)
      });
      await driver.findElement(webdriver.By.xpath("/html[1]/body[1]/main[1]/section[1]/table[1]/tbody[1]/tr[25]/td[2]")).getText().then(function(value) {
        chai.assert.equal(value, spec)
      });

       await driver.quit();

  });
  });