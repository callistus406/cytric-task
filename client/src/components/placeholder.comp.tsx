import useCookie from "@/hooks/useCookie";
import { CloseModalIcon, IconWarning, LogoutIcon } from "@/icons/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

const EmptyMovieList = () => {
  const [clicked, setClicked] = useState(false);

  const { deleteToken, getAuthToken } = useCookie();

  const router = useRouter();

  const handleLogout = (e: any) => {
    e.preventDefault();
    deleteToken();
    toast.success("Logout successful");
    router.push("/login");
  };
  return (
    <>
      <div className="flex items-center space-x-4 w-full">
        <button
          onClick={() => setClicked(true)}
          className="flex items-center px-4 gap-x-3 md:gap-x-4 py-2"
        >
          <h4 className="text-lg text-slate-50 ml-auto">Logout</h4>
          <LogoutIcon className="w-8 h-8" />
        </button>
      </div>
      <div className="flex items-center justify-center min-h-screen ">
        <div
          tabIndex={-1}
          className={`${
            clicked ? "block" : "hidden"
          } fixed top-5 inset-0 flex justify-center z-50`}
        >
          <div className="relative w-full h-full max-w-2xl md:h-auto">
            <div className="relative bg-gray-500 rounded-lg shadow-custom2">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={() => setClicked(false)}
              >
                <CloseModalIcon className="w-6 h-6 font-bold text-white-500" />
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <IconWarning className="mx-auto mb-4 text-white w-14 h-14 " />
                <h3 className="mb-5 text-lg font-normal text-white">
                  Are you sure you want to Logout?
                </h3>
                <div className="flex gap-12 justify-center">
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={() => setClicked(false)}
                    type="button"
                    className="bg-primary  text-white hover:bg-primary-100 focus:ring-4 focus:outline-none rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center">
            <h1 className="text-xl font-medium text-white">
              Your movie list is empty
            </h1>
            <Link href="/dashboard/movies/create">
              <button className="mt-4 px-6 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
                Add a new movie
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyMovieList;
