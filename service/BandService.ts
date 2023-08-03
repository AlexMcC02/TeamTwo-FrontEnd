const axios = require('axios');
import { Band } from "../model/Band";


module.exports.getBands = async function() {
    try {
        const response = await axios.get(process.env.UI_URL + '/api/band')
        
        return response.data
    } catch (e) {
        return new Error('Could not get Band Levels.')
    }
}