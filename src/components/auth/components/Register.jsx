"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { EyeSlashFilledIcon } from "@/components/auth/components/icon/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/auth/components/icon/EyeFilledIcon";
import { useRegister } from "../hooks/useRegister";

export const Register = () => {
  const placement = "outside";
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);
  const { handleRegister, isLoading } = useRegister();

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Logo className="flex flex-col items-center justify-center" />
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-2 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="mb-5 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Buat Akun
            </h1>
            <form onSubmit={handleRegister}>
              <div className="mb-6 mt-3 flex flex-col gap-3 text-3xl sm:gap-4 sm:text-3xl">
                <Input
                  type="text"
                  name="username"
                  label="Username"
                  labelPlacement={placement}
                  placeholder="Masukan nama akunmu.."
                />
                <Input
                  type="text"
                  name="name"
                  label="Nama lengkap"
                  labelPlacement={placement}
                  placeholder="Masukan nama lengkapmu..."
                />
                <Input
                  type="email"
                  label="Email"
                  name="email"
                  labelPlacement={placement}
                  placeholder="Masukan emailmu..."
                />
                <Input
                  type="text"
                  label="Bio"
                  name="bio"
                  labelPlacement={placement}
                  placeholder="Seorang pecinta traveler..."
                />
                <Input
                  type={isVisible ? "text" : "password"}
                  label="Password"
                  name="password"
                  labelPlacement={placement}
                  placeholder="Masukan passwordmu..."
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onMouseDown={toggleVisibility}
                      onMouseUp={toggleVisibility}
                      onTouchStart={toggleVisibility}
                      onTouchEnd={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="pointer-events-none text-lg text-default-400 sm:text-xl" />
                      ) : (
                        <EyeFilledIcon className="pointer-events-none text-lg text-default-400 sm:text-xl" />
                      )}
                    </button>
                  }
                />
                <Input
                  type={isVisible2 ? "text" : "password"}
                  label="Konfirmasi Password"
                  name="confirmPassword"
                  labelPlacement={placement}
                  placeholder="Tulis ulang paswordmu..."
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onMouseDown={toggleVisibility2}
                      onMouseUp={toggleVisibility2}
                      onTouchStart={toggleVisibility2}
                      onTouchEnd={toggleVisibility2}
                    >
                      {isVisible2 ? (
                        <EyeSlashFilledIcon className="pointer-events-none text-lg text-default-400 sm:text-xl" />
                      ) : (
                        <EyeFilledIcon className="pointer-events-none text-lg text-default-400 sm:text-xl" />
                      )}
                    </button>
                  }
                />
              </div>
              <Button
                color="primary"
                className=" w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                type="submit"
                isLoading={isLoading}
              >
                Buat Akun
              </Button>
            </form>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Sudah Punya Akun?{" "}
              <Link href="/login">
                <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Yuk Masuk
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
