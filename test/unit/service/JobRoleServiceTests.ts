var axios = require('axios');
var MockAdapter = require('axios-mock-adapter')
import chai from 'chai'
const expect = chai.expect
const JobRoleService = require('../../../service/JobRoleService.ts')

const jobrole = {
    id: "1",
    name: "Software Engineer",
    specification: "Does coding."
}

const bandlevel = {
    id: "1",
    roleName: "Software Engineer",
    bandLevel: "Manager"
}

const jobroleSpec = {
    id: "1",
    name: "Software Engineer",
    specification: "Does coding.",
    urlLink: "https://www.google.com"
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
    
            mock.onGet(JobRoleService.URL).networkError();
    
            var error = await JobRoleService.getJobRoles();

            expect(error.message).to.equal('Could not get job roles.')
          })
    }) 
    describe('getSpecificationById', function () {
        it('should return job role specification from response', async () => {

            var mock = new MockAdapter(axios);
    
            const data = [jobroleSpec];
    
            mock.onGet(JobRoleService.URL).reply(200, data);
    
            var results = await JobRoleService.getJobRoles();
    
            expect(results[0]).to.deep.equal(jobroleSpec)
        });

        it('should throw an error when unable to get job role specification', async () => {
            var mock = new MockAdapter(axios);

            const id = 1;

            mock.onGet(`http://localhost:8080/api/job_roles/${id}`).reply(500);

            try {
                await JobRoleService.getSpecificationById(id);
                
                expect.fail('Could not find specification with the given ID.');
            } catch (error) {
                expect(error.message).to.equal('Could not find specification with the given ID.');
            }
        });
    })
    describe('deleteJobRole', function () {
        it('should throw an error when unable to delete job role', async () => {
          const jobId = "1"; // The ID of the job role to be deleted
          var mock = new MockAdapter(axios);
    
          mock.onDelete(`${JobRoleService.URL}/${jobId}`).reply(500);
    
          try {
            await JobRoleService.deleteJobRole(jobId);
    
            expect.fail('Could not delete job role.');
          } catch (error) {
            expect(error.message).to.equal('Could not delete job role.');
          }
        });
    });
});
