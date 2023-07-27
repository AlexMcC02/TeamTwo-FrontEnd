const axios = require('axios');
import { JobRole } from "../model/JobRole";


module.exports.getJobRoles = async function() {
    try {
        const response = await axios.get('http://localhost:8080/api/job_roles')
       // console.log(response.data)
        return response.data
    } catch (e) {
        throw new Error('Could not get job roles.')
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


//The service layer is responsible for communicating with the backend API.


//these functions serve as wrappers around Axios HTTP requests, 
// allowing the application to fetch job roles from the API (getJobRoles) 
// and create new job roles by sending data to the API (createJobRole). 
// The functions encapsulate the error handling logic and 
// throw custom errors if something goes wrong during the API requests.

