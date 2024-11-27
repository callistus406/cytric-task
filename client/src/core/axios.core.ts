import { ICreateMovie, IUpdateMovie, IVerifyOtp } from "@/@types/type";
import axios from "axios";
import Cookies from "../../node_modules/@types/js-cookie";
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_ROOT,
  timeout: 100000,
});

export const createMovie = async (data: ICreateMovie, token: string) => {
  const response = await axiosInstance.post("/movie", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const findMovies = async (page: number, size: number, token: string) => {
  const response = await axiosInstance.get(
    `movies?page=${page}&limit=${size}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post(`/sign-up`, data, {});
  return response.data;
};

export const verifyOtp = async (data: IVerifyOtp) => {
  const response = await axiosInstance.post(`/verify-otp`, data, {});
  return response.data;
};
export const requestOtp = async (email: string) => {
  const response = await axiosInstance.post(`/request-otp`, { email }, {});
  return response.data;
};

export const deleteMovie = async (id: string, token: string) => {
  const response = await axiosInstance.delete(`/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const findMovie = async (id: string, token: string) => {
  const response = await axiosInstance.get(`/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export function getLoginToken() {
  return Cookies.get("authToken");
}

export function removeLoginToken() {
  Cookies.remove("authToken");
}

export async function login(data: any) {
  const response = await axiosInstance.post("/sign-in", data);

  return response.data;
}
export async function updateMovie(
  data: IUpdateMovie,
  id: string,
  token: string
) {
  const response = await axiosInstance.patch(`/update/movie/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
