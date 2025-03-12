import axios from "axios";

export default async function handler(req, res) {
    try {
        const response = await axios.post(
            `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
            { page_size: 10 },
            {
                headers: {
                    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
                    "Notion-Version": "2022-06-28",
                    "Content-Type": "application/json",
                },
            }
        );
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching Notion data:", error);
        res.status(500).json({ error: "Failed to fetch data from Notion" });
    }
}
