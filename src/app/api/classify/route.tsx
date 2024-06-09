import { emailTypeSchema } from "@/types/emailType";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const bodySchema = z.object({
  api_key: z.string(),
  mail: emailTypeSchema.array(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { api_key, mail } = bodySchema.parse(body);
    const openai = new OpenAI({
      apiKey: api_key,
    });
    const email = JSON.stringify(mail);

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `please add a categoty to each  ${email} (category should only be one of the following:  "Important", "Promotional", "Social", "Marketing", and "Spam") output must be an array of json objects in same sequence in the following format: { "id": "id of mail", "category": "category of mail" }`,
        },
      ],
      model: "gpt-4o",
    });

    let content;
    if (completion.choices[0].message.content !== null) {
      content = JSON.parse(completion.choices[0].message.content);
    } else {
      // Handle the null case appropriately,
      return NextResponse.json({
        error: "Failed to get valid response (null)",
      });
    }
    console.log(content);

    if (!Array.isArray(content)) {
      // Handle the case where content is still not an array
      return NextResponse.json({
        error: "Failed to get valid response",
      });
    }
    const category = content.map((item) => item.category);
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(error);
  }
}
