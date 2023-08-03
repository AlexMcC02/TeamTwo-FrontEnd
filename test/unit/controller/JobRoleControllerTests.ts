const supertest = require('supertest')
import chai from "chai"
const expect = chai.expect
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
        describe('GET /job_roles/:id', function () {
            it('should render the view-jobrole-specification view with job role data', async () => {
              
              const stub = sinon.stub(jobRoleService, 'getSpecificationById').returns(mockJobRole);
        
              
              const response = await request
                .get('/job_roles/1') 
                .set('Accept', 'text/html') 
                .expect(200);
        

              expect(response.text).to.include('Name'); 
              expect(response.text).to.include('Specification'); 
              expect(response.text).to.include('Link'); 
            
              stub.restore();
            });
        });
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

            // it('should render the add-jobrole view on failure', async () => {
            //     const errorMock = new Error('Mock error message');
                
            //     const stub = sinon.stub(jobRoleService, 'createJobRole').throws(errorMock);
            
            //     const response = await supertest(app)
            //         .post('/add-jobrole')
            //         .send({ name: 'Software Engineer', specification: 'Works on stuff' })
            //         .set('Accept', 'application/json')
            //         .expect(200); 
            
            //     expect(response.text).contain(errorMock.message);
            
            //     stub.restore();
            // });

            it('should render the add-jobrole view on failure', async () => {
                const errorMock = new Error('Mock error message');
                
                const stub = sinon.stub(jobRoleService, 'createJobRole').throws(errorMock);
            
                const response = await supertest(app)
                    .post('/add-jobrole')
                    .send({ name: 'Software Engineer', specification: 'Works on stuff' })
                    .set('Accept', 'application/json')
                    .expect(200);

                expect(response.text).contain(errorMock.message);
            
                stub.restore();
            });
    })
})