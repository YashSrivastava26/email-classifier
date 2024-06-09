import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization");
    console.log(token);

    const res = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return NextResponse.json({
      name: res.data.name,
      picture: res.data.picture,
      email: res.data.email,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data);
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    } else {
      console.log(error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
