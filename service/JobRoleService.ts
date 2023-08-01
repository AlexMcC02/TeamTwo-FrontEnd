const axios = require('axios');
import { JobRole } from "../model/JobRoleCorrect";
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

module.exports.createJobRole = async function(jobRole: JobRole): Promise<number> {
    const error: string = jobRoleValidator.validateJobRole(jobRole)   

    if (error) {
        throw new Error(error)
    }

    try {
        const response = await axios.post('http://localhost:8080/api/job_roles', jobRole)
        return response.data
    } catch (e) {
        throw new Error('Could not create job role.')
    }
}

