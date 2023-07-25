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
    
    app.get('/add-jobrole', (req: Request, res: Response) => {
        res.render('add-jobrole')
    })

    app.post('/add-jobrole', async (req: Request, res: Response) => {
        let data: JobRole = req.body
        //let data = req.body
        let id: Number

        try {
            id = await jobRoleService.createJobRole(data)

            res.redirect('/job_roles')
        } catch (e) {
            console.error(e);

            res.render('add-jobrole')
        }
    })
}