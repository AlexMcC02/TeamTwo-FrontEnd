import { Application, Request, Response } from "express";
import { SalesEmployee } from "../model/salesEmployee";

const salesEmployeeService = require('../service/salesEmployeeService');

module.exports = function(app: Application) {
    app.get('/add-sales-employee', async (req: Request, res:Response) => {
        res.render('add-sales-employee')
    })

    app.post('/add-sales-employee',  async (req: Request, res:Response) => {
        let data: SalesEmployee = req.body;
        let id: Number;

        try {
            id = await salesEmployeeService.createSalesEmployee(data)

            res.redirect('/sales-employees/' + id)  
        } catch (e) {
            console.error(e)

            res.locals.errormessage = e.message;

            res.render('add-sales-employee')
        }

    })

    app.get('/sales-employees', async (req: Request, res: Response) => {
        let data: SalesEmployee[];
    
        try {
          data = await salesEmployeeService.getSalesEmployees();
        } catch (e) {
          console.error(e);
        }
    
        res.render('list-sales-employees', { salesEmployees: data });
      })
    
      app.get('/sales-employees/:id', async(req: Request, res: Response) => {
        let data: SalesEmployee;
    
        try {
            data = await salesEmployeeService.getSalesEmployeeById(req.params.id)
            console.log(data.name)
        } catch(e) {
            console.error(e);
        }
        res.render('view-sales-employee', { salesEmployee: data })
    })

    app.get('/sales-employees/update/:id', async(req: Request, res: Response) => {
        try {
            let data: SalesEmployee = await salesEmployeeService.getSalesEmployeeById(req.params.id);
            res.render('update-sales-employee', { salesEmployee: data })
        } catch(e) {
            console.error(e);
        }
    })
  
    app.post("/sales-employees/update/:id", async(req: Request, res: Response) => {
        let data: SalesEmployee = req.body;
        data.id = +req.params.id;
  
        try {
            await salesEmployeeService.updateSalesEmployee(data);
            res.redirect("/sales-employees/" + data.id);
        } catch (e) {
            console.error(e);
        }
    })

    app.get('/sales-employees/delete/:id', async(req: Request, res: Response) => {
        try {
            await salesEmployeeService.deleteSalesEmployee(+req.params.id);
            res.redirect("/sales-employees/");
        } catch(e) {
            console.error(e);
        }
    })
}