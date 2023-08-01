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
  });
})