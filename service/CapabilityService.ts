const axios = require('axios');
import { Capability } from "../model/Capability";


module.exports.getCapabilities = async function() {
    try {
        const response = await axios.get(process.env.UI_URL + '/api/capabilities')

        return response.data
    } catch (e) {
        throw new Error('Could not get capabilities.')
    }
}