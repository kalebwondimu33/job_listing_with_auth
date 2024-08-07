"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios, { isAxiosError } from "axios";
import Loading from "@/components/Loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signinSchema } from "@/schema/schema";
import Cookie from "js-cookie";
import { signIn } from "next-auth/react";

interface FormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: FormValues) => {
    const formData = JSON.stringify(data);
    setLoading(true);
    try {
      const response = await axios.post(
        "https://akil-backend.onrender.com/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      if (response.status === 200) {
        console.log(response);
        Cookie.set("hireHubToken", response.data.data.refreshToken);
        router.push("/");
      } else {
        console.log("Something went wrong");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (isAxiosError(err) && err.response) {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center h-[100vh] font-paras scale-95">
      <div>
        <div>
          <h1 className="header text-center mb-5">Welcome back,</h1>
          <button
            className="flex items-center gap-2 text-[#4640DE] border-[#CCCCF5] border-[1px] rounded  py-2 w-[400px] justify-center"
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon />
            <p>Sign Up with Google</p>
          </button>
        </div>

        <div className="flex items-center mt-5 text-sm">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-3 text-gray-500">Or Login with Email</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col my-4">
            <label className="text-[#515B6F] font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              className="inputField"
              {...register("email")}
            />
            <p className="text-red-500 text-center mt-2">
              {errors.email?.message}
            </p>
          </div>

          <div className="flex flex-col my-4">
            <label className="text-[#515B6F] font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="inputField"
              {...register("password")}
            />
            <p className="text-red-500 text-center mt-2">
              {errors.password?.message}
            </p>
          </div>
          {error && (
            <p className="text-red-500 text-center mt-2 mb-5">{error}</p>
          )}

          <button className="bg-[#2D298E] w-[100%] text-white p-2 rounded-full">
            Login
          </button>
        </form>

        <p className="text-sm my-4 font-light">
          Don't have an account?{" "}
          <Link href="/auth/Signup" className="text-[#2D298E] font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="20"
      height="20"
      viewBox="0 0 48 48"
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      ></path>
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      ></path>
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
    </svg>
  );
}

export default SignIn;
