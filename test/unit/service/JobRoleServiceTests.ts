var axios = require('axios');
import { expect, assert } from "chai";
var MockAdapter = require('axios-mock-adapter')
import { JobRoleAdd } from "../../../model/JobRoleAdd";
import chai from 'chai'
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

const jobroleAdd = {
    id: 1,
    name: "Software Engineer",
    specification: "Does coding",
    bandId: 1,
    capabilityId: 1,
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
    })
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
    describe('createJobRole', function () {
        it('should return the created job role ID from response', async () => {
            var mock = new MockAdapter(axios);
    
            const createdId = 1;
            const createdJobRole = { ...jobroleAdd, id: createdId };
    
            mock.onPost(JobRoleService.URL, jobroleAdd).reply(200, createdJobRole);
    
            var resultId;
            try {
                resultId = await JobRoleService.createJobRole(jobroleAdd);
                assert.strictEqual(resultId.id, createdId);
            } catch (error) {
                assert.fail('Unexpected error: ' + error.message);
            }
        });
        it('should throw an error if the request fails', async () => {
            var mock = new MockAdapter(axios);

            mock.onPost(JobRoleService.URL, jobroleAdd).reply(500);

            try {
                await JobRoleService.createJobRole(jobroleAdd);
               // assert.fail('Expected an error to be thrown.');
            } catch (error) {
                assert.strictEqual(error.message, 'Could not create job role.');
            }
        });
        it('should throw an error if the job role is missing a required field', async () => {
            var mock = new MockAdapter(axios);

            const jobroleAdd = {
                id: 1,
                name: "",
                specification: "Does coding",
                bandId: 1,
                capabilityId: 1,
                urlLink: "www.google.com"
            }
      
            const invalidJobRole = { ...jobroleAdd };
      
            try {
              await JobRoleService.createJobRole(invalidJobRole);
              assert.fail('Could not create job role.');
            } catch (error) {
              expect(error.message).contain('name');
            }
        });
    });
});
