const supertest = require('supertest')

import sinon from "sinon";

import { app } from '../../../app';


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

            const stub = sinon.stub(jobRoleService, "getJobRoles").returns({
                id: 1,
                name: "Software Engineer",
                specification: "Works on stuff"
            })

            const response = await supertest(app)
                .get('/job_roles').set('Accept', 'application/json').expect(200)

            stub.restore()
        })
    })

    describe('GET /add-jobrole', async function() {
        it('should render the add-jobrole view', async () => {

            const stub = sinon.stub(BandService, "getBands").returns({
                id: 1,
                name: "Software Engineer"
            })

            const response = await supertest(app)
                .get('/add-jobrole').set('Accept', 'application/json').expect(200)

            stub.restore()
        })

    })



    describe('POST /add-jobrole', async function() {
        it('should redirect to /job_roles on success', async () => {

            const stub = sinon.stub(jobRoleService, "createJobRole").returns({
                id: 1,
                name: "Software Engineer",
                specification: "Works on stuff"
            })

            const response = await supertest(app)
                .post('/add-jobrole').set('Accept', 'application/json').expect(302)

            stub.restore()
        })
    })

        it('should render the add-jobrole view on failure', async () => {

            const stub = sinon.stub(jobRoleService, "createJobRole").returns({
                id: 1,
                name: "Software Engineer",
                specification: "Works on stuff"
            })

            const response = await supertest(app)
                .post('/add-jobrole').set('Accept', 'application/json').expect(302)

            stub.restore()
        })
    })
