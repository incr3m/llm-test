import { describe, expect, it } from "vitest";
import { FunctionCallingLlmClient } from "./llm_openai_func_call";
import { ResponseResponse } from "../types";

describe("Custom LLM agent", () => {
  const llmClient = new FunctionCallingLlmClient();
  const prompt = (text: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const responses: ResponseResponse[] = [];
        await llmClient.DraftResponse(
          {
            response_id: 1,
            interaction_type: "response_required",
            transcript: [
              {
                role: "agent",
                content: "Hey there, how can I help you",
              },
              {
                role: "user",
                content: text,
              },
            ],
          },
          {
            send: (data: string) => {
              const resp: ResponseResponse = JSON.parse(data);
              if (resp.content_complete) {
                const txt = responses
                  .map((response) => response.content)
                  .join("");
                resolve(txt);
              } else {
                responses.push(resp);
              }
            },
          } as any
        );
      } finally {
        reject("Something went wrong");
      }
    });
  };

  it("T1: should know about services offered", async () => {
    const response = await prompt("What services do you offer?");
    console.log(`>>ws/llm_openai_func_call.test::T1: `, response); //TRACE
    expect(response).toBeTruthy();
  });

  it("T2: should know about branches", async () => {
    const response = await prompt("Where are your store locations?");
    console.log(`>>ws/llm_openai_func_call.test::T2: `, response); //TRACE
    expect(response).toBeTruthy();
  });

  it("T3: should be able to book appointments", async () => {
    const response = await prompt("How to book appointments?");
    console.log(`>>ws/llm_openai_func_call.test::T3: `, response); //TRACE
    expect(response).toBeTruthy();
  });
});
