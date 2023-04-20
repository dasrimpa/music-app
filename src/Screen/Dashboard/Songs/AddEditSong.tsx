import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "components/Button";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { db, storage } from "lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { routes } from "lib/routes";

export default function AddEditSong() {
  const [song, setSong] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm();
  const fileChange = async (e: any) => {
    const file = e.target.files[0];
    console.log(file.name);
    const storagePath = "songUploads/" + file?.name;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);
    getDownloadURL((await uploadTask).ref).then(async (downloadURL) => {
      setSong(downloadURL as any);
    });
  };
 
  const onSubmit = async () => {
      const generateId = uuidv4();
      await setDoc(doc(db, 'songs', generateId), {
        id: generateId,
        song: song
      }).then(() => {
        navigate(routes.dashboard.SongList.path);
      })
  };
  return (
    <div className="py-10">
      <div className="font-bold text-4xl">Add song</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center w-1/2 mx-auto items-center mt-10">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>

            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              {...register("title")}
              onChange={fileChange}
            />
          </label>
        </div>
        <div className="flex justify-center mt-3">
          <Button type="submit" className="px-10">Add</Button>
        </div>
      </form>
    </div>
  );
}
