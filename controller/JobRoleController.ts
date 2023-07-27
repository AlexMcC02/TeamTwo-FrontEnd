import { Application, Request, Response } from "express";
import { JobRole } from "../model/JobRole";

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

    app.get('/job_roles/update/:id', async (req: Request, res: Response) => {

        try {
            let data: JobRole = await jobRoleService.getJobRoleById(req.params.id);
            res.render('edit-jobrole', { jobRole: data });
          } catch (e) {
              console.error(e);
          }
    })

    app.put('/job_roles/update/:id', async (req: Request, res: Response) => {
        let data: JobRole = req.body;
        data.id = +req.params.id;

        try {
            await jobRoleService.updateJobRole(data);
            res.redirect('/job_roles/' + data.id)
          } catch (e) {
              console.error(e);
              res.locals.errormessage = "Failed to fetch update JobRole"
          }
    })
}