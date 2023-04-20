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
import Button from "components/Button";
import { routes } from "lib/routes";
import Logo from '../../assets/images/Logo.svg'

export default function RegisterPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const registerSchema = yup.object().shape({
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
      setLoadingState(true);
        setTimeout(() => {
          navigate(routes.dashboard.SongList.path);
        }, 3000);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email exits");
      } else {
        setErrorMessage(error.message);
      }
    }
  }
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
              <img
                className="mx-auto h-10 w-auto"
                src={Logo}
                alt="Your Company"
              />
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create a new account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 text-left">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              {errors && (
                <ErrorMessage className="text-left">
                  {errors.email?.message}
                </ErrorMessage>
              )}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {errors && (
                <ErrorMessage className="text-left">
                  {errors.password?.message}
                </ErrorMessage>
              )}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                  Confirm password
                </label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {errors && (
                <ErrorMessage className="text-left">
                  {errors.confirmPassword?.message}
                </ErrorMessage>
              )}
              <Button
                loading={loadingState}
                disabled={loadingState}
                type="submit"
                className="w-full"
              >
                Sign up
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                Already have an account? {" "}
                <Link
                  to={routes.login}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </div>
        </div>
      </div>
    </section>
  );
}
