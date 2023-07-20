import { Application, Request, Response } from "express";

const jobRoleService = require('../service/JobRoleService')

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
}

module.exports = function(app: Application) {
    app.get('/capability', async (req, res) => {
        let data = [];

        try {
                data = await jobRoleService.getCapability() 
            } catch (e) {
                console.error(e);
            }
            res.render('list-capabilities', { capabilities: data } )
    })
}