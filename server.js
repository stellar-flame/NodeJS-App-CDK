const express = require('express');

//const cors = require('cors'); // If you're using CORS
const app = express();
const port = 80;

//app.use(cors()); // Use CORS if needed

app.use(express.json()); // Middleware to parse request body
app.use(express.urlencoded({ extended: true })); //  Parses incoming requests with URL-encoded payloads. This is particularly important for processing form submissions from web pages.
app.use(express.static('public')); // Serve static files from 'public' directory

app.post('/submit-name', async (req, res) => {
    try {
        const { name } = req.body;
        //res.send(`Hello ${name}`);
        res.send(generateReply(name));
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error saving your name.");
    }
});

app.get('/health', (req, res) => {
    res.status(200).send('Healthy');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

function generateReply(name){
    const htmlContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Thank You</title>
                </head>
                <body>
                    <h1>Hello ${name}</h1>
                </body>
                </html>
            `;
    return htmlContent;
}
