import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spinner,
  Textarea,
  Button,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import useWorkStore from "../../../store/workStore";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
function EditWorkPage() {
  const navigate = useNavigate();

  const params = useParams();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      startTime: "",
      endTime: "",
    },
    validationSchema: yup.object({
      title: yup.string().required("Vui lòng nhập tiêu đề"),
      description: yup.string(),
    }),
    onSubmit: async (values) => {
      await handleUpdateWork(values);
      navigate("/work-info/" + params.workId);
    },
  });

  const [loading, setLoading] = useState(true);
  const { updateWork, getWorkById } = useWorkStore((state) => state);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await getWorkById(params.workId);
      formik.setValues({
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
      });
      setLoading(false);
    })();
  }, []);

  const handleUpdateWork = async (data) => {
    try {
      await updateWork(params.workId, data);
      toast.success("Đã cập nhật");
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="mx-6 lg:mx-28 bg-background min-h-screen pb-16">
      <div className="lg:pt-24 pt-8 w-full h-full">
        <div className="w-full flex flex-col gap-8 xl:flex-row">
          <form className="w-full xl:w-8/12">
            <h2 className="font-bold text-lg">Sửa công việc</h2>
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
                    name="title"
                    onChange={formik.handleChange}
                    radius="none"
                    className="mt-4"
                    placeholder="Mô tả ngắn..."
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="text-danger text-small">
                      {formik.errors.title}
                    </p>
                  )}
                  <div className="mt-4">
                    <h4 className="text-small mb-4">Mô tả chi tiết</h4>
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
                    <span className="text-small">Thời hạn đến</span>
                    <input
                      value={dayjs(formik?.values?.endTime).format(
                        "YYYY-MM-DDTHH:mm"
                      )}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "endTime",
                          new Date(e.target.value)
                        );
                      }}
                      type="datetime-local"
                      placeholder=""
                      className="w-[450px] py-2 border rounded-md mt-2 px-2"
                    />
                  </div>
                </div>
                <div className="flex justify-between flex-row gap-4">
                  <Button
                    className="flex-1"
                    color="primary"
                    onPress={formik.handleSubmit}
                  >
                    Lưu thay đổi
                  </Button>
                  <Button color="secondary" onPress={() => navigate(-1)}>
                    Quay lại
                  </Button>
                </div>
              </CardBody>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditWorkPage;
