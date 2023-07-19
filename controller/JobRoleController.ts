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
            }
            res.render('list-jobroles', { jobRoles: data } )
    })

    app.get('/job_roles/:id', async (req, res) => {
        let data: JobRole;

        try {
                data = await jobRoleService.getSpecificationById(req.params.id) 
            } catch (e) {
                console.error(e);
            }
            res.render('view-jobrole-specification', { jobRole: data } )
    })
}