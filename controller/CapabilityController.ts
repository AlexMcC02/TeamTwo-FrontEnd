import { Application, Request, Response } from "express";
import { Capability } from "../model/Capability";

const capabilityService = require('../service/CapabilityService')

//This code is an Express.js route handler that responds to HTTP GET requests to the '/capability' endpoint.

module.exports = function(app: Application) {


    //puts the capability data into an array called bands
    app.get('/capability', async (req: Request, res: Response) => {
        let data = [];

        try {
                data = await capabilityService.getCapability() 
                console.log(data);
            } catch (e) {
                console.error(e);
            }
            res.render('add-jobrole', { capabilitys: data } )
            console.log(data);
    })
}