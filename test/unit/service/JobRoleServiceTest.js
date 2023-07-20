var axios = require('axios');
var MockAdapter = require('axios-mock-adapter')
var chai = require('chai')
const expect = chai.expect
const JobRoleService = require('../../../service/JobRoleService');
//const { test } = require('node:test');

const jobrole = {
    id: "1",
    name: "Software Engineer",
    specification: "Does coding.",
    capabilityID: "1",
    bandID: "1"
}

const capability = {
    roleName: "Software Engineering",
    capability: "Engineering"
}

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

describe('JobRoleService', function () {
    describe('getCapability', function () {
        it('should return capabilities from response', async () => {
            var mock = new MockAdapter(axios);
    
            const data = [capability];
    
            mock.onGet(JobRoleService.URL).reply(200, data);
    
            var results = await JobRoleService.getCapability();
    
            expect(results[0]).to.deep.equal(capability)
          })
    })
})