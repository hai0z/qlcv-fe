import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Input,
  Textarea,
} from "@nextui-org/react";
import { FileText, SendHorizontal, Search } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import useWorkStore from "../../../store/workStore";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../store/userStore";
import { AuthContext } from "../../../context/authProvider";
import * as yup from "yup";
import { useFormik } from "formik";
function AddWorkPage() {
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const { createWork, addMemberToWork } = useWorkStore((state) => state);

  const [implementer, setImplementer] = useState([]);

  const { getListUsers, listUsers } = useUserStore((state) => state);

  const [searchTerm, setSearchTerm] = useState("");

  const [filteredUsers, setFilteredUsers] = useState([]);

  const [startTime, setStartTime] = useState(dayjs());

  const [endTime, setEndTime] = useState(dayjs().add(1, "day"));
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      startTime: dayjs(),
      endTime: dayjs().add(1, "day"),
    },
    validationSchema: yup.object({
      title: yup.string().required("Vui lòng nhập mô tả"),
      description: yup.string(),
    }),
    onSubmit: async (values) => {
      const workId = await createWork(values);
      if (auth.role === "ADMIN") {
        for (let i = 0; i < implementer.length; i++) {
          await addMemberToWork(workId, implementer[i]);
        }
      } else {
        await addMemberToWork(workId, filteredUsers[0].id);
      }
      toast.success("Thêm công việc thành công");
      navigate("/work-info/" + workId);
    },
  });

  useEffect(() => {
    (async () => {
      const users = await getListUsers();
      if (auth.role === "ADMIN") {
        setFilteredUsers(users);
      } else {
        setFilteredUsers(users.filter((user) => user.id === auth.id));
      }
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
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredUsers(
      listUsers.filter((user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  return (
    <div className="mx-6 lg:mx-28 bg-background min-h-screen pb-16">
      <div className="lg:pt-24 pt-8 w-full h-full">
        <div className="w-full flex flex-col gap-8 xl:flex-row">
          <form className="w-full xl:w-8/12">
            <h2 className="font-bold text-lg">Thêm công việc</h2>
            <Card className="mt-4" radius="none" shadow="sm">
              <CardHeader>
                <div>
                  <h2>Yêu cầu công việc</h2>
                  <p className="mt-4 text-small">
                    Hãy mô tả ngắn yêu cầu, đặt thời hạn hoàn thành và chọn
                    người tham gia thực hiện công việc
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex flex-col">
                  <h4 className="text-small">
                    Mô tả ngắn{" "}
                    <span className="text-danger text-small">(*)</span>
                  </h4>
                  <Textarea
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    name="title"
                    radius="none"
                    className="mt-4"
                    placeholder="Mô tả ngắn..."
                  />
                  {formik.errors.title && formik.touched.title && (
                    <p className="text-danger text-small">
                      {formik.errors.title}
                    </p>
                  )}
                  <div className="mt-2">
                    <p className="text-small mb-4">Mô tả chi tiết</p>
                    <ReactQuill
                      theme="snow"
                      value={formik.values.description}
                      onChange={(e) => {
                        formik.setFieldValue("description", e);
                      }}
                    />
                  </div>
                </div>
                <Divider className="mt-4" />
                <div className="flex flex-col lg:flex-row justify-between w-full gap-4  mt-10 pb-10 flex-wrap">
                  <div className="flex flex-col">
                    <span className="text-small">Thời gian thực hiện từ</span>
                    <input
                      required
                      value={dayjs(startTime).format("YYYY-MM-DDTHH:mm")}
                      onChange={(e) => {
                        setStartTime(new Date(e.target.value));
                        formik.setFieldValue(
                          "startTime",
                          new Date(e.target.value)
                        );
                      }}
                      name="startTime"
                      type="datetime-local"
                      placeholder="sdfasd"
                      className="w-[450px] py-2 border rounded-md mt-2 px-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-small">Thời hạn đến</span>
                    <input
                      required
                      value={dayjs(endTime).format("YYYY-MM-DDTHH:mm")}
                      onChange={(e) => {
                        setEndTime(new Date(e.target.value));
                        formik.setFieldValue(
                          "endTime",
                          new Date(e.target.value)
                        );
                      }}
                      type="datetime-local"
                      name="endTime"
                      className="w-[450px] py-2 border rounded-md mt-2 px-2"
                    />
                  </div>
                  {auth.role === "USER" && (
                    <Button
                      onPress={formik.handleSubmit}
                      radius="none"
                      color="warning"
                      className="mt-4"
                      fullWidth
                    >
                      <div className="flex flex-row items-center w-full">
                        <SendHorizontal />
                        <div className="w-full flex flex-col">
                          <span>Tạo công việc</span>
                        </div>
                      </div>
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          </form>
          {auth.role === "ADMIN" && (
            <div className="w-full xl:w-4/12 mt-[44px]">
              <Card radius="none" shadow="sm">
                <CardHeader>
                  <div className="flex flex-col">
                    <h2 className="text-large font-bold">
                      Những người tham gia
                    </h2>
                    <p className="text-small">
                      Có thể điều chỉnh ở bước tiếp theo
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="h-80 overflow-y-auto">
                    {auth.role === "ADMIN" && (
                      <div className="sticky top-0 z-50">
                        <Input
                          placeholder="Nhập tên người dùng..."
                          value={searchTerm}
                          size="sm"
                          onChange={handleSearch}
                          className="my-4 "
                          endContent={<Search />}
                          type="search"
                        />
                      </div>
                    )}
                    {filteredUsers?.map((user, index) => (
                      <div className="w-full py-4" key={index}>
                        <Checkbox
                          value={user.id}
                          onChange={handleSelectUser}
                          className="flex flex-row max-w-full items-center gap-2"
                        >
                          <div className="w-full flex flex-row items-center gap-2">
                            <Avatar src={user.avatar || ""} />
                            <h3>{user.name}</h3>
                          </div>
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
              <Button
                isDisabled={implementer.length === 0}
                onPress={formik.handleSubmit}
                radius="none"
                color="warning"
                className="mt-4"
                fullWidth
              >
                <div className="flex flex-row items-center w-full">
                  <SendHorizontal />
                  <div className="w-full flex flex-col">
                    <span>Tạo công việc</span>
                    <span className="text-tiny">
                      (gửi tới {implementer.length} người thực hiện)
                    </span>
                  </div>
                </div>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddWorkPage;
