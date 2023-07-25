import { Application, Request, Response } from "express";
import { JobRole } from "../model/JobRole";

const jobRoleService = require('../service/JobRoleService')

module.exports = function(app: Application) {
    app.get('/job_roles', async (req: Request, res: Response) => {
        let data = [];

        try {
                data = await jobRoleService.getJobRoles() 
            } catch (e) {
                console.error(e);
            }
            res.render('list-jobroles', { jobRoles: data } )
    })

    app.get('/job_roles/:id', async (req: Request, res: Response) => {
        let data: JobRole;

        try {
                data = await jobRoleService.getSpecificationById(req.params.id) 
            } catch (e) {
                console.error(e);
                res.locals.errormessage = e.message;
            }
            res.render('view-jobrole-specification', { jobRole: data } )
    })
}