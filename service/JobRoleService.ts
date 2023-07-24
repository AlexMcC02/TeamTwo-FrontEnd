const axios = require('axios');

module.exports.getJobRoles = async function() {
    try {
        const response = await axios.get(process.env.UI_URL + '/api/job_roles')
        return response.data
    } catch (e) {
        return new Error('Could not get job roles.')
    }
}

module.exports.getCapability = async function() {
    try {
        const response = await axios.get(process.env.UI_URL + '/api/capability')
        return response.data
    } catch (e) {
        console.log('Could not get capabilities.')
        throw new Error('Could not get capabilities.')
    }
}