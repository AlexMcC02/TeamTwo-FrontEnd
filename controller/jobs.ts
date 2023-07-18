import { Application } from "express";
import { Response } from "express";
import { Request } from "express";
import { Jobs } from "../model/jobs";

const job = require('../service/deliveryEmployeeService')

module.exports = function(app: Application){

    app.get('/add-job', async (req: Request, res: Response) => {
        res.render('add-job')
    })

    app.post('/add-job', async (req: Request, res: Response) => {
        let data: Jobs = req.body
        let id: Number

        try {
            id = await job.createDeliveryEmployee(data)

            res.redirect('/job/' + id)
        } catch (e) {
            console.error(e);

            res.locals.errormessage = e.message

            res.render('add-job', req.body)
        }
    }) 
}
