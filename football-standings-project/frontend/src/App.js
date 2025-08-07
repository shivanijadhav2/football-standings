import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // We'll create this file next

function App() {
    const [countryName, setCountryName] = useState('');
    const [leagueName, setLeagueName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [standingData, setStandingData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setStandingData(null);

        // Ensure backend is running on port 8080
        const API_URL = 'http://localhost:8080/api/standings';

        try {
            const response = await axios.get(API_URL, {
                params: {
                    countryName,
                    leagueName,
                    teamName,
                },
            });

            setStandingData(response.data);
            console.log(response.data); // For debugging
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error || 'An unexpected error occurred.');
            } else if (err.request) {
                setError('No response from the server. The backend service may be down.');
            } else {
                setError('Error: ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Football Standing Finder</h1>
                <p>Enter details to find a team's league position.</p>
            </header>

            <main>
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Country Name (e.g., England)"
                        value={countryName}
                        onChange={(e) => setCountryName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="League Name (e.g., Premier League)"
                        value={leagueName}
                        onChange={(e) => setLeagueName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Team Name (e.g., Chelsea)"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Searching...' : 'Find Standing'}
                    </button>
                </form>

                {error && <div className="error-message">Error: {error}</div>}

                {standingData && (
                    <div className="results-container">
                        <h2>Results</h2>
                        <p><strong>Country ID & Name:</strong> ({standingData.country_id}) - {standingData.country_name}</p>
                        <p><strong>League ID & Name:</strong> ({standingData.league_id}) - {standingData.league_name}</p>
                        <p><strong>Team ID & Name:</strong> ({standingData.team_id}) - {standingData.team_name}</p>
                        <p><strong>Overall League Position:</strong> {standingData.overall_league_position}</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
