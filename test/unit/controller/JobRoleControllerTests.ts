const supertest = require('supertest')
import chai from "chai"
const expect = chai.expect
import sinon from "sinon";

import { app } from '../../../app';

const jobRoleService = require("../../../service/JobRoleService")

describe('JobRoleController', function() {

    const request = supertest(app)

    describe('GET/ jobroles', async function() {
        it('should render the list-capabilities view', async () => {
            
            // Mock service using sinon.
            const stub = sinon.stub(jobRoleService, "getCapability").returns({
                roleName: "Software Engineer",
                capability: "Engineering"
            })

            // Run test.
            const response = await supertest(app)
                .get('/capability').set('Accept', 'application/json').expect(200)

            /* Clear stub after test completes, necessary to prevent the sinon spy from
            interfering with other tests. */
            stub.restore()
        })
    })
})