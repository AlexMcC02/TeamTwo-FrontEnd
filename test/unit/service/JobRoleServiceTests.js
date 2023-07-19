var axios = require('axios');
var MockAdapter = require('axios-mock-adapter')
var chai = require('chai')
const expect = chai.expect
const JobRoleService = require('../../../service/JobRoleService');
const { Test } = require('mocha');

const jobrole = {
    id: "1",
    name: "Software Engineer",
    specification: "Does coding.",
    capabilityID: "1",
    bandID: "1"
}
Test
describe('JobRoleService', function () {
    describe('getJobRoles', function () {
        it('should return jobroles from response', async () => {
            var mock = new MockAdapter(axios);
    
            const data = [jobrole];
    
            mock.onGet(JobRoleService.URL).reply(200, data);
    
            var results = await JobRoleService.getJobRoles();
    
            expect(results[0]).to.deep.equal(jobrole)
          })
    })
})