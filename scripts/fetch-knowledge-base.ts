// cmd: deno run pull
import OpenAI from "npm:openai";
import { convert } from "npm:html-to-text";
import { parse } from "npm:node-html-parser";
import fs from "node:fs";
import path from "node:path";

const dirname = import.meta.dirname!;
const backendDir = path.join(dirname, "../example_backend");

const apiKey = Deno.env.get("OPENAI_API_KEY")!;
const llmModel = "gpt-4o";
// const llmModel =  Deno.env.get("OPENAI_LLM_MODEL")!;

const client = new OpenAI({
  apiKey,
});

const prompt = async (txt: string) => {
  const res = await client.chat.completions.create({
    model: llmModel,
    messages: [
      {
        role: "user",
        content: txt,
      },
    ],
    max_tokens: 10000,
  });
  const content = res.choices?.[0]?.message.content;
  return content;
};

async function fetchServices() {
  const fetchRes = await fetch("https://thecolorbarph.com/services/");
  const html = await fetchRes.text();

  const root = parse(html);

  async function getServicesFromTable(html: string) {
    const tableRawHtml = html.replaceAll(/\t/g, "").replaceAll(/\n/g, "");

    const content =
      await prompt(`Convert the html below to simple text for all salon service with prices:
  
  ${tableRawHtml}
  `);

    return content;
  }

  let services = "";
  for (const el of root.querySelectorAll(".tb-services")) {
    const content = await getServicesFromTable(el.outerHTML);
    services += `
${content}
`;
  }

  return services;
}

async function fetchStoreLocationsAndDetails() {
  const fetchRes = await fetch("https://thecolorbarph.com/contact/");
  const html = await fetchRes.text();
  const txt = convert(html);

  const content =
    await prompt(`Extract all store locations details including operation hours from the text below. Dont include extraction details from the response.

${txt}
`);
  return content;
}

async function fetchBookingFormDetails() {
  const fetchRes = await fetch(
    "https://thecolorbarph.com/the-color-bar-salon/book-an-appointment/"
  );
  const txt = await fetchRes.text();

  const content =
    await prompt(`Extract all booking form input details from the text below. Dont include extraction details from the response.

  ${txt}
  `);

  return content;
}

const bookingFormInputs = await fetchBookingFormDetails();
const branches = await fetchStoreLocationsAndDetails();
const services = await fetchServices();

const data = {
  services,
  branches,
  bookingFormInputs,
};

// write backend data file
fs.writeFileSync(
  path.join(backendDir, "data.json"),
  JSON.stringify(data, null, 2),
  "utf-8"
);

console.info("Done fetch knowledge base!");
