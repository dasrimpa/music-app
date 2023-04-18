import { routes } from "lib/routes";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginInterface } from "Interface/Login.interface";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "lib/firebase";
import ErrorMessage from "components/ErrorMessage";
import { messages } from "lib/messages";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required(messages.errorMessage.required)
      .email(messages.errorMessage.email),
    password: yup.string().trim().required(messages.errorMessage.required),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterface>({
    resolver: yupResolver(loginSchema),
  });

  async function onSubmit(val: LoginInterface) {
    try {
      await signInWithEmailAndPassword(fireAuth, val.email, val.password);
      navigate(routes.songList);
    } catch (error: any) {
      if (error.code === "auth/wrong-password") {
        setErrorMessage("Invalid password");
      } else if (error.code === "auth/user-not-found") {
        setErrorMessage("Email not found");
      } else {
        setErrorMessage(error.message);
      }
    }
  }
  return (
    <div className="w-[300px] mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 mb-6 md:grid-cols-2"></div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email address
          </label>
          <input
            type="email"
            {...register("email")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
          />
        </div>
        {errors && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
          />
        </div>
        {errors && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <div className="pt-2">
        Do not have an account?{" "}
        <Link to={routes.register} className="text-blue-600">
          register
        </Link>
      </div>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
}
