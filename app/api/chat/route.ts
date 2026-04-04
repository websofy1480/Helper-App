import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are an assistant for RSVI NGO helping visually impaired people.",
      },
      { role: "user", content: message },
    ],
  });

  return Response.json({
    reply: response.choices[0].message.content,
  });
}
