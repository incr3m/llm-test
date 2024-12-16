// cmd: deno run sync
import Retell from "npm:retell-sdk";
import config from "./config.ts";

const rtApiKey = Deno.env.get("RETELL_AI_API_KEY");
const rtAgentId = Deno.env.get("VITE_RETELL_AI_AGENT_ID");

const rtKbName = "tcb_kbs"; // retell knowledge base name for client

if (!rtApiKey || !rtAgentId) throw new Error("Retell env is not set");

const rtClient = new Retell({
  apiKey: rtApiKey,
});

// setup knowledge base
// create or update existing knowledge base
async function setupKb() {
  const kbs = await rtClient.knowledgeBase.list();

  let kbId = kbs.find(
    (kb) => kb.knowledge_base_name === rtKbName
  )?.knowledge_base_id;

  if (!kbId) {
    // create kbs
    const kbCreateResult = await rtClient.knowledgeBase.create({
      knowledge_base_name: rtKbName,
      enable_auto_refresh: true,
      knowledge_base_urls: config.kbUrls,
    });
    kbId = kbCreateResult.knowledge_base_id;
  }

  if (!kbId) throw new Error("Knowledge base could not be created");

  return kbId;
}

// update agent prompt config
async function setupAgent(agentId: string, kbId: string) {
  const rtAgent = await rtClient.agent.retrieve(agentId);

  let llmId = "";

  if ("llm_id" in rtAgent.response_engine)
    llmId = rtAgent.response_engine?.llm_id;

  if (!llmId) throw new Error("LLM id not set in agent");

  await rtClient.llm.update(llmId, {
    knowledge_base_ids: [kbId],
    general_prompt: config.generalPrompt,
    begin_message: null,
  });
}

console.log("Sync starting...");

const rtKbId = await setupKb();
await setupAgent(rtAgentId, rtKbId);

console.log("Sync done!");
