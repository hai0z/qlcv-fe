import React, { useContext, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Input,
  Chip,
  Avatar,
  Badge,
} from "@nextui-org/react";
import {
  Briefcase,
  Calendar,
  ChevronDown,
  HomeIcon,
  PlusCircle,
  Table,
  UserRound,
  CalendarClock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authProvider";
import ThemeSwitch from "./themeSwitch";
import useWorkStore from "../store/workStore";
import SearchInput from "./search/SearchInput";
import { useTheme } from "next-themes";
export default function App() {
  const { auth: user, handleLogOut } = useContext(AuthContext);
  const { setTheme, theme } = useTheme();
  const { todayWorks, getTodayWorks } = useWorkStore((state) => state);

  useEffect(() => {
    getTodayWorks();
  }, []);

  return (
    <div className="container pb-20 ">
      <Navbar
        isBlurred={true}
        isBordered
        className="fixed h-20"
        maxWidth="full"
        classNames={{
          base: "z-50 lg:px-24 px-0",
        }}
      >
        <NavbarContent>
          <NavbarBrand>
            <Link
              to={"/"}
              className="font-bold lg:text-3xl text-primary text-medium"
            >
              QUẢN LÝ CÔNG VIỆC
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <SearchInput />
        <NavbarContent justify="end">
          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  color={user?.role === "ADMIN" ? "danger" : "warning"}
                  as="button"
                  className="transition-transform"
                  size="md"
                  src={user?.avatar || ""}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownSection showDivider>
                  <DropdownItem
                    key="profile"
                    className="h-14 gap-2"
                    shortcut={user.role}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <div>
                        <p className="font-semibold capitalize">{user?.name}</p>
                        <p className="font-semibold text-tiny text-foreground-400">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection aria-label="Preferences" showDivider>
                  <DropdownItem
                    isReadOnly
                    key="theme"
                    className="cursor-default"
                    endContent={
                      <select
                        defaultValue={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                        id="theme"
                        name="theme"
                      >
                        <option>light</option>
                        <option>dark</option>
                      </select>
                    }
                  >
                    Chủ đề
                  </DropdownItem>
                </DropdownSection>
                <DropdownItem
                  key="settings"
                  as={Link}
                  to={"/profile/" + user?.id}
                >
                  Thông tin cá nhân
                </DropdownItem>

                <DropdownItem
                  onClick={handleLogOut}
                  key="logout"
                  color="danger"
                >
                  Đăng xuất
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      <Navbar
        maxWidth="full"
        isBordered
        isBlurred
        className="flex flex-wrap"
        classNames={{
          base: "z-50 lg:px-24 px-0 top-20 fixed",
        }}
      >
        <NavbarContent className="sm:flex xl:gap-32 md:gap-20" justify="center">
          <NavbarItem isActive>
            <Button
              href="/"
              as={Link}
              aria-label="Mới nhất"
              disableRipple
              className="p-0 bg-transparent data-[hover=true]:bg-transparent"
              radius="sm"
              variant="light"
              startContent={<HomeIcon />}
            >
              Mới nhất
            </Button>
          </NavbarItem>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  radius="sm"
                  variant="light"
                  startContent={<Briefcase />}
                  endContent={<ChevronDown />}
                >
                  Các công việc
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownSection showDivider>
                <DropdownItem
                  as={Link}
                  to="/work-status"
                  key="autoscaling"
                  startContent={<Table />}
                >
                  Bảng trạng thái
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title={"Hành động"}>
                <DropdownItem
                  aria-label="Thêm công việc"
                  key="delete"
                  className="text-foreground"
                  color="success"
                  as={Link}
                  to="/work-add"
                  startContent={<PlusCircle />}
                >
                  Thêm công việc
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>

          <NavbarItem>
            <Button
              aria-label="Nhân sự"
              disableRipple
              className="p-0 bg-transparent data-[hover=true]:bg-transparent"
              radius="sm"
              variant="light"
              as={Link}
              to={"/users"}
              startContent={<UserRound />}
            >
              Nhân sự
            </Button>
          </NavbarItem>

          {user.role === "ADMIN" && (
            <NavbarItem>
              <Button
                aria-label="Trễ hạn"
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
                as={Link}
                to={"/deadline"}
                startContent={<CalendarClock />}
              >
                Trễ hạn
              </Button>
            </NavbarItem>
          )}
          <NavbarItem>
            <Button
              aria-label="Lịch làm việc"
              disableRipple
              className="p-0 bg-transparent data-[hover=true]:bg-transparent"
              radius="sm"
              variant="light"
              as={Link}
              to={"/calender"}
              startContent={<Calendar />}
              endContent={
                <Chip size="sm" color="success" radius="full">
                  {todayWorks.length}
                </Chip>
              }
            >
              Lịch làm việc
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
