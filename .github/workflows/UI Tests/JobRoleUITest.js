const webdriver = require('selenium-webdriver');
const chai = require('chai');  
const { Test } = require('mocha');


Test
describe('JobRolesUITest', async () => {

  it('should check if elements on the JobRoles page are present', async () => {

    var driver = new webdriver.Builder().
      withCapabilities(webdriver.Capabilities.chrome()).
      build();

      await driver.get(process.env.http://localhost:3000);
      
      await driver.findElement(webdriver.By.id('header')).getText().then(function(value) {
        chai.assert.equal(value, 'View Job Roles')
      }));
      await driver.findElement(webdriver.By.id('jobs')).getText().then(function(value) {
        chai.assert.equal(value, 'Jobs')
      });
      await driver.findElement(webdriver.By.id('name')).getText().then(function(value) {
        chai.assert.equal(value, 'Name')
      });
      await driver.findElement(webdriver.By.id('specification')).getText().then(function(value) {
        chai.assert.equal(value, 'Specification')
      });
      await driver.findElement(webdriver.By.id('bandid')).getText().then(function(value) {
        chai.assert.equal(value, 'BandID')
      });
      await driver.findElement(webdriver.By.id('capabilityid')).getText().then(function(value) {
        chai.assert.equal(value, 'CapabilityID')
      });

  await driver.quit();
});
});