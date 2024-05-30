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
} from "@nextui-org/react";
import {
  Briefcase,
  Calendar,
  ChevronDown,
  HomeIcon,
  PlusCircle,
  SearchIcon,
  Table,
  UserRound,
  CalendarClock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authProvider";
import ThemeSwitch from "./themeSwitch";
import useWorkStore from "../store/workStore";
import SearchInput from "./search/SearchInput";
export default function App() {
  const menuItems = [
    "Mới nhất",
    "Công việc",
    "Nhân sự",
    "Trễ hạn",
    "Lịch làm việc",
    "Thông tin cá nhân",
    "Đăng xuất",
  ];

  const { auth: user, handleLogOut } = useContext(AuthContext);

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
            <ThemeSwitch />
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  size="md"
                  src={user?.avatar || ""}
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                disabledKeys={["profile"]}
              >
                <DropdownSection showDivider>
                  <DropdownItem key="profile" className="h-14 gap-2" isReadOnly>
                    <p className="font-semibold">{user?.name}</p>
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
