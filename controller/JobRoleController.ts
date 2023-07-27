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

    // app.get('/job_roles/:id', async (req, res) => {

    //     try {
    //         const jobRole = await jobRoleService.getJobeRoleById(req.params.id);
    //         res.render('edit-jobrole', { jobRole });
    //       } catch (e) {
    //           console.error(e);
    //           res.locals.errormessage = "Failed to fetch JobRole for editing"
    //           return res.redirect('/job_roles')
    //       }
    // })

    app.post('/job_roles/:id', async (req, res) => {

        try {
            const jobRole = req.body;
            await jobRoleService.updateJobRole(req.params.id, jobRole);
            res.redirect('/job_roles')
          } catch (e) {
              console.error(e);
              res.locals.errormessage = "Failed to fetch update JobRole"
              return res.render('edit-jobrole', { jobRole: req.body })
          }
    })
}