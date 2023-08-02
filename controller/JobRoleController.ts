import { Application, Request, Response } from "express";
import { JobRoleSpec } from "../model/JobRoleSpec";

const jobRoleService = require('../service/JobRoleService')

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

    app.delete('/job_roles/:id', async (req: Request, res: Response) => {
        const jobId = req.params.id;
        let data = [];

        try {
            await jobRoleService.deleteJobRole(jobId);
            data = await jobRoleService.getJobRoles();
        } catch (e) {
            console.error(e);
            res.locals.errormessage = "Failed to delete job role"
        }
        res.render('list-jobroles', { jobRoles: data } )
    })
}