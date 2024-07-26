import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
//   baseURL: "http://127.0.0.1:5000/v1/",
//   apiKey: "sk-111111111111111111111111111111111111111111111111",
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: "You are a professional image describer. You successfully provide an illustrative description of an image \
        from a given paragraph. When given a bunch of words and phrases describing an image, you can imagine and describe \
        the original image in well-organised sentences of up to 100 words based on the given paragraph."
      },
    ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
};
