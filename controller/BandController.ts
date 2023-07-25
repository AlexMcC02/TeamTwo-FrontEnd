import { Application, Request, Response } from "express";
import { Band } from "../model/Band";

const bandService = require('../service/BandService')

module.exports = function(app: Application) {
    app.get('/bands', async (req: Request, res: Response) => {
        let data = [];

        try {
                data = await bandService.getBands() 
                console.log(data);
            } catch (e) {
                console.error(e);
            }
            res.render('add-jobrole', { bands: data } )
    })
}