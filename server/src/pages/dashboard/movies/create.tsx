import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { createMovie } from "@/core/axios.core";
import useCookie from "@/hooks/useCookie";
import { useRouter } from "next/router";

export interface FormInputs {
  title: string;
  publishedYear: string;
  image: File;
  author: string;
  director: string;
  genre: string;
}

type State = "init" | "mutating" | "error" | "success";

const NewMovieForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();
  const [currentState, setCurrentState] = useState<State>("init");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const router = useRouter();
  const [fileMetadata, setFileMetadata] = useState<{
    name: string;
    size: string;
    type: string;
  } | null>(null);

  const { getAuthToken } = useCookie();

  const mutation = useMutation({
    mutationFn: (formData: FormInputs) => {
      return createMovie(formData, getAuthToken() as string);
    },
    onSuccess: (res) => {
      setCurrentState("success");
      toast.success(res.payload);
      reset();
      router.push("/dashboard/movies");
    },
    onMutate: () => {
      setCurrentState("mutating");
    },
    onError: (error: any) => {
      toast.error(
        error.response ? error.response.data.error : "Something went wrong"
      );
      setCurrentState("error");
    },
  });

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("publishedYear", data.publishedYear);
    formData.append("author", data.author);
    formData.append("director", data.director);
    formData.append("genre", data.genre);

    if (data.image) {
      formData.append("image", data.image);
    }

    try {
      mutation.mutate(formData as any);
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 1) {
        alert("Only one file is allowed!");
        return;
      }
      const file = acceptedFiles[0];
      setValue("image", file);
      setFilePreview(URL.createObjectURL(file));
      setFileMetadata({
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        type: file.type,
      });
    },
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <>
      <div className="min-h-screen flex flex-col items-left justify-center xl:pl-[6rem] mt-10 ">
      <div className="px-4">
          <h2 className="text-4xl font-semibold text-white mb-4 ">
            Create a new movie
          </h2>
        </div>
        <div className="p-8 rounded-md w-full max-w-7xl xl:gap-x-[7rem] lg:gap-x-[4rem] flex flex-col lg:flex-row gap-y-8 lg:gap-y-0 items-start">
          <div
            {...getRootProps()}
            className="w-full lg:w-1/2 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center h-[500px] bg-gray-700 text-white cursor-pointer"
          >

            <input
              {...getInputProps({
                multiple: false,
              })}
            />
            {filePreview ? (
              <img
                src={filePreview}
                alt="File Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <p>Drop an image here or click to upload</p>
            )}
          </div>
          {errors.image && (
            <p className="text-red-500 text-sm mt-2 sm:mt-0 sm:ml-4">
              {errors.image.message}
            </p>
          )}

          {/* </div> */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full lg:w-1/3 mt-6 sm:mt-0 lg:ml-6"
          >
            {/* Title */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm text-gray-300 mb-1"
              >
                Title
              </label>
              <input
                {...register("title", { required: "Title is required." })}
                type="text"
                id="title"
                className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring bg-[#224957] focus:ring-gray-500"
                placeholder="Enter movie title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-sm text-gray-300 mb-1"
              >
                Author
              </label>
              <input
                {...register("author", { required: "Author is required." })}
                type="text"
                id="author"
                className="w-full px-4 py-3 text-white  rounded-md focus:outline-none focus:ring bg-[#224957] focus:ring-gray-500"
                placeholder="Author name"
              />
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.author.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="director"
                className="block text-sm text-gray-300 mb-1"
              >
                Director
              </label>
              <input
                {...register("author", { required: "Director is required." })}
                type="text"
                id="director"
                className="w-full px-4 py-3 text-white  rounded-md focus:outline-none focus:ring bg-[#224957] focus:ring-gray-500"
                placeholder="Directors name"
              />
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.author.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="genre"
                className="block text-sm text-gray-300 mb-1"
              >
                Genre
              </label>
              <input
                {...register("genre", { required: "Genre is required." })}
                type="text"
                id="genre"
                className="w-full px-4 py-3 text-white rounded-md focus:outline-none focus:ring bg-[#224957] focus:ring-gray-500"
                placeholder="Genre"
              />
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.author.message}
                </p>
              )}
            </div>
            {/* Year */}
            <div className="mb-4">
              <label
                htmlFor="publishedYear"
                className="block text-sm text-gray-300 mb-1"
              >
                Publishing year
              </label>
              <input
                {...register("publishedYear", {
                  required: "Year is required.",
                  pattern: {
                    value: /^\d{2}-\d{2}-\d{4}$/,
                    message: "Enter a valid date in the format MM-DD-YYYY.",
                  },
                })}
                type="text"
                id="publishedYear"
                className="w-full px-4 py-3 text-white  rounded-md focus:outline-none focus:ring bg-[#224957] focus:ring-gray-500"
                placeholder="Enter year"
              />
              {errors.publishedYear && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.publishedYear.message}
                </p>
              )}
            </div>

            <div className="flex space-x-10 w-full  justify-center">
              <button
                type="button"
                onClick={() => {
                  reset()
                  router.push("/dashboard/movies")
                }}
                className="px-10 py-4 bg-transparent border border-gray-400 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-10 py-4  bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
        <div className=" w-full">
          {fileMetadata && (
            <div className="mt-4 text-white">
              <p>
                <strong>File Name:</strong> {fileMetadata.name}
              </p>
              <p>
                <strong>File Size:</strong> {fileMetadata.size}
              </p>
              <p>
                <strong>File Type:</strong> {fileMetadata.type}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewMovieForm;
