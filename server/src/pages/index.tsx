import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../components/context/authProvider"; // Use the AuthContext
import { createUser } from "@/core/axios.core";

type State = "init" | "mutating" | "error" | "success";
interface IReg {
    email: string;
    name: string;
  password: string;
}

const RegisterForm = () => {
  const {
    register,
    formState: { errors, },
      handleSubmit,
    getValues
  } = useForm<IReg>();
  const [showPassword, setShowPassword] = useState(false);
  const [currentState, setCurrentState] = useState<State>("init");
  const router = useRouter();
  const { setUser } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const postMutation = useMutation({
    mutationFn: (data: IReg) => createUser(data),
    onSuccess: (res: any) => {
      const token = res.payload.token;

      Cookies.set("authToken", token, { expires: 1 });

      router.push("/verify-otp");

      toast.success(res.payload);
        setCurrentState("success");
        
        sessionStorage.setItem("mv_reg",getValues("email") );

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

  const onSubmit: SubmitHandler<IReg> = (data) => {
    postMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-4xl font-bold text-center text-white mb-6">
          Sign up
        </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
            <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
              Name
            </label>
            <input
              id="name"
              type="name"
              autoComplete="name"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              {...register("name", {
                
                  required: true,
                  minLength: 3,
              
              })}
              placeholder="John smit"
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.name?.message}</div>
            )}
          </div>
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
              <div className="text-red-500 text-sm">{errors.email?.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm text-gray-300 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 text-gray-300"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <div className="text-red-500 text-sm">
                {errors.password.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-[#2BD17E] text-white text-md font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            {currentState === "mutating" ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
