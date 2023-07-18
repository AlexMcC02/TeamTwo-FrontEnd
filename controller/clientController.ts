import { Application, Request, Response } from "express";
import { ClientResponse } from "../model/clientResponse";
import { Client } from "../model/client";

const clientService = require("../service/clientService");

module.exports = function(app: Application) {
    app.get("/clients", async (req: Request, res: Response) => {
        let data: ClientResponse[];

        try {
            data = await clientService.getClients();
        } catch (e) {
            console.error(e);
        }

        res.render("list-clients", { clients: data })
    })

    app.get('/highest-client/', async(req: Request, res: Response) => {
        let data: Client;
    
        try {
            data = await clientService.getHighestClient(req.params.id)
            console.log(data.name)
        } catch(e) {
            console.error(e);
        }
        res.render('view-highest-client', { client: data })
    })

}
