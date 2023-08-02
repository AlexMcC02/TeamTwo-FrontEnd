const axios = require('axios');
import { JobRoleCorrect } from "../model/JobRoleCorrect";
import { JobRole } from "../model/JobRole";
const jobRoleValidator = require('../validator/JobRoleValidator')


module.exports.getJobRoles = async function() {
    try {
        const response = await axios.get(process.env.UI_URL + '/api/job_roles')
        return response.data
    } catch (e) {
        return new Error('Could not get job roles.')
    }
}

module.exports.createJobRole = async function(jobRole: JobRoleCorrect): Promise<number> {
    const error: string = jobRoleValidator.validateJobRole(jobRole)   

    if (error) {
        throw new Error(error)
    }

    try {
        const response = await axios.post(process.env.UI_URL + '/api/job_roles', jobRole)
        return response.data
    } catch (e) {
        throw new Error('Could not create job role.')
    }
}

module.exports.getJobRoleById = async function(id: number) {
    try {
        const response = await axios.get(process.env.UI_URL + '/api/job_roles/' + id)
        return response.data
    } catch (e) {
        return new Error('Could not get job role.')
    }
}

module.exports.updateJobRole = async function(id: number, jobRole: JobRole) {
    try {
        const response = await axios.put(process.env.UI_URL + '/api/job_roles/' + id, jobRole)
    } catch (e) {
        return new Error('Could not update job role.')
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
