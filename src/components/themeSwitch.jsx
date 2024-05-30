import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { VisuallyHidden, useSwitch } from "@nextui-org/react";

const ThemeSwitch = (props) => {
  const { setTheme, theme } = useTheme();
  const { Component, slots, getInputProps, getWrapperProps } = useSwitch(props);
  return (
    <div className="flex flex-col gap-2 cursor-pointer">
      <Component>
        <VisuallyHidden>
          <input
            {...getInputProps()}
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
          />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-8 h-8",
              "flex items-center justify-center cursor-pointer",
              "rounded-lg bg-default-100 hover:bg-default-200",
            ],
          })}
        >
          {theme === "dark" ? <Sun color="gold" /> : <Moon />}
        </div>
      </Component>
    </div>
  );
};

export default ThemeSwitch;
