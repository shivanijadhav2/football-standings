const standingsService = require('../services/standingService');

const getStandings = async (req, res) => {
    const { countryName, leagueName, teamName } = req.query;

    if (!countryName || !leagueName || !teamName) {
        return res.status(400).json({ error: 'Missing required query parameters: countryName, leagueName, and teamName.' });
    }

    try {
        const standingsData = await standingsService.getStandings(countryName, leagueName, teamName);

        // HATEOAS implementation
        const responseWithHATEOAS = {
            ...standingsData,
            _links: {
                self: { href: `/api/standings?countryName=${countryName}&leagueName=${leagueName}&teamName=${teamName}` },
                all_league_standings: { href: `/api/standings?countryName=${countryName}&leagueName=${leagueName}` },
            },
        };

        res.status(200).json(responseWithHATEOAS);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getStandings,
};
