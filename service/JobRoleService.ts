const axios = require('axios');

module.exports.getJobRoles = async function() {
    try {
        const response = await axios.get(process.env.UI_URL + '/api/job_roles')
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

module.exports.deleteJobRole = async function (id: number) {
    try {
      const response = await axios.delete(process.env.UI_URL + '/api/job_roles/' + id);
      return response.data;
    } catch (error) {
      throw new Error('Could not delete job role.');
    }
  };