// cmd: deno run sync
import Retell from "npm:retell-sdk";

const rtApiKey = Deno.env.get("RETELL_AI_API_KEY");
const rtAgentId = Deno.env.get("VITE_RETELL_AI_AGENT_ID");

const rtKbName = "tcb_kbs"; // retell knowledge base name for client

if (!rtApiKey || !rtAgentId) throw new Error("Retell env is not set");

const rtClient = new Retell({
  apiKey: rtApiKey,
});

const kbs = await rtClient.knowledgeBase.list();

let kbId = kbs.find(
  (kb) => kb.knowledge_base_name === rtKbName
)?.knowledge_base_id;

if (!kbId) {
  // create kbs
  const kbCreateResult = await rtClient.knowledgeBase.create({
    knowledge_base_name: rtKbName,
    enable_auto_refresh: true,
    knowledge_base_urls: [
      "https://thecolorbarph.com/services/",
      "https://thecolorbarph.com/contact/",
      "https://thecolorbarph.com/the-color-bar-salon/book-an-appointment/",
    ],
  });
  kbId = kbCreateResult.knowledge_base_id;
}

if (!kbId) throw new Error("Knowledge base could not be created");

const rtAgent = await rtClient.agent.retrieve(rtAgentId);

let llmId = "";

if ("llm_id" in rtAgent.response_engine)
  llmId = rtAgent.response_engine?.llm_id;

if (!llmId) throw new Error("LLM id not set in agent");

const res = await rtClient.llm.update(llmId, { knowledge_base_ids: [kbId] });

throw new Error(JSON.stringify({ res }, null, 2));
