const express = require('express');

const app = express();
const port = 80;

app.use(express.json()); // Middleware to parse request body
app.use(express.urlencoded({ extended: true })); //  Parses incoming requests with URL-encoded payloads. This is particularly important for processing form submissions from web pages.
app.use(express.static('public')); // Serve static files from 'public' directory


const nameRoutes = require('./routes/nameRoutes');
app.use(nameRoutes);

app.get('/health', (req, res) => {
    res.status(200).send('Healthy');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
