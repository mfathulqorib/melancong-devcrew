"use client"

import { NextUIProvider } from "@nextui-org/react"

export const Provider = ({ children }) => {
  return (
    <NextUIProvider>
      <div>{children}</div>
    </NextUIProvider>
  )
}
