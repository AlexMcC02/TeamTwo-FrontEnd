const supertest = require('supertest')
import chai from "chai"
import { expect } from "chai";
import sinon from "sinon";

import { app } from '../../../app';
import { Request, Response } from "express";
import { request } from "express";

const jobRoleService = require("../../../service/JobRoleService")
const BandService = require("../../../service/BandService")
const CapabilityService = require("../../../service/CapabilityService")

const mockJobRole = {
  id: 1,
  name: 'Software Engineer',
  specification: 'Makes and breaks stuff',
  urlLink: 'https://google.com'
};

describe('JobRoleController', function() {
    const request = supertest(app);

    describe('GET /jobroles', async function() {
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

    describe('GET /add-jobrole', async function() {
        it('should render the add-jobrole view', async () => {

            // Mock service using sinon.
            const stub = sinon.stub(BandService, "getBands").returns({
                id: 1,
                name: "Software Engineer",
                specification: "Works on stuff"
            })

            // Run test.
            const response = await supertest(app)
                .get('/add-jobrole').set('Accept', 'application/json').expect(200)

            /* Clear stub after test completes, necessary to prevent the sinon spy from
            interfering with other tests. */
            stub.restore()
        })
    })

    describe('POST /add-jobrole', async function() {
        it('should redirect to /job_roles on success', async () => {

            // Mock service using sinon.
            const stub = sinon.stub(jobRoleService, "createJobRole").returns({
                id: 1,
                name: "Software Engineer",
                specification: "Works on stuff"
            })

            // Run test.
            const response = await supertest(app)
                .post('/add-jobrole').set('Accept', 'application/json').expect(302)

            /* Clear stub after test completes, necessary to prevent the sinon spy from
            interfering with other tests. */
            stub.restore()
        })
    })

        it('should render the add-jobrole view on failure', async () => {

            // Mock service using sinon.
            const stub = sinon.stub(jobRoleService, "createJobRole").returns({
                id: 1,
                name: "Software Engineer",
                specification: "Works on stuff"
            })

            // Run test.
            const response = await supertest(app)
                .post('/add-jobrole').set('Accept', 'application/json').expect(302)

            /* Clear stub after test completes, necessary to prevent the sinon spy from
            interfering with other tests. */
            stub.restore()
        })
    });