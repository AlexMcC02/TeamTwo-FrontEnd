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

    app.get('/band_levels', async (req, res) => {
        let data = [];

        try {
            data = await jobRoleService.getBandLevels()
        } catch (e) {
            console.error(e)
            res.locals.error = "Failed to get BandLevels"
            return res.render('list-bandlevels', req.body)
        }
        res.render('list-bandlevels', { bandLevels: data})
    })
}