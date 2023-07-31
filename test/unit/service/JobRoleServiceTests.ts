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
    
    describe('deleteJobRole', function () {
        it('should delete a job role and return the deleted job role', async () => {
            const deletedJobRoleId = "1";
            const mockDeletedJobRole = {
                id: deletedJobRoleId,
                name: 'Deleted Job Role',
                specification: 'No longer exists'
            };

            var mock = new MockAdapter(axios);

            mock.onDelete().reply(200, mockDeletedJobRole);

            try {
                const result = await JobRoleService.deleteJobRole(deletedJobRoleId);
                console.log('Result:', result); 
                expect(result).to.deep.equal(mockDeletedJobRole);
            } catch (error) {
                throw new Error(`Failed to delete job role: ${error.message}`);
            }
        });

        it('should return exception when deleting a job role returns a 500 error', async () => {
            const deletedJobRoleId = "1";

            var mock = new MockAdapter(axios);

            mock.onDelete().reply(500);

            try {
                await JobRoleService.deleteJobRole(deletedJobRoleId);
            } catch (error) {
                console.log('Error:', error.message);
                expect(error.message).to.equal('Could not delete job role.');
            }
        });
    }); 
})