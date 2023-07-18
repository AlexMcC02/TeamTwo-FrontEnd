const axios = require('axios');
import { JobRole } from "../model/JobRole";

module.exports.getJobRoles = async function(token: string): Promise<JobRole[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/job_roles')
        return response.data
    } catch (e) {
        throw new Error('Could not get job roles.')
    }
}