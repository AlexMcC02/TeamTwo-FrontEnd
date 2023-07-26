import { Application, Request, Response } from "express";
import { Band } from "../model/Band";

const bandService = require('../service/BandService')

//This code is an Express.js route handler that responds to HTTP GET requests to the '/bands' endpoint.

module.exports = function(app: Application) {


    //puts the bands data into an array called bands
    app.get('/band', async (req: Request, res: Response) => {
        let data = [];

        try {
                data = await bandService.getBands() 
                console.log(data);
            } catch (e) {
                console.error(e);
            }
            res.render('add-jobrole', { bands: data } )
            console.log(data);
    })
}