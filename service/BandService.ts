const axios = require('axios');
import { Band } from "../model/Band";


module.exports.getBands = async function() {
    try {
        const response = await axios.get('http://localhost:8080/api/band')
        
        return response.data
    } catch (e) {
        return new Error('Could not get Band Levels.')
    }
}