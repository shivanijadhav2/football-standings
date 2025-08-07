const express = require('express');
const cors = require('cors');
const { PORT } = require('./utils/config');
const standingsController = require('./controllers/standingsController');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const swaggerDocument = YAML.load('./openapi.yml');

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/standings', standingsController.getStandings);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});
