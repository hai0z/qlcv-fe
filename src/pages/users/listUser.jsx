import {
  Card,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
  Chip,
} from "@nextui-org/react";
import { MoreVertical } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import useUserStore from "../../store/userStore";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-material.css";
import { useTheme } from "next-themes";
import { AuthContext } from "../../context/authProvider";
import toast from "react-hot-toast";
function listUsersPage() {
  const { theme } = useTheme();

  const { getListUsers, deleteUser, resetPassword } = useUserStore(
    (state) => state
  );

  const [listUsers, setListUser] = useState([]);

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const users = await getListUsers();
      setListUser(users);
    })();
  }, []);

  const handleResetPassword = async (id) => {
    const option = confirm("Bạn muốn đặt lại mật khẩu về mặc định?");
    option &&
      toast.promise(resetPassword(id), {
        loading: "Đang đặt lại mật khẩu...",
        success: "Đặt lại mật khẩu thành công",
        error: (error) => error.message,
      });
  };
  const handleDeleteUser = async (id) => {
    const option = confirm("Bạn muốn xóa người dùng ngày?");
    option &&
      toast.promise(deleteUser(id), {
        loading: "Đang xóa...",
        success: "Đã xóa người dùng",
        error: (error) => error.message,
      });
  };
  const [colDefs] = useState([
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
          {params.value === "ADMIN" ? (
            <Chip color="danger">Quản trị viên</Chip>
          ) : (
            <Chip color="warning">Người dùng</Chip>
          )}
        </div>
      ),
    },
    {
      field: "id",
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
              <DropdownItem as={Link} to={`/profile/${params.value}`}>
                Xem thông tin
              </DropdownItem>
              {auth.role === "ADMIN" && (
                <DropdownItem as={Link} to={`/users/edit/${params.value}`}>
                  Sửa
                </DropdownItem>
              )}
              {auth.role === "ADMIN" && auth.id !== params.value && (
                <DropdownItem onPress={() => handleDeleteUser(params.value)}>
                  Xoá tài khoản
                </DropdownItem>
              )}
              {auth.role === "ADMIN" && (
                <DropdownItem onPress={() => handleResetPassword(params.value)}>
                  Đặt lại mật khẩu
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      ),
    },
  ]);
  return (
    <div className="w-full flex flex-col gap-8 xl:flex-row">
      <div className="w-full">
        <h2 className="font-bold text-lg">Danh sách nhân sự</h2>
        <Card
          radius="none"
          className={`${
            theme === "light" || theme === "plus"
              ? "ag-theme-material"
              : "ag-theme-material-dark"
          } mt-4 h-screen`}
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
