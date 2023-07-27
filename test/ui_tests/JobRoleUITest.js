const webdriver = require('selenium-webdriver');
const chai = require('chai');  



describe('JobSpecificationUITest', async () => 

  it('should check if elements on the viewJobSpecification page are present', async () => {

    var driver = new webdriver.Builder().
      withCapabilities(webdriver.Capabilities.chrome()).
      build();

      await driver.get(process.env.UI_TEST_URL);
    //job role navigation & checks
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


      //specification Page Navigation
      await driver.findElement(webdriver.By.linkText('Specification')).click();
    


    // specification page verification
      await driver.findElement(webdriver.By.id('specificationHeader')).getText().then(function(value) {
        chai.assert.equal(value, 'Specification')
      });

      await driver.findElement(webdriver.By.id('name')).getText().then(function(value) {
        chai.assert.equal(value, 'Name')
      });
      
      await driver.findElement(webdriver.By.id('specification')).getText().then(function(value) {
        chai.assert.equal(value, 'Specification')
      });

      await driver.findElement(webdriver.By.id('backToSalesEmployeeButton')).getText().then(function(value) {
        chai.assert.equal(value, 'Back to sales employees')
      });

      await driver.findElement(webdriver.By.id('backToSalesEmployeeButton')).click();
      
  await driver.quit();
}));