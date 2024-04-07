import { Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";
const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const themes = ["light", "dark", "plus", "flat"];
  if (!mounted) return null;
  return (
    <div className="flex flex-col gap-2">
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            size="sm"
            color="primary"
            startContent={<Palette color="hsl(var(--nextui-primary))" />}
          ></Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          {themes.map((theme) => (
            <DropdownItem key={theme} onClick={() => setTheme(theme)}>
              <span className="capitalize"> {theme}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
export default ThemeSwitch;
