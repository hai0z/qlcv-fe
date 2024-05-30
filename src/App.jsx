import React from "react";
import Favicon from "react-favicon";
import { NextUIProvider } from "@nextui-org/system";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { createRoot } from "react-dom/client";
import router from "./routes";
import "./index.css";

const root = createRoot(document.getElementById("app"));
const iconUrl = "https://cdn-icons-png.flaticon.com/128/5253/5253896.png";
root.render(
  <NextUIProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
      <Favicon url={iconUrl} iconSize={64} />
    </ThemeProvider>
  </NextUIProvider>
);
