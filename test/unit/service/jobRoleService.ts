var axios = require('axios');
var MockAdapter = require('axios-mock-adapter')
import chai from 'chai'
const expect = chai.expect
const JobRoleService = require('../../../service/JobRoleService.ts')

const jobroleSpec = {
   
    id: "1",
    name: "Software Engineer",
    specification: "Does coding.",
    urlLink: "https://www.google.com"
    
}



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
    });
