"use client";
import React, { useEffect, useState } from "react";

import HomeNav from "@/components/HomeNav";
import { emailType } from "@/types/emailType";
import axios from "axios";
import { useRouter } from "next/navigation";
import { userType } from "@/types/userType";
import HomeHero from "@/components/HomeHero";

const Page = () => {
  const [token, setToken] = useState<string | null>(null);
  const [emailList, setEmailList] = useState<emailType[]>([]);
  const [user, setUser] = useState<userType | null>(null);
  const [maxResults, setMaxResults] = useState<number>(1);
  const router = useRouter();

  // Fetch access token from URL
  useEffect(() => {
    const getAccessTokenFromUrl = () => {
      const hash = window.location.hash.substring(1); // Remove the '#' at the start
      const params = new URLSearchParams(hash);
      return params.get("access_token"); // Extract the access token
    };

    // Capture the access token from the URL
    const accessToken = getAccessTokenFromUrl();

    if (accessToken) {
      localStorage.setItem("authinfo", accessToken);
    }

    setToken(localStorage.getItem("authinfo"));
  }, []);

  const fetchUserInfo = async () => {
    if (token) {
      axios
        .get("/api/user_info", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          localStorage.removeItem("authinfo");
          console.error("Unauthorized access. Redirecting to login.");
          router.push("/");
        });
    }
  };

  const fetchEmails = async () => {
    if (token) {
      axios
        .post(
          "/api/list_mail",
          {
            maxResult: maxResults,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          setEmailList(res?.data?.mail);
        })
        .catch((error) => {
          localStorage.removeItem("authinfo");
          console.error("Unauthorized access. Redirecting to login.");
          router.push("/");
        });
    }
  };

  // Fetch user info
  useEffect(() => {
    fetchUserInfo();
  }, [token]);

  // Fetch emails
  useEffect(() => {
    fetchEmails();
  }, [token, maxResults]);

  return (
    <div className=" h-screen max-w-5xl  mx-auto overflow-hidden">
      <div className="flex flex-col items-center px-8 h-full">
        <HomeNav user={user} />
        <div className="h-0 w-full border border-slate-500/50 mt-3" />

        <HomeHero
          setEmailList={setEmailList}
          maxResults={maxResults}
          setMaxResults={setMaxResults}
          emailList={emailList}
        />
      </div>
    </div>
  );
};

export default Page;
