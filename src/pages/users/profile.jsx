import {
  CardBody,
  CardHeader,
  Card,
  Avatar,
  Divider,
  Button,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUserStore from "../../store/userStore";
import useWorkStore from "../../store/workStore";
import ProgressChart from "../../components/progressChart";
import { ArrowLeft } from "lucide-react";
function Profile() {
  const params = useParams();
  const userId = params.userId;

  const { getUserById } = useUserStore((state) => state);

  const [userInfo, setUserInfo] = React.useState({});

  const [progressChart, setProgressChart] = React.useState({});

  const { getProgressChart } = useWorkStore((state) => state);

  useEffect(() => {
    (async () => {
      const data = await getUserById(userId);
      const chart = await getProgressChart(userId);
      console.log(chart);
      setProgressChart(chart);
      setUserInfo(data);
    })();
  }, [userId]);

  const navigation = useNavigate();
  return (
    <div className="mx-6 lg:mx-28 bg-background min-h-screen pb-16">
      <div className="pt-24  w-full h-full justify-center items-center flex">
        <div className="lg:w-1/2 w-full flex flex-col gap-8 justify-center">
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
              <div className="flex flex-col gap-4 mt-8">
                <h1 className="font-bold">Thông tin</h1>
                <p className="text-sm">Email: {userInfo?.email}</p>
                <p className="text-sm">Địa chỉ: {userInfo?.address}</p>
                <p className="text-sm">Số điện thoại: {userInfo?.phone}</p>
                <p className="text-sm">
                  Vai trò:{" "}
                  {userInfo?.role === "ADMIN" ? "Người quản trị" : "Người dùng"}
                </p>
              </div>
              <Divider className="mt-4" />
              <div className="flex flex-col gap-4 mt-8">
                <h1 className="font-bold">Biểu đồ thống kê</h1>
                <div className="w-full xl:w-3/4 md:w-full">
                  <ProgressChart chartData={progressChart} />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
