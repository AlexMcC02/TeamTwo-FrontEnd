import { JobRole } from "../model/JobRole";

const axios = require('axios');

module.exports.getJobRoles = async function() {
    try {
        const response = await axios.get('http://localhost:8080/api/job_roles')
        return response.data
    } catch (e) {
        throw new Error('Could not get job roles.')
    }
}

module.exports.createJobRole = async function (jobrole: JobRole): Promise<number> {
    try {
        const response = await axios.post('http://localhost:8080/api/job_roles', jobrole)
        return response.data
    } catch (e) {
        throw new Error('Could not create job role.')
    }
}