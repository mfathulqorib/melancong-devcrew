"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { EyeSlashFilledIcon } from "@/components/auth/components/icon/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/auth/components/icon/EyeFilledIcon";

export const Register = () => {
  const placements = ["outside"];
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Link href="/">
          <Logo className="flex flex-col items-center justify-center" />
        </Link>
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-2 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="mb-10 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Buat Akun
            </h1>
            <div className="mb-4 mt-4 flex flex-col gap-3 sm:gap-4">
              {placements.map((placement) => (
                <Input
                  key={placement}
                  type="Fullname"
                  label="Nama lengkapmu"
                  labelPlacement={placement}
                  placeholder="Azis Muslim"
                  className="mb-1"
                />
              ))}
              {placements.map((placement) => (
                <Input
                  key={placement}
                  type="Email"
                  label="Akun Email"
                  labelPlacement={placement}
                  placeholder="azismuslim@gmail.com"
                  className="mb-1"
                />
              ))}
              {placements.map((placement) => (
                <Input
                  key={placement}
                  type={isVisible2 ? "text" : "password"}
                  label="Password"
                  labelPlacement={placement}
                  placeholder="Masukan passwordmu"
                  className="mb-1"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onMouseDown={toggleVisibility2}
                      onMouseUp={toggleVisibility2}
                    >
                      {isVisible2 ? (
                        <EyeSlashFilledIcon className="pointer-events-none text-lg text-default-400 sm:text-xl" />
                      ) : (
                        <EyeFilledIcon className="pointer-events-none text-lg text-default-400 sm:text-xl" />
                      )}
                    </button>
                  }
                />
              ))}
              {placements.map((placement) => (
                <Input
                  key={placement}
                  type={isVisible ? "text" : "password"}
                  label="Confirm Password"
                  labelPlacement={placement}
                  placeholder="*******"
                  className="mb-1"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onMouseDown={toggleVisibility}
                      onMouseUp={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="pointer-events-none text-lg text-default-400 sm:text-xl" />
                      ) : (
                        <EyeFilledIcon className="pointer-events-none text-lg text-default-400 sm:text-xl" />
                      )}
                    </button>
                  }
                />
              ))}
            </div>
            <Button
              color="primary"
              className="mb-4 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Buat Akun
            </Button>
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
