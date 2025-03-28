import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "node:fs";
import mime from "mime-types";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({ generationConfig, history: [] });
    const result = await chatSession.sendMessage(prompt);

    // Extract response text
    const responseText = result.response.text();

    // Handle file output if present
    const candidates = result.response.candidates;
    for (let candidateIndex = 0; candidateIndex < candidates.length; candidateIndex++) {
      for (let partIndex = 0; partIndex < candidates[candidateIndex].content.parts.length; partIndex++) {
        const part = candidates[candidateIndex].content.parts[partIndex];
        if (part.inlineData) {
          try {
            const filename = `output_${candidateIndex}_${partIndex}.${mime.extension(part.inlineData.mimeType)}`;
            fs.writeFileSync(filename, Buffer.from(part.inlineData.data, "base64"));
            console.log(`Output written to: ${filename}`);
          } catch (err) {
            console.error("File Write Error:", err);
          }
        }
      }
    }

    return responseText;
  } catch (error) {
    console.error("Error in Gemini API:", error);
    throw new Error("Failed to generate response");
  }
}

export { run };
