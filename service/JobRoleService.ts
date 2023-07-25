const axios = require('axios');

module.exports.getJobRoles = async function() {
    try {
        const response = await axios.get(process.env.UI_URL + '/api/job_roles')
        return response.data
    } catch (e) {
        return new Error('Could not get job roles.')
    }
}

module.exports.getBandLevels = async function() {
    try {
        const response = await axios.get(process.env.UI_URL + '/api/band_levels')
        return response.data 
    } catch(e) {
        return new Error('Could not get band levels.')
    }
}