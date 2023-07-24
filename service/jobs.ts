import { Jobs } from "../model/jobs";
// const productValidator = require('../validator/productValidator')
const axios = require('axios');


module.exports.createDeliveryEmployee = async function (jobs: Jobs): Promise<number> {

      try {
        const response = await axios.post('http://localhost:8080/api/jobs/', jobs)

        return response.data
    } catch (e) {
        throw new Error('Could not create Job')
    }
}

//get jobs
//delete jobs
