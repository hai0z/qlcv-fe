import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tab,
  Tabs,
  Progress,
  Spinner,
} from "@nextui-org/react";
import { Eye, FileText, MoreVertical, Sparkles } from "lucide-react";
import React, { useContext } from "react";
import parse from "html-react-parser";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import {
  calulateWorkProgress,
  workStatusColor,
  workStatusEnumToString,
} from "../../../utils/work";

import Comment from "./components/comment";
import Implementer from "./components/implementer";
import ActionButton from "./components/actionButton";
import AddMemberModal from "./components/addMemberModal";

import relativeTime from "dayjs/plugin/relativeTime";
import { motion } from "framer-motion";
import "dayjs/locale/vi";
import useWorkStore from "../../../store/workStore";
import { AuthContext } from "../../../context/authProvider";

dayjs.locale("vi");
dayjs.extend(relativeTime);

function WorkInfoPage() {
  const { work, getWorkById, setWork } = useWorkStore((state) => state);

  const { workId } = useParams();

  // const workProgess = React.useMemo(() => calulateWorkProgress(work), [work]);

  const { auth } = useContext(AuthContext);
  React.useEffect(() => {
    getWorkById(workId);
    window.scrollTo(0, 0);
    return () => {
      setWork(null);
    };
  }, []);

  if (!work) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <motion.div
      className="mx-6 lg:mx-28 min-h-screen bg-background pb-16"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="lg:pt-24 pt-8 w-full h-full">
        <div className="w-full flex flex-col gap-8 xl:flex-row">
          <div className="w-full xl:w-8/12">
            <motion.h2 className="font-bold text-lg">
              Chi tiết công việc
            </motion.h2>
            <Card className="mt-4 pb-10 p-4" radius="none" shadow="sm">
              <CardHeader className="flex flex-col justify-start items-start">
                <div className="flex flex-row justify-between w-full">
                  <div className="flex flex-row gap-4 items-center">
                    <Sparkles className="text-foreground-300" />

                    <Chip
                      color={workStatusColor(work.status)}
                      size="sm"
                      radius="sm"
                    >
                      <span className="text-tiny">
                        {workStatusEnumToString(work.status)}
                      </span>
                    </Chip>
                  </div>
                </div>
                <div className="mt-4 w-full">
                  <h2 className="font-bold text-2xl">{work.title}</h2>
                  <div className="flex flex-row justify-between items-center">
                    <p className="font-semibold text-foreground-500 mt-4 text-sm">
                      Tạo lúc:{" "}
                      {dayjs(work.createdAt).format(
                        "HH:mm:ss, dddd, DD/MM/YYYY  "
                      )}
                    </p>
                  </div>
                  {/* <Progress
                    value={workProgess}
                    isStriped
                    size="md"
                    showValueLabel
                    label=" "
                    color="success"
                    className="w-full mt-4"
                  /> */}
                </div>
              </CardHeader>
              <CardBody>
                {work.description && (
                  <>
                    <div className="flex flex-row gap-2 items-center">
                      <FileText size={16} />
                      <span>Mô tả chi tiết</span>
                    </div>
                    <div className="mt-4 prose max-w-full">
                      <span className="text-foreground">
                        {parse(work.description)}
                      </span>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>
            <div className="mt-4">
              {auth.role === "ADMIN" ? (
                <AddMemberModal />
              ) : (
                <span className="text-tiny">Người thực hiện</span>
              )}
            </div>
            <div className="mt-4 gap-4 flex flex-col">
              <Implementer />
            </div>
          </div>
          <div className="w-full xl:w-4/12 mt-[44px]">
            <div className="flex w-full flex-col">
              <Tabs aria-label="Options" radius="md" className="mx-1">
                <Tab key="overview" title="Chung">
                  <Card shadow="sm" radius="none">
                    <CardBody>
                      <div className="flex flex-row gap-4 p-2">
                        <Avatar
                          src={work.createdBy.avatar}
                          name={work.createdBy.name}
                          size="lg"
                          showFallback
                        />
                        <div>
                          <p className="text-lg font-bold">
                            {work.createdBy.name}
                          </p>
                          <p className="mt-1">
                            {work.createdBy.role === "ADMIN" ? (
                              <p className="text-danger">Quản trị viên</p>
                            ) : (
                              <p className="text-warning">Người dùng</p>
                            )}
                          </p>
                        </div>
                      </div>
                      <Divider className="my-4" />
                      <div className="p-2 my-2">
                        <div
                          className="flex flex-row  items-center"
                          style={{
                            justifyContent:
                              work.status !== "COMPLETED"
                                ? "space-between"
                                : "center",
                          }}
                        >
                          <div className="flex flex-col justify-center items-center ">
                            {work.status !== "COMPLETED" && (
                              <div className="flex flex-col items-center">
                                {dayjs(work.endTime) > dayjs() ? (
                                  <span className="text-lg">Thời hạn</span>
                                ) : (
                                  <span className="text-lg"> Trễ hạn</span>
                                )}
                                <span
                                  className={`text-2xl font-bold ${
                                    dayjs(work.endTime) > dayjs()
                                      ? "text-success"
                                      : "text-danger  "
                                  }`}
                                >
                                  {dayjs().to(dayjs(work.endTime))}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-sm ">
                              Từ{" "}
                              {dayjs(work.startTime).format(
                                "HH:mm, dddd, DD/MM/YYYY"
                              )}
                            </span>
                            <MoreVertical size={14} />
                            Đến{" "}
                            {dayjs(work.endTime).format(
                              "HH:mm, dddd, DD/MM/YYYY"
                            )}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="mt-4" radius="none" shadow="sm">
                    <CardBody>
                      <div className="w-full">
                        <ActionButton />
                      </div>
                    </CardBody>
                  </Card>
                  <div className="mt-4">
                    <Comment />
                  </div>
                </Tab>
                <Tab key="activity" title="Hoạt động gần đây">
                  <Card shadow="sm" radius="none">
                    <CardBody>
                      <div className="h-[500px]">
                        {work.WorkLog.length > 0 ? (
                          work.WorkLog?.map((item) => (
                            <div
                              key={item.id}
                              className="w-full flex flex-col gap-4 my-2"
                            >
                              <span className="text-tiny">
                                {dayjs(item.createdAt).format(
                                  "HH:mm:ss, dddd, DD/MM/YYYY  "
                                )}
                              </span>
                              <span className="text-sm text-primary">
                                {item.content}
                              </span>
                              <Divider />
                            </div>
                          ))
                        ) : (
                          <span className="text-sm ">Chưa có hoạt động</span>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default WorkInfoPage;
