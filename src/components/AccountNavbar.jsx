"use client";

import { HeaderLayout } from "@/components/HeaderLayout";
import { Logo } from "@/components/Logo";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import Link from "next/link";

import React from "react";

export const AccountNavbar = () => {
  return (
    <HeaderLayout>
      <Logo />
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="text-sm sm:text-base">
          Halo, <span className="font-semibold">Jane Doe</span>
        </div>
        <Dropdown placement="bottom-end">
          <DropdownTrigger className="h-6 w-6 sm:h-8 sm:w-8 ">
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Jane Doe"
              src="https://ui-avatars.com/api/?background=0D8ABC&color=fff"
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            disabledKeys={["pengaturan", "bantuan"]}
          >
            <DropdownItem
              key="profile"
              textValue="profile"
              className="mb-1 h-14 gap-2"
            >
              <p className="font-semibold">Masuk sebagai</p>
              <p className="font-semibold">Jason Hughes</p>
              <p className="text-xs font-normal">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="beranda" textValue="beranda">
              <Link href={"/home"}>
                <div>Beranda</div>
              </Link>
            </DropdownItem>
            <DropdownItem key="akun" textValue="akun">
              <Link href={"/myaccount"}>
                <div>Akun</div>
              </Link>
            </DropdownItem>
            <DropdownItem key="pengaturan" textValue="pengaturan">
              <div className="flex gap-2">
                <p>Pengaturan</p>
                <p className="mt-0 rounded-lg border-1 border-yellow-600 px-[2px] pb-[0.3px] pt-0 align-middle text-[0.6rem] text-yellow-600">
                  segera
                </p>
              </div>
            </DropdownItem>
            <DropdownItem key="bantuan" textValue="bantuan">
              <div className="flex gap-2">
                <p>Pusat Bantuan</p>
                <p className="mt-0 rounded-lg border-1 border-yellow-600 px-[2px] pb-[0.3px] pt-0 align-middle text-[0.6rem] text-yellow-600">
                  segera
                </p>
              </div>
            </DropdownItem>
            <DropdownItem key="logout" textValue="logout" color="danger">
              <Link href={"/"}>
                <div>Log Out</div>
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </HeaderLayout>
  );
};
