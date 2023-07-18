import { Application, Request, Response } from "express";
import { ProjectResponse } from "../model/projectResponse";

const projectService = require("../service/projectService");

module.exports = function(app: Application) {
    app.get("/projects", async (req: Request, res: Response) => {
        let data: ProjectResponse[];

        try {
            data = await projectService.getProjects();
        } catch (e) {
            console.error(e);
        }

        res.render("list-projects", { projects: data })
    })

}
