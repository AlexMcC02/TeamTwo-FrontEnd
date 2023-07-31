import { Application, Request, Response } from "express";

const jobRoleService = require('../service/JobRoleService')

module.exports = function(app: Application) {
    app.get('/job_roles', async (req, res) => {
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