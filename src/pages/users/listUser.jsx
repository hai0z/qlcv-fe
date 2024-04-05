import {
  Card,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import { Eye, Pencil, Trash2, PlusCircle, MoreVertical } from "lucide-react";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import useWorkStore from "../../store/workStore";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-material.css";
import { useTheme } from "next-themes"; // Optional Theme applied to the grid
function listUsersPage() {
  const navigate = useNavigate();

  //get theme from next theme
  const { theme } = useTheme();
  const [implementer, setImplementer] = useState([]);

  const { getListUsers } = useUserStore((state) => state);

  const [searchTerm, setSearchTerm] = useState("");

  const [listUsers, setListUser] = useState([]);

  useEffect(() => {
    (async () => {
      const users = await getListUsers();
      setListUser(users);
    })();
  }, []);

  const handleSelectUser = (e) => {
    if (e.target.checked) {
      setImplementer([...implementer, e.target.value]);
    } else {
      setImplementer(
        implementer.filter((implementer) => implementer !== e.target.value)
      );
    }
  };

  const [colDefs, setColDefs] = useState([
    {
      field: "avatar",
      headerName: "Ảnh đại diện",
      cellRenderer: (params) => (
        <div className="w-full h-full  items-center flex">
          <Avatar src={params.value} size="lg" color="default" isBordered />
        </div>
      ),
    },
    { field: "email", headerName: "Email", floatingFilter: true },
    { field: "name", headerName: "Họ và tên", floatingFilter: true },
    { field: "address", headerName: "Địa chỉ", floatingFilter: true },
    {
      field: "role",
      headerName: "Vai trò",
      cellRenderer: (params) => (
        <div className="capitalize">
          {params.value === "ADMIN" ? "Người quản trị" : "Người dùng"}
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Hành động",
      cellRenderer: (params) => (
        <div className="relative flex justify-start items-center gap-2 h-full">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <MoreVertical className="text-default-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>Xem thông tin</DropdownItem>
              <DropdownItem>Sửa</DropdownItem>
              <DropdownItem>Xoá</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ),
    },
  ]);

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
        <Card
          radius="none"
          className={`${
            theme === "light" ? "ag-theme-material" : "ag-theme-material-dark"
          } mt-4 h-screen`}
          // style={{ height: 650 }}
        >
          <AgGridReact
            defaultColDef={{
              flex: 1,
              sortable: true,
              resizable: true,
              filter: true,
              filterParams: {
                debounceMs: 0,
              },
            }}
            rowData={listUsers}
            columnDefs={colDefs}
            paginationPageSize={10}
            gridOptions={{
              rowHeight: 80,
              pagination: true,
              onGridReady: (params) => {
                params.api.sizeColumnsToFit();
              },
            }}
          />
        </Card>
      </div>
    </div>
  );
}

export default listUsersPage;
