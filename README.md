## Run this Demo

Step 1: Retell account setup

1. Create [Retell account](retellai.com).
2. Create new agent (multi-prompt) in https://dashboard.retellai.com/agents.
3. Generate api key in https://dashboard.retellai.com/apiKey.



Step 2: Configure environment

1. Create new `.env` file set the values for the ff:

  - `RETELL_AI_API_KEY`= Retell AI api key
  - `VITE_RETELL_AI_AGENT_ID`= Retell AI agent id


Step 3: Setup Retell account agent and knowledge base via script
1. Go to `/scripts` directory.
2. Run `deno run sync`. *Note*: This requires [deno installed](https://docs.deno.com/runtime/getting_started/installation/)

Step 4: Step up example backend

1. Go to example_backend folder
2. `npm install`
3. `npm run start` 

Step 5: Step up frontend

1. go to frontend_demo folder
2. `npm install`
3. `npm run start`
