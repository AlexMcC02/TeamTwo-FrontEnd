const supertest = require('supertest')
import chai from "chai"
const expect = chai.expect

import { app } from '../../../app';

describe('JobRoleController', function() {

    const request = supertest(app)

    describe('GET/ jobroles', async function() {
        it('should render the list-jobroles view', async () => {
            const response = await request.get('/job_roles').set('Accept', 'application/json')
            expect(response.status).equal(200)
        })
    })
})

describe('JobRoleController', function() {

    const request = supertest(app)

    describe('GET/ capability', async function() {
        it('should render the list-capabilities view', async () => {
            const response = await request.get('/capability').set('Accept', 'application/json')
            expect(response.status).equal(200)
        })
    })
})