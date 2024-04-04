import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Avatar,
} from "@nextui-org/react";
import { Eye, Pencil, Trash2, PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import useWorkStore from "../../store/workStore";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";

function listUsersPage() {
  const navigate = useNavigate();
  const [work, setWork] = useState({
    title: "",
    description: "",
    startTime: new Date(),
    endTime: new Date(),
  });

  const [implementer, setImplementer] = useState([]);

  const { getListUsers, listUsers } = useUserStore((state) => state);

  const [searchTerm, setSearchTerm] = useState("");

  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const users = await getListUsers();
      setFilteredUsers(users);
    })();
  }, []);
  const columns = [
    { name: "Email", uid: "email" },
    { name: "Tên người dùng", uid: "name" },
    { name: "Chức vụ", uid: "role" },
    { name: "Địa chỉ", uid: "address" },
    { name: "Hành động", uid: "actions" },
  ];
  const handleSelectUser = (e) => {
    if (e.target.checked) {
      setImplementer([...implementer, e.target.value]);
    } else {
      setImplementer(
        implementer.filter((implementer) => implementer !== e.target.value)
      );
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredUsers(
      listUsers.filter((user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "email":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "name":
        return <p className="text-bold text-sm capitalize">{cellValue}</p>;
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );

      case "actions":
        return (
          <div className="relative flex items-center gap-6">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Eye />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Pencil />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Trash2 />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-8 xl:flex-row">
      <div
        className="w-full"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-bold text-lg">Danh sách nhân sự</h2>
        <Table
          aria-label="Example table with custom cells"
          className="mt-4"
          radius="none"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={listUsers}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default listUsersPage;
