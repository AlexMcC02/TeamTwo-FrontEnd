const webdriver = require('selenium-webdriver');
const chai = require('chai');  



describe('JobRolesUITest', async () => {

  it('should check if elements on the viewJobSpecification page are present', async () => {

    var driver = new webdriver.Builder().
      withCapabilities(webdriver.Capabilities.chrome()).
      build();

      await driver.get(process.env.UI_TEST_URL);
      
      await driver.findElement(webdriver.By.id('specificationHeader')).getText().then(function(value) {
        chai.assert.equal(value, 'Specification')
      });
      // await driver.findElement(webdriver.By.id('name')).getText().then(function(value) {
      //   chai.assert.equal(value, 'Name')
      // });
      // await driver.findElement(webdriver.By.id('specification')).getText().then(function(value) {
      //   chai.assert.equal(value, 'Specification')
      // });
  await driver.quit();
});
});