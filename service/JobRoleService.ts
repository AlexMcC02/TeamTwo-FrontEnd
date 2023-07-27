import { JobRole } from "../model/JobRole";

const axios = require('axios');

module.exports.getJobRoles = async function() {
    try {
        const response = await axios.get(process.env.UI_URL + '/api/job_roles')
        return response.data
    } catch (e) {
        return new Error('Could not get job roles.')
    }
}

module.exports.getJobRoleById = async function(id: number) {
    try {
        const response = await axios.get(process.env.UI_URL + '/api/job_roles/' + id)
        return response.data
    } catch (e) {
        throw new Error('Could not get job role.')
    }
}

module.exports.updateJobRole = async function(jobRole: JobRole) {
    try {
        const response = await axios.put(process.env.UI_URL + '/api/job_roles/' + jobRole.id, jobRole)
        return response.data
    } catch (e) {
        throw new Error('Could not update job role.')
    }
}