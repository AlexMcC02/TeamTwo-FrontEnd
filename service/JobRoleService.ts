const axios = require('axios');
import { JobRole } from "../model/JobRole";
//import { JobRoleValidator } from "../validator/JobRoleValidator";
const jobRoleValidator = require('../validator/JobRoleValidator')


module.exports.getJobRoles = async function() {
    try {
        const response = await axios.get('http://localhost:8080/api/job_roles')
       // console.log(response.data)
        return response.data
    } catch (e) {
        return new Error('Could not get job roles.')
    }
}

module.exports.getSpecificationById = async function (id: number) { 
    try {
        const response = await axios.get(process.env.UI_URL + '/api/job_roles/' + id)
        
        return response.data;
    } catch (e) {
        throw new Error('Could not find specification with the given ID.');

    }
}
