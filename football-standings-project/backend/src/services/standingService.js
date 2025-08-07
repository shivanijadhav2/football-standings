const axios = require('axios');
const { API_FOOTBALL_KEY, OFFLINE_MODE, API_URL } = require('../utils/config');
const { getFromCache, setToCache } = require('../utils/cache');

const getStandings = async (countryName, leagueName, teamName) => {
    const cacheKey = `${countryName}-${leagueName}-${teamName}`;

    if (OFFLINE_MODE) {
        const cachedData = getFromCache(cacheKey);
        if (cachedData) {
            console.log('Serving from cache (offline mode)');
            return cachedData;
        } else {
            throw new Error('Service is in offline mode and data is not available for this query.');
        }
    }

    const cachedData = getFromCache(cacheKey);
    if (cachedData) {
        console.log('Serving from cache (online mode)');
        return cachedData;
    }

    try {
        const response = await axios.get(API_URL, {
            params: {
                APIkey: API_FOOTBALL_KEY,
                country_name: countryName,
                league_name: leagueName,
                team_name: teamName,
            },
        });

        const standings = response.data;

        if (!Array.isArray(standings) || standings.length === 0) {
            throw new Error('Standings data not found. Please check country, league, and team names.');
        }

        const teamStanding = standings.find(s => s.team_name.toLowerCase() === teamName.toLowerCase());

        if (!teamStanding) {
            throw new Error('Team not found in the specified league standings.');
        }

        const result = {
            country_id: teamStanding.country_id,
            country_name: teamStanding.country_name,
            league_id: teamStanding.league_id,
            league_name: teamStanding.league_name,
            team_id: teamStanding.team_id,
            team_name: teamStanding.team_name,
            overall_league_position: teamStanding.overall_league_position,
        };

        // Cache the result for future use
        setToCache(cacheKey, result);
        return result;

    } catch (error) {
        console.error('Error fetching data:', error.message);
        // If the API call fails, try to serve from cache if available.
        const cachedDataFallback = getFromCache(cacheKey);
        if (cachedDataFallback) {
            console.log('API failed, serving from cache as a fallback.');
            return cachedDataFallback;
        }
        throw new Error('Failed to retrieve standings. Underlying API might be unavailable.');
    }
};

module.exports = { getStandings };
