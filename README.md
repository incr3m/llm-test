# Retell Frontend Demo using our JS Web Client SDK (React/Node.js)

## Context

This demo illustrates a quick setup for integrating a frontend with a backend
using React and Node.js. It showcases using **our [JS Client SDK](https://github.com/adam-team/retell-client-js-sdk)**.

## Setup Tutorial

Check out our [doc](https://docs.retellai.com/make-calls/web-call) for a
step-by-step guide on setting up Web Call.

## Run this Demo

Step 1: Retell account setup

1. Create [Retell account](retellai.com).
2. Create new agent (multi-prompt) in https://dashboard.retellai.com/agents.
3. Generate api key in https://dashboard.retellai.com/apiKey.

Step 2: Configure environment

1. Create new `.env` file set the values for the ff:

  - `RETELL_AI_API_KEY`=retell api key
  - `VITE_RETELL_AI_AGENT_ID`=retell agent id


Step 3: Step up example backend

1. Go to example_backend folder

2. `npm install`

4. `npm run start` 


Step 4: Step up frontend

1. go to frontend_demo folder

2. `npm install`

4. `npm run start`
