import { expect, assert } from "chai";
import { JobRole } from "../../../model/JobRole";

var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
const JobRoleService = require('../../../service/JobRoleService.ts');


const jobrole = {
    id: 1,
    name: "Software Engineer",
    specification: "Does coding",
    bandId: 1,
    capabilityId: 1,
    urlLink: "www.google.com"
}

describe('JobRoleService', function () {
    describe('getJobRoles', function () {
        it('should throw an error if the request fails', async () => {
            var mock = new MockAdapter(axios);

            mock.onGet(JobRoleService.URL).reply(500);

            try {
                await JobRoleService.getJobRoles();
            } catch (error) {
                assert.equal(error.message, 'Could not get job roles.');
            }
        })
    })
    

    describe('createJobRole', function () {
        it('should return the created job role ID from response', async () => {
            var mock = new MockAdapter(axios);
    
            const createdId = 1;
            const createdJobRole = { ...jobrole, id: createdId };
    
            mock.onPost(JobRoleService.URL, jobrole).reply(200, createdJobRole);
    
            var resultId;
            try {
                resultId = await JobRoleService.createJobRole(jobrole);
                assert.strictEqual(resultId.id, createdId);
            } catch (error) {
                assert.fail('Unexpected error: ' + error.message);
            }
        })
    

        it('should throw an error if the request fails', async () => {
            var mock = new MockAdapter(axios);

            mock.onPost(JobRoleService.URL, jobrole).reply(500);

            try {
                await JobRoleService.createJobRole(jobrole);
               // assert.fail('Expected an error to be thrown.');
            } catch (error) {
                assert.strictEqual(error.message, 'Could not create job role.');
            }
        })

        it('should throw an error if the job role is missing a required field', async () => {
            var mock = new MockAdapter(axios);
      
            const invalidJobRole = { ...jobrole };
            delete invalidJobRole.name;
      
            try {
              await JobRoleService.createJobRole(invalidJobRole);
              assert.fail('Could not create job role.');
            } catch (error) {
              expect(error.message).contain('name');
            }
          })
        })
    })

