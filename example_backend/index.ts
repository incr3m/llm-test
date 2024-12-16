import express from "express";
import axios from "axios";
import cors from "cors";
import { RETELL_API_KEY, PORT } from "./config";

const app = express();
const port = PORT;

// Middleware to parse JSON bodies
app.use(cors());

app.use(express.json());

app.post("/create-web-call", async (req, res) => {
  const { agent_id, metadata, retell_llm_dynamic_variables } = req.body;

  // Prepare the payload for the API request
  const payload: any = { agent_id };

  // Conditionally add optional fields if they are provided
  if (metadata) {
    payload.metadata = metadata;
  }

  if (retell_llm_dynamic_variables) {
    payload.retell_llm_dynamic_variables = retell_llm_dynamic_variables;
  }

  try {
    const response = await axios.post(
      "https://api.retellai.com/v2/create-web-call",
      payload,
      {
        headers: {
          Authorization: `Bearer ${RETELL_API_KEY}`, // Replace with your actual Bearer token
          "Content-Type": "application/json",
        },
      }
    );

    res.status(201).json(response.data);
  } catch (error) {
    console.error(
      "Error creating web call:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to create web call" });
  }
});

const startServer = async () => {
  app.listen(port, () => {
    console.log(`listening on port ${port}!`);
  });
};

startServer();
