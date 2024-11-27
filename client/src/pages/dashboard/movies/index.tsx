import ErrorScreen from "@/components/error.comp";
import { DeleteResource } from "@/components/modal.comp";
import EmptyMovieList from "@/components/placeholder.comp";
import { deleteMovie, findMovies } from "@/core/axios.core";
import useCookie from "@/hooks/useCookie";
import {
  AddIcon,
  CloseModalIcon,
  DeleteIcon,
  EditIcon,
  IconWarning,
  LoadingScreenIcon,
  LogoutIcon,
} from "@/icons/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface MutationParams {
  token: string;
  id: string;
}
type State = "init" | "mutating" | "error" | "success";

const Movies = () => {
  const [clicked, setClicked] = useState(false);
  const [currentState, setCurrentState] = useState<State>("init");
  const [id, setId] = useState();
  const { deleteToken, getAuthToken } = useCookie();
  const [page, setPage] = useState(1);
  const size = 10;
  const [hydrated, setHydrated] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", page],
    queryFn: () => findMovies(page, size, getAuthToken() as string),
    enabled: !!getAuthToken(),
    staleTime: 0,
  });

  const router = useRouter();

  const handleLogout = (e: any) => {
    e.preventDefault();
    deleteToken();
    toast.success("Logout successful");
    router.push("/login");
  };

  const handleNext = () => {
    if (data?.payload.pagination.page < data?.payload.pagination.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (data?.payload.pagination.page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  if (isLoading) {
    return <LoadingScreenIcon />;
  }

  if (isError) {
    return (
      <ErrorScreen
        message="An unexpected error occurred. Please try again."
        onRetry={() => window.location.reload()}
      />
    );
  }
  const movies = data?.payload.data || [];
  const { page: currentPage, totalPages } = data?.payload.pagination || {};

  if (data && movies.length === 0) {
    return <EmptyMovieList />;
  }
  return (
    <div className="min-h-screen text-white container pt-20">
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
              <IconWarning className="mx-auto mb-4 text-white-400 w-14 h-14 " />
              <h3 className="mb-5 text-lg font-normal text-white-500">
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
                  className="bg-primary hover:bg-primary-100 focus:ring-4 focus:outline-none rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex  items-center justify-between md:p-4 mb-10 px-6">
        <div className="flex items-center md:gap-x-4 gap-x-4">
          <h1 className="text-2xl md:text-4xl font-semibold">My Movies</h1>
          <Link href="/dashboard/movies/create">
            <AddIcon className="w-8 h-8" />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setClicked(true)}
            className="flex items-center px-4 gap-x-3 md:gap-x-4 py-2"
          >
            <h4 className="text-lg">Logout</h4>
            <LogoutIcon className="w-8 h-8" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie: any) => (
          <div
            key={movie.id}
            className="p-3 cursor-pointer relative bg-[#092C39] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div
              onClick={() => router.push(`/dashboard/movies/${movie.id}`)}
              className="absolute h-4 w-4 z-10 left-5 top-4 flex justify-between "
            >
              <EditIcon className="text-white  h-4 w-4" />
            </div>{" "}
            <div className="absolute h-4 w-4 z-10 right-5 top-4 flex justify-between ">
              <DeleteResource
                id={movie.id}
                apiCall={deleteMovie}
                queryKey="movies"
              />
            </div>
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
              <Image
                src={movie.poster}
                alt={movie.title}
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-4 text-white">
              <h3 className="text-xl font-bold mb-2">🎬 {movie.title}</h3>
              <div className="text-sm text-gray-300 space-y-1">
                <p>
                  <span className="font-medium text-gray-400">Released:</span>{" "}
                  {movie.publishedYear}
                </p>
                <p>
                  <span className="font-medium text-gray-400">Genre:</span>{" "}
                  {movie.genre}
                </p>
                <p>
                  <span className="font-medium text-gray-400">Director:</span>{" "}
                  {movie.director}
                </p>
                <p>
                  <span className="font-medium text-gray-400">Uploaded:</span>{" "}
                  {new Date(movie.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center py-4 space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50"
        >
          Prev
        </button>
        <div className="px-4 py-2 text-sm">{`${currentPage} / ${totalPages}`}</div>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;
