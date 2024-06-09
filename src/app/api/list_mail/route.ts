import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const bodySchema = z.object({
  maxResult: z.number().min(1).max(20),
});
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization");

    const body = await request.json();
    const { maxResult } = bodySchema.parse(body);

    const listResponse = await axios.get(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResult}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const messageId = listResponse.data.messages.map((msg: any) => msg.id);

    const mail = await Promise.all(
      messageId.map(async (id: string) => {
        const emailResponse = await axios.get(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const snippet = emailResponse.data.snippet;
        const subject = emailResponse.data.payload.headers.find(
          (header: any) => header.name === "Subject"
        )?.value;
        const from = emailResponse.data.payload.headers.find(
          (header: any) => header.name === "From"
        )?.value;
        const to = emailResponse.data.payload.headers.find(
          (header: any) => header.name === "To"
        )?.value;

        return {
          id,
          snippet: snippet ? snippet : null,
          subject: subject ? subject : null,
          from: from ? from : null,
        };
      })
    );
    return NextResponse.json({ mail });
  } catch (error) {
    // console.error(error);
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    } else if (error instanceof z.ZodError) {
      console.log("zod error");
      return NextResponse.json({ message: error.errors }, { status: 400 });
    } else {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
