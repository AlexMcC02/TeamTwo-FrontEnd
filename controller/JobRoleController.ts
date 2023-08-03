import { Application, Request, Response } from "express";
import { JobRoleSpec } from "../model/JobRoleSpec";
import { JobRoleAdd } from "../model/JobRoleAdd";

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

    app.get('/job_roles/:id', async (req: Request, res: Response) => {
        let data: JobRoleSpec;

        try {
                data = await jobRoleService.getSpecificationById(req.params.id) 
                
            } catch (e) {
                console.error(e);
                res.locals.errormessage = e.message;
            }
            res.render('view-jobrole-specification', { jobRoleSpec: data } )
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
        let data: JobRoleAdd = req.body
        
        let id: Number

        try {
            id = await jobRoleService.createJobRole(data)

            res.redirect('/job_roles')
        } catch (e) {
            console.error(e);

            res.locals.errormessage = e.message
            res.locals.jobRole = data

            res.render('add-jobrole')
        }
    })
}
