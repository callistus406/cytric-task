import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../components/context/authProvider"; // Use the AuthContext
import { requestOtp } from "@/core/axios.core";

type State = "init" | "mutating" | "error" | "success";
interface IRequestOtp {
  email: string;
}

const RequestOtp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRequestOtp>();
  const [showPassword, setShowPassword] = useState(false);
  const [currentState, setCurrentState] = useState<State>("init");
  const router = useRouter();
  const { setUser } = useAuth();


  const postMutation = useMutation({
    mutationFn: (data: {email:string}) => requestOtp(data.email),
    onSuccess: (res: any) => {
      const token = res.payload.token;

      Cookies.set("authToken", token, { expires: 1 });

      router.push("/verify-otp");

      toast.success(res.payload || "Request sent");
      setCurrentState("success");
    },
    onError: (error: any) => {
      const res = error.response;
      console.log(res.response);
      toast.error(res.data.error || "Something went wrong");
      setCurrentState("error");
    },
    onMutate: () => {
      setCurrentState("mutating");
    },
  });

  const onSubmit: SubmitHandler<IRequestOtp> = (data) => {
    postMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-4xl font-bold text-center text-white mb-6">
         Request OTP
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              {...register("email", {
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Invalid email address",
                },
                required: "Email is required",
              })}
              placeholder="example@gmail.com"
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}
          </div>
        
          <button
            type="submit"
            className="w-full px-4 py-3 bg-green-500 text-white text-md font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            {currentState === "mutating" ? "Logging in..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestOtp;
