 
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Notion API Configuration
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_URL = `https://api.notion.com/v1/databases/${DATABASE_ID}/query`;

// Fetch data from Notion
app.get("/notion-data", async (req, res) => {
    try {
        const response = await axios.post(
            NOTION_URL,
            { page_size: 10 },  // Adjust the number of results if needed
            {
                headers: {
                    Authorization: `Bearer ${NOTION_API_KEY}`,
                    "Notion-Version": "2022-06-28",
                    "Content-Type": "application/json",
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching Notion data:", error);
        res.status(500).json({ error: "Failed to fetch data from Notion" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
