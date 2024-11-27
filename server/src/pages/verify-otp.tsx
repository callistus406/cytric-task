import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { verifyOtp } from "@/core/axios.core";
import { IVerifyOtp } from "@/@types/type";

const OTPForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IVerifyOtp>();
  const [currentState, setCurrentState] = useState<
    "init" | "mutating" | "error" | "success"
  >("init");
  const router = useRouter();
  const [email, setEmail] = useState("");
  useEffect(() => {
    const value = sessionStorage.getItem("mv_reg");
    if (!value) {
      toast.error(
        "Unable to retrieve your information please request for a new token"
      );
      router.push("/request-otp");
    } else {
      setEmail(value);
    }
  }, []);

  const otpMutation = useMutation({
    mutationFn: (data: IVerifyOtp) => verifyOtp(data),
    onSuccess: () => {
      toast.success("OTP Verified Successfully");
      setCurrentState("success");
      router.push("/login");
    },
    onError: (error: any) => {
      const res = error.response;
      toast.error(res?.data?.error || "Invalid OTP. Please try again.");
      setCurrentState("error");
    },
    onMutate: () => {
      setCurrentState("mutating");
    },
  });

  const onSubmit: SubmitHandler<IVerifyOtp> = (data) => {
    otpMutation.mutate({ ...data, email: email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-4xl font-bold text-center text-white mb-6">
          Enter OTP
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm text-gray-300 mb-1">
              One-Time Password
            </label>
            <input
              id="otp"
              type="text"
              maxLength={6}
              autoComplete="off"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              {...register("otp", {
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "OTP must be a 6-digit number",
                },
                required: "OTP is required",
              })}
              placeholder="Enter 6-digit OTP"
            />
            {errors.otp && (
              <div className="text-red-500 text-sm">{errors.otp.message}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-green-500 text-white text-md font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            {currentState === "mutating" ? "Verifying..." : "Submit OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPForm;
