import {
  CardBody,
  CardHeader,
  Card,
  Avatar,
  Divider,
  Button,
  Tabs,
  Tab,
} from "@nextui-org/react";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUserStore from "../../store/userStore";
import useWorkStore from "../../store/workStore";
import ProgressChart from "../../components/progressChart";
import { ArrowLeft } from "lucide-react";
import EditUser from "./components/editUser";
import { AuthContext } from "../../context/authProvider";
import dayjs from "dayjs";
import ChangePassword from "./components/changePassword";
function Profile() {
  const params = useParams();
  const userId = params.userId;
  const { auth } = useContext(AuthContext);
  const { getUserById } = useUserStore((state) => state);

  const [userInfo, setUserInfo] = React.useState({});

  const [progressChart, setProgressChart] = React.useState({});

  const { getProgressChart } = useWorkStore((state) => state);

  const getUserInfo = async () => {
    const data = await getUserById(userId);
    const chart = await getProgressChart(userId);
    console.log(chart);
    setProgressChart(chart);
    setUserInfo(data);
  };
  useEffect(() => {
    getUserInfo();
  }, [userId]);

  const navigation = useNavigate();
  return (
    <div className="mx-6 lg:mx-28 bg-background min-h-screen pb-16">
      <div className="sm:pt-24 pt-8   w-full h-full justify-center items-center flex">
        <div className="xl:w-1/2 w-full flex flex-col gap-2 justify-center">
          {userId === auth.id ? (
            <Tabs aria-label="Options" onSelectionChange={() => getUserInfo()}>
              <Tab key="overview" title="Chung">
                <Card radius="none">
                  <CardHeader>
                    <div className="w-full flex flex-row justify-between">
                      <div>
                        <h1 className="text-2xl font-bold">
                          Thông tin nhân sự
                        </h1>
                        <p className="text-sm">
                          Thông tin cá nhân, tỉ lệ hoàn thành...
                        </p>
                      </div>
                      <Button
                        onPress={() => navigation(-1)}
                        variant="ghost"
                        startContent={<ArrowLeft />}
                      >
                        Quay lại
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="w-full flex flex-col items-center">
                      <Avatar
                        className="w-28 h-28"
                        isBordered
                        src={auth?.avatar}
                      />
                      <h1 className="text-lg font-bold mt-1">{auth?.name}</h1>
                    </div>
                    <h1 className="font-bold">Thông tin</h1>
                    <div className="w-full flex flex-row gap-20">
                      <div className="gap-4 flex flex-col mt-4">
                        <p className="text-sm">Email: {auth?.email}</p>
                        <p className="text-sm">Địa chỉ: {auth?.address}</p>
                        <p className="text-sm">Số điện thoại: {auth?.phone}</p>
                        <p className="text-sm">
                          Vai trò:{" "}
                          {auth?.role === "ADMIN"
                            ? "Người quản trị"
                            : "Người dùng"}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-col gap-4">
                        <p className="text-sm">UID: {auth?.id}</p>
                        <p className="text-sm">
                          Ngày tạo:{" "}
                          {dayjs(auth?.createdAt).format("DD/MM/YYYY HH:mm")}
                        </p>
                        <p className="text-sm">
                          Cập nhật gần nhất:{" "}
                          {dayjs(auth?.updatedAt).format("DD/MM/YYYY HH:mm")}
                        </p>
                      </div>
                    </div>
                    <Divider className="mt-4" />
                    <div className="flex flex-col gap-4 mt-8">
                      <h1 className="font-bold">Biểu đồ thống kê</h1>
                      <div className="w-full xl:w-3/4 md:w-1/2">
                        <ProgressChart chartData={progressChart} />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="edit" title="Chỉnh sửa thông tin">
                <EditUser id={auth.id} />
              </Tab>
              <Tab key="changePassword" title="Đổi mật khẩu">
                <ChangePassword />
              </Tab>
            </Tabs>
          ) : (
            <Card radius="none">
              <CardHeader>
                <div className="w-full flex flex-row justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">Thông tin nhân sự</h1>
                    <p className="text-sm">
                      Thông tin cá nhân, tỉ lệ hoàn thành...
                    </p>
                  </div>
                  <Button
                    onPress={() => navigation(-1)}
                    variant="ghost"
                    startContent={<ArrowLeft />}
                  >
                    Quay lại
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <div className="w-full flex flex-col items-center">
                  <Avatar
                    className="w-28 h-28"
                    isBordered
                    src={userInfo?.avatar}
                  />
                  <h1 className="text-lg font-bold mt-1">{userInfo?.name}</h1>
                </div>
                <div className="flex flex-col mt-8">
                  <h1 className="font-bold">Thông tin</h1>
                  <div className="w-full flex flex-row gap-20">
                    <div className="gap-4 flex flex-col mt-4">
                      <p className="text-sm">Email: {userInfo?.email}</p>
                      <p className="text-sm">Địa chỉ: {userInfo?.address}</p>
                      <p className="text-sm">
                        Số điện thoại: {userInfo?.phone}
                      </p>
                      <p className="text-sm">
                        Vai trò:{" "}
                        {userInfo?.role === "ADMIN"
                          ? "Người quản trị"
                          : "Người dùng"}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-col gap-4">
                      <p className="text-sm">UID: {userInfo?.id}</p>
                      <p className="text-sm">
                        Ngày tạo:{" "}
                        {dayjs(userInfo?.createdAt).format("DD/MM/YYYY HH:mm")}
                      </p>
                      <p className="text-sm">
                        Cập nhật gần nhất:{" "}
                        {dayjs(userInfo?.updatedAt).format("DD/MM/YYYY HH:mm")}
                      </p>
                    </div>
                  </div>
                </div>
                <Divider className="mt-4" />
                <div className="flex flex-col gap-4 mt-8">
                  <h1 className="font-bold">Biểu đồ thống kê</h1>
                  <div className="w-full xl:w-3/4 md:w-1/2">
                    <ProgressChart chartData={progressChart} />
                  </div>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
