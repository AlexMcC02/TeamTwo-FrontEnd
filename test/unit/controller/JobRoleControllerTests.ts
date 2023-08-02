const supertest = require('supertest')
import chai from "chai"
const expect = chai.expect
import sinon from "sinon";

import { app } from '../../../app';

const jobRoleService = require("../../../service/JobRoleService")

const mockJobRole = {
  id: 1,
  name: 'Software Engineer',
  specification: 'Makes and breaks stuff',
  urlLink: 'https://google.com'
};

describe('JobRoleController', function() {
    const request = supertest(app);
    describe('GET /job_roles/:id', function () {
    it('should render the view-jobrole-specification view with job role data', async () => {
      // Mock service using sinon.
      const stub = sinon.stub(jobRoleService, 'getSpecificationById').returns(mockJobRole);

      // Run test.
      const response = await request
        .get('/job_roles/1') // Assuming you are testing for job role ID 1.
        .set('Accept', 'text/html') // Set the accept header to indicate HTML response.
        .expect(200);

      // Assertions
      expect(response.text).to.include('Name'); // Check if the rendered view contains the job role name.
      expect(response.text).to.include('Specification'); // Check if the rendered view contains the job role summary.
      expect(response.text).to.include('Link'); // Check if the rendered view contains the job role link.
      /* Clear stub after test completes, necessary to prevent the sinon spy from
      interfering with other tests. */
      stub.restore();
    });

    it('should handle errors and set error message in response locals', async () => {
      // Mock service using sinon to throw an error.
      const error = new Error('Could not find specification with the given ID.');
      const stub = sinon.stub(jobRoleService, 'getSpecificationById').throws(error);

      // Run test.
      const response = await request
        .get('/job_roles/1') // Assuming you are testing for job role ID 1.
        .set('Accept', 'text/html') // Set the accept header to indicate HTML response.
        .expect(200);

      // Assertions
      expect(response.text).to.include('Could not find specification with the given ID.'); // Check if the error message is included in the response.

      /* Clear stub after test completes, necessary to prevent the sinon spy from
      interfering with other tests. */
      stub.restore();
    });

    describe('GET/ jobroles', async function() {
        it('should render the list-jobroles view', async () => {

            // Mock service using sinon.
            const stub = sinon.stub(jobRoleService, "getJobRoles").returns({
                id: 1,
                name: "Software Engineer",
                specification: "Works on stuff"
            })

            // Run test.
            const response = await supertest(app)
                .get('/job_roles').set('Accept', 'application/json').expect(200)

            /* Clear stub after test completes, necessary to prevent the sinon spy from
            interfering with other tests. */
            stub.restore()
        })
    })

    describe('DELETE /job_roles/:id', async function () {
        it('should delete the job role and render the updated list-jobroles view', async () => {
            // Stub the jobRoleService.deleteJobRole function to return a resolved promise
            const deletedJobRoleId = "1"; // The ID of the job role to be deleted
            const mockDeletedJobRole = {
                id: deletedJobRoleId.toString(),
                name: 'Deleted Job Role',
                specification: 'No longer exists'
            };
            const fakeDeleteJobRole = sinon.fake.resolves(mockDeletedJobRole);

            // Replace the original deleteJobRole function with the fake one.
            sinon.replace(jobRoleService, 'deleteJobRole', fakeDeleteJobRole);

            // Mock the job role data for the response from service
            const mockJobRoles = [mockDeletedJobRole];
            sinon.replace(jobRoleService, 'getJobRoles', sinon.fake.returns(mockJobRoles));

            // Send a DELETE request to the endpoint with the job role ID to delete
            const response = await request
                .delete(`/job_roles/${deletedJobRoleId}`)
                .set('Accept', 'application/json')
                .expect(200);

            // Logging to check arguments used for the deleteJobRole function
            console.log(fakeDeleteJobRole.getCall(0).args[0]); // Accessing the first call's first argument

            // Logging the response from the DELETE request
            console.log(response.text);

            // Assertions
            expect(response.text).to.contain('Deleted Job Role');
            expect(response.text).to.contain('No longer exists');

            // Verify that the jobRoleService.deleteJobRole was called with the correct job role ID
            expect(fakeDeleteJobRole.getCall(0).args[0]).to.equal(deletedJobRoleId);

            // Clean up: restore the original functions
            sinon.restore();
        })
    })
  });
})