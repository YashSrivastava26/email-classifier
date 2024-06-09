"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Home() {
  const [openAIKey, setOpenAIKey] = useState<string>("");
  const baseUrl = process.env.VERCEL_URL;
  
  const oauthSignIn = () => {
    localStorage.setItem("openAIKey", openAIKey);

    // Define the OAuth 2.0 endpoint parameters
    const params = {
      client_id:
        "363487042594-3a7dmgn0k0t3ae6dc5hri4k8bkmovdee.apps.googleusercontent.com",
      redirect_uri: baseUrl ? baseUrl : "http://localhost:3000/home",
      response_type: "token",
      scope:
        "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.readonly ",
      state: "pass-through-value",
      include_granted_scopes: "true",
    };

    // Create the query string from parameters
    const queryString = new URLSearchParams(params).toString();

    // Redirect to Google's OAuth 2.0 server
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${queryString}`;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-center gap-4 max-w-screen-sm">
        <Button
          onClick={oauthSignIn}
          className="border border-gray-300 text-gray-700 hover:bg-gray-100 w-full"
          disabled={openAIKey.length === 0}
        >
          <FcGoogle className="h-6 w-6 mr-4" />
          Sign in with Google
        </Button>
        <Input
          placeholder="open ai api key"
          type="text"
          value={openAIKey}
          onChange={(e) => setOpenAIKey(e.target.value)}
          className="placeholder:text-black/70 border-black/20"
        />

        <span className="text-red-500 text-sm">
          Please type your OpenAI API key before signing in with Google
        </span>
      </div>
    </main>
  );
}
