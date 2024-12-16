## Run this Demo

Step 1: Retell account setup

1. Create [Retell account](retellai.com).
2. Create new agent (multi-prompt) in https://dashboard.retellai.com/agents.
3. Generate api key in https://dashboard.retellai.com/apiKey.

Step 2: Configure environment

1. In root directory, create new `.env` file set the values for the ff:

  - `OPENAI_API_KEY` = OpenAI api key
  - `OPENAI_LLM_MODEL`= OpenAI LLM model to use
  - `RETELL_AI_API_KEY`= Retell AI api key
  - `VITE_RETELL_AI_AGENT_ID`= Retell AI agent id (for frontend use)

Note: These environments are used by `scripts`, `backend` and `frontend` services

Step 3: Step up example backend

1. Go to example_backend folder
2. `npm install`
3. `npm run start` 

Step 4: Step up frontend

1. Go to frontend_demo folder
2. `npm install`
3. `npm run start`

## Retell AI Custom LLM Setup

1. Go to example_backend folder
2. `npm install`
2. `npm run start:ws`

Note: To use it with Retell AI custom LLM agent, you may need to set up a tunnel service to expose it publicly.

## Updating knowledge base

The knowledge base is saved in `example_backend/data.json`. To update it, run the following script:

1. Go to scripts folder.
2. `deno run pull`
