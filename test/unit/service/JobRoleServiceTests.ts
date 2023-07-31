var axios = require('axios');
var MockAdapter = require('axios-mock-adapter')
import chai from 'chai'
const expect = chai.expect
const JobRoleService = require('../../../service/JobRoleService.ts')

const jobrole = {
    id: 1,
    name: "Software Engineer",
    specification: "Does coding.",
    bandID: 1,
    capabilityID: 1,
    urlLink: "www.google.com"
}

const jobrole_r = {
    name: "Software Engineer",
    specification: "Does coding.",
    bandID: 1,
    capabilityID: 1,
    urlLink: "www.google.com" 
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
        it('should return exception when 500 error returned from axios', async () => {
            var mock = new MockAdapter(axios);
    
            mock.onGet(JobRoleService.URL).reply(500);
    
            var error = await JobRoleService.getJobRoles();
    
            expect(error.message).to.equal('Could not get job roles.')
        })
    })

    describe('putJobRoles', function() {

        // If successful, nothing is returned.

        it('should return exception when 500 error returned from axios', async () => {
            var mock = new MockAdapter(axios);
    
            mock.onPost(JobRoleService.URL).reply(500);
    
            var error = await JobRoleService.updateJobRole();
    
            expect(error.message).to.equal('Could not update job role.')
        })
    })
})