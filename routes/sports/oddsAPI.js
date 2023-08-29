const axios = require('axios');

class OddsAPI {
    constructor() {
        this.apiKey = 'a36e3fddad1432819488901ccfce1523';
        this.apiUrl = 'https://api.the-odds-api.com/v4';
    }

    async getSports() {
        try {
            const response = await axios.get(`${this.apiUrl}/sports`, {
                params: { apiKey: this.apiKey }
            });
            const oddsData = {
                data: response.data,
                remainingRequests: response.headers['x-requests-remaining'],
                usedRequests: response.headers['x-requests-used']
            };
            return oddsData;
        
        } catch (error) {
            throw error.response.data;
        }
    }

    async getOdds(sportKey, regions, markets, oddsFormat, dateFormat) {
        try {
            const response = await axios.get(`${this.apiUrl}/sports/${sportKey}/odds`, {
                params: {
                    apiKey: this.apiKey,
                    regions,
                    markets,
                    oddsFormat,
                    dateFormat,
                }
            });
            const oddsData = {
                data: response.data.data,
                remainingRequests: response.headers['x-requests-remaining'],
                usedRequests: response.headers['x-requests-used']
            };
            return oddsData;
        } catch (error) {
            throw error.response.data;
        }
    }
}

module.exports = OddsAPI;
