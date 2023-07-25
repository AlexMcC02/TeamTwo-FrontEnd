import axios from 'axios'
var MockAdapter = require('axios-mock-adapter')
var chai = require('chai')
const expect = chai.expect
const JobRoleService = require('../../../service/JobRoleService.ts');
const { Test } = require('mocha');

const jobrole = {
    id: "1",
    name: "Software Engineer",
    specification: "Does coding."
}

const capability = {
    roleName: "Software Engineering",
    capability: "Engineering"
}

describe('JobRoleService', function () {
    describe('getCapability', function () {
        it('should return capabilities from response', async () => {
            var mock = new MockAdapter(axios);
    
            const data = [capability];
    
            mock.onGet(JobRoleService.URL).reply(200, data);
    
            var results = await JobRoleService.getCapability();
    
            expect(results[0]).to.deep.equal(capability)
          })
        it('should throw exception when 500 error returned from axios', async () => {
            var mock = new MockAdapter(axios);
    
            mock.onGet(JobRoleService.URL).reply(500);
    
            var error;
            try {
                await JobRoleService.getCapability();
            } catch (e) {
                var error = e.message
            }
            
            expect(error).to.equal('Could not get capabilities.')
          })
    })
})