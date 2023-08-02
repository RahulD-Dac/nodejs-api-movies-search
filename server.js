import express from "express";
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'; // Import specific functions from the 'path' module

const app = express();

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, 'public'))); // Use 'join' instead of 'path.join'

// Set up a route for the homepage
app.get("/", (req, res) => {
         res.sendFile(join(__dirname,  'index.html')); // Use 'join' instead of 'path.join'
});

// Your existing /search route
app.get("/search", (req, res) => {
         const { title } = req.query;
         const OMDB_API_KEY = "5c42cfe";

         fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}`)
                  .then((response) => response.json())
                  .then((data) => res.json(data))
                  .catch((error) => res.status(500).json({ error: "Error fetching data" }));
});

app.listen(3000, () => {
         console.log("Server is running on http://localhost:3000");
});
