"use client";

import React, { useContext } from "react";
import { HeaderLayout } from "@/components/HeaderLayout";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { AppContext } from "./providers";
import { useLogout } from "./auth/hooks/useLogout";

export const AccountNavbar = ({ name, username, slug, email }) => {
  const { router } = useContext(AppContext);
  const { handleLogout } = useLogout();
  return (
    <HeaderLayout>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="text-sm sm:text-lg">
          Halo, <span className="font-semibold">{username}</span>
        </div>
        <Dropdown placement="bottom-end">
          <DropdownTrigger className="h-6 w-6 sm:h-8 sm:w-8 ">
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Jane Doe"
              src={`https://ui-avatars.com/api/?background=random&color=fff&name=${
                slug || ""
              }`}
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
              className="hover: my-2 mb-1 gap-2 py-1"
            >
              <p className="mb-1 text-base font-semibold">Masuk sebagai</p>
              <p className="text-sm font-semibold">{name}</p>
              <p className="text-xs font-normal">{email}</p>
            </DropdownItem>
            <DropdownItem
              key="beranda"
              textValue="beranda"
              onClick={() => {
                router.push("/");
              }}
            >
              <div>Beranda</div>
            </DropdownItem>
            <DropdownItem
              key="akun"
              textValue="akun"
              onClick={() => {
                router.push("/dashboard/user");
              }}
            >
              <div>Akun</div>
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
            <DropdownItem
              key="logout"
              textValue="logout"
              color="danger"
              onClick={handleLogout}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </HeaderLayout>
  );
};
