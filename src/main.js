const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes/route');
const { initializeDatabase } = require('./database/data');

dotenv.config();

const app = express();
const port = process.env.PORT || 3031;

app.use(express.json());

initializeDatabase();

app.use('/todos', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
