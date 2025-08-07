require('dotenv').config();

module.exports = {
    API_FOOTBALL_KEY: process.env.API_FOOTBALL_KEY,
    OFFLINE_MODE: process.env.OFFLINE_MODE === 'true',
    PORT: process.env.PORT || 8080,
    API_URL: 'https://apiv2.apifootball.com/?action=get_standings'
};
