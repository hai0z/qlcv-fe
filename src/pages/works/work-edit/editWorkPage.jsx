import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Spinner,
  Input,
  Textarea,
} from "@nextui-org/react";
import { CloudCog, FileText, SendHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import useWorkStore from "../../../store/workStore";
import { useNavigate, useParams } from "react-router-dom";
function EditWorkPage() {
  const navigate = useNavigate();

  const params = useParams();

  const [work, setWork] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  const [loading, setLoading] = useState(true);
  const { updateWork, getWorkById } = useWorkStore((state) => state);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await getWorkById(params.workId);
      setWork({
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
      });
      setLoading(false);
    })();
  }, []);
  console.log(work);

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
          <div
            className="w-full xl:w-8/12"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
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
                    value={work.title}
                    onChange={(e) => {
                      setWork({
                        ...work,
                        title: e.target.value,
                      });
                    }}
                    radius="none"
                    className="mt-4"
                    placeholder="Mô tả ngắn..."
                  />

                  <div className="mt-4">
                    <h4 className="text-small mb-4">Mô tả chi tiết</h4>
                    <ReactQuill
                      theme="snow"
                      value={work?.description}
                      onChange={(e) => {
                        setWork({
                          ...work,
                          description: e,
                        });
                      }}
                    />
                  </div>
                </div>
                <Divider className="mt-4" />
                <div className="flex flex-col lg:flex-row justify-between w-full gap-4  mt-10 pb-10 flex-wrap">
                  <div className="flex flex-col">
                    <span className="text-small">Thời hạn đến</span>
                    <input
                      value={dayjs(work?.endTime).format("YYYY-MM-DDTHH:mm")}
                      onChange={(e) => {
                        setWork({
                          ...work,
                          endTime: new Date(e.target.value),
                        });
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
                    onPress={() => handleUpdateWork(work)}
                  >
                    Lưu thay đổi
                  </Button>
                  <Button color="secondary" onPress={() => navigate(-1)}>
                    Quay lại
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditWorkPage;
