import { Application, Request, Response } from "express";
import { JobRole } from "../model/JobRole";

const jobRoleService = require('../service/JobRoleService')
const BandService = require('../service/BandService')
const CapabilityService = require('../service/CapabilityService')


// the controller layer is responsible for handling HTTP requests and responses.
//doesnt talk to backend API directly
//instead, it uses the service layer to fetch data from the API and
//render HTML templates using the data

module.exports = function(app: Application) {
    app.get('/job_roles', async (req, res) => {
        let data = [];

        try {
                data = await jobRoleService.getJobRoles() 
            } catch (e) {
                console.error(e);
            }
            res.render('list-jobroles', { jobRoles: data } )
    })
    
    app.get('/add-jobrole', async (req: Request, res: Response) => {
        let bands = [];
        let capabilitys = [];

        try {
            bands = await BandService.getBands() 
            capabilitys = await CapabilityService.getCapabilities()
        } catch (e) {
            console.error(e);
        }
        //res.render('add-jobrole', { bands: bands })
        res.render('add-jobrole', { bands: bands, capabilitys: capabilitys  })
    })

    app.post('/add-jobrole', async (req: Request, res: Response) => {
        let data: JobRole = req.body
        
        let id: Number

        try {
            id = await jobRoleService.createJobRole(data)

            res.redirect('/job_roles')
        } catch (e) {
            console.error(e);

            res.locals.errormessage = e.message

            res.render('add-jobrole')
        }
    })
}

