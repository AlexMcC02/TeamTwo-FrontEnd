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

    describe('getJobRoles', function () {
        it('should return exception when 500 error returned from axios', async () => {
            var mock = new MockAdapter(axios);
    
            mock.onGet(JobRoleService.URL).reply(500);
    
            var error = await JobRoleService.getJobRoles();
    
            expect(error.message).to.equal('Could not get job roles.')
          })
    }) 

    describe('getSpecificationById', function () {
        it('should return job role specification from response', async () => {
            var mock = new MockAdapter(axios);

            const id = 1;
            const mockResponse = {
                data: jobrole
            };

            mock.onGet(`http://localhost:8080/api/job_roles/${id}`).reply(200, mockResponse);

            var result = await JobRoleService.getSpecificationById(id);

            expect(result).to.deep.equal(jobrole);
        });

        it('should throw an error when unable to get job role specification', async () => {
            var mock = new MockAdapter(axios);

            const id = 1;

            mock.onGet(`http://localhost:8080/api/job_roles/${id}`).reply(500);

            try {
                await JobRoleService.getSpecificationById(id);
                // If the function doesn't throw an error, the test should fail.
                expect.fail('Could not find specification with the given ID.');
            } catch (error) {
                expect(error.message).to.equal('Could not find specification with the given ID.');
            }
        });
    });
