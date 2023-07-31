const axios = require('axios');
import { JobRole } from "../model/JobRole";


module.exports.getJobRoles = async function() {
    try {
        const response = await axios.get(process.env.UI_URL + '/api/job_roles')
        return response.data
    } catch (e) {
        return new Error('Could not get job roles.')
    }
}

module.exports.createJobRole = async function(jobRole: JobRole): Promise<number> {
    try {
        const response = await axios.post('http://localhost:8080/api/job_roles', jobRole)
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
        console.log(e)
        return new Error('Could not update job role.')
    }
}