"use client";
import React, { Component, useEffect, useState } from "react";
import OTP from "./OTP";
import axios, { isAxiosError } from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (pin: string) => {
    const userEmail = localStorage.getItem("userEmail");
    const formData = JSON.stringify({
      email: userEmail,
      OTP: pin.toString(),
    });
    console.log(formData);
    try {
      const response = await axios.post(
        "https://akil-backend.onrender.com/verify-email",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        console.log(response);
        Cookie.set("hireHubToken", response.data.data.refreshToken);
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      if (isAxiosError(err) && err.response) {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-[100vh] font-paras scale-95 w-[40px] mr-auto ml-auto">
        <div>
          <div>
            <h1 className="header text-center mb-12">Verify Email</h1>
          </div>

          <div className="flex items-center mt-5 text-sm">
            <p className=" leading-[22.4px] text-[#7C8493]">
              We've sent a verification code to the email address you provided.
              To complete the verification process, please enter the code here.
            </p>
          </div>

          <form className="mt-12">
            <OTP onComplete={handleSubmit} />
            <p className="text-center text-sm my-2">
              You can request to{" "}
              <button
                className="text-[#2D298E] font-semibold disabled:text-slate-500"
                disabled
              >
                Resend code
              </button>{" "}
              in{" "}
            </p>
            <p className="text-center text-sm my-2 text-[#2D298E] font-semibold mb-12">
              {formatTime(timeLeft)}
            </p>

            {error && (
              <p className="text-red-500 text-center mt-2 mb-5">{error}</p>
            )}
            <button
              type="submit"
              className="bg-[#2D298E] disabled:bg-opacity-30 w-[100%] text-white p-2 rounded-full disabled:bg-[#4640DE] disabled:cursor-not-allowed"
              disabled
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
