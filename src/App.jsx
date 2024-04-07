import React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { createRoot } from "react-dom/client";
import router from "./routes";
import "./index.css";

const root = createRoot(document.getElementById("app"));

root.render(
  <NextUIProvider>
    <ThemeProvider enableSystem defaultTheme="plus">
      <RouterProvider router={router} />
    </ThemeProvider>
  </NextUIProvider>
);
