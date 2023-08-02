import { Application, Request, Response } from "express";
import { JobRoleSpec } from "../model/JobRoleSpec";
import { JobRole } from "../model/JobRole";
import { JobRoleCorrect } from "../model/JobRoleCorrect";

const jobRoleService = require('../service/JobRoleService')
const BandService = require('../service/BandService')
const CapabilityService = require('../service/CapabilityService')


module.exports = function(app: Application) {
    app.get('/job_roles', async (req: Request, res: Response) => {
        let data = [];

        try {
              data = await jobRoleService.getJobRoles() 
          } catch (e) {
              console.error(e);
              res.locals.errormessage = "Failed to fetch JobRoles"
              return res.render('list-jobroles', req.body)
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
        res.render('add-jobrole', { bands: bands, capabilitys: capabilitys  })
    })

    app.post('/add-jobrole', async (req: Request, res: Response) => {
        let data: JobRoleCorrect = req.body
        
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

    app.get('/job_roles/update/:id', async (req: Request, res: Response) => {
        let jobRoleID = req.params.id
        let bands = [];
        let capabilitys = [];

        try {
            bands = await BandService.getBands() 
            capabilitys = await CapabilityService.getCapabilities()
            let JobRole = await jobRoleService.getJobRoleById(jobRoleID)
            res.render('edit-jobrole', { jobRole: JobRole, bands: bands, capabilitys: capabilitys });
          } catch (e) {
              console.error(e);
              res.status(500).send('Internal server error')
          }
    })

    app.post('/job_roles/update/:id', async (req: Request, res: Response) => {
        let jobId = req.params.id;
        let data: JobRole = req.body;

    try {
        await jobRoleService.updateJobRole(jobId, data);
        res.redirect('/job_roles');
    } catch (e) {
        console.error(e);
        res.locals.errormessage = e.message;

        let bands = [];
        let capabilitys = [];
        try {
            bands = await BandService.getBands();
            capabilitys = await CapabilityService.getCapabilities();
        } catch (e) {
            console.error(e);
        }

        res.render('edit-jobrole', { jobRole: data, bands: bands, capabilitys: capabilitys });
        }
    })
}
