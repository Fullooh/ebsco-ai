import { openai } from '../config/openAIConfig'
import { NextResponse } from 'next/server';

export async function POST(request) {
    const result = await request.json();
    // console.log(result);
    const prompt = result.prompt;
    // console.log(prompt);
  
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }
  
    try {
      // Make a request to OpenAI's API
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Specify the appropriate model, "gpt-3.5-turbo" for chat-based models
        messages: [{ role: "user", content: prompt }],
      });
  
      return NextResponse.json({ text: response.choices[0].message.content.trim() }, { status: 200 });
    } catch (error) {
      console.error("Error with OpenAI API:", error);
      return NextResponse.json({ error: "An error occurred while processing your request." }), { status: 500 };
    }
  }