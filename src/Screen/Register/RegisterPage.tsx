import { routes } from "lib/routes";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { messages } from "lib/messages";
import { RegisterInterface } from "Interface/Register.interface";
import ErrorMessage from "components/ErrorMessage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "lib/firebase";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const registerSchema = yup.object().shape({
    name: yup.string().trim().required(messages.errorMessage.required),
    email: yup
      .string()
      .trim()
      .required(messages.errorMessage.required)
      .email(messages.errorMessage.email),
    password: yup
      .string()
      .trim()
      .required(messages.errorMessage.required)
      .min(6, messages.errorMessage.password),
    confirmPassword: yup
      .string()
      .required(messages.errorMessage.required)
      .trim()
      .oneOf([yup.ref("password")], messages.errorMessage.passwordMatch),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInterface>({
    resolver: yupResolver(registerSchema),
  });

  async function onSubmit(val: RegisterInterface) {
    try {
      await createUserWithEmailAndPassword(fireAuth, val.email, val.password);

      navigate(routes.login);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email exits");
      } else {
        setErrorMessage(error.message);
      }
    }
  }
  return (
    <div className="w-[300px] mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name"
          />
        </div>
        {errors && <ErrorMessage>{errors.name?.message}</ErrorMessage>}

        <div className="mb-6 mt-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address
          </label>
          <input
            {...register("email")}
            type="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
          />
        </div>
        {errors && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
          />
        </div>
        {errors && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
        <div className="mb-6">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
          />
        </div>
        {errors && (
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
        )}

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <div className="pt-2">
        Already have an account?{" "}
        <Link to={routes.login} className="text-blue-600">
          login
        </Link>
      </div>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
}
