import React, { useEffect } from "react";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Progress,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { calulateWorkProgress } from "../../utils/work";
import { motion } from "framer-motion";
import useWorkStore from "../../store/workStore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "dayjs/locale/vi";
import { useNavigate } from "react-router-dom";
dayjs.locale("vi");

function CalenderPage() {
  const navigate = useNavigate();
  const { getEvents, getTodayWorks, events, todayWorks } = useWorkStore(
    (state) => state
  );
  useEffect(() => {
    getEvents();
    getTodayWorks();
  }, []);

  return (
    <div className="mx-6 lg:mx-28 min-h-screen bg-background pb-20">
      <div className="lg:pt-24 pt-8 w-full">
        <div className="w-full flex flex-col gap-8 xl:flex-row">
          <div className="w-full xl:w-8/12">
            <Card shadow="sm" radius="none">
              <CardBody>
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  events={events}
                  initialView={"dayGridMonth"}
                  eventClick={(info) => {
                    info.jsEvent.preventDefault();
                    if (info.event.url) {
                      navigate(info.event.url);
                    }
                  }}
                  buttonText={{
                    today: "Hôm nay",
                    month: "Tháng",
                    week: "Tuần",
                    day: "Ngày",
                  }}
                  headerToolbar={{
                    center: "title",
                    left: "prev,next,today",
                    right: "dayGridDay,dayGridWeek,dayGridMonth",
                  }}
                />
              </CardBody>
            </Card>
          </div>
          <motion.div className="w-full xl:w-4/12">
            <Card radius="none" shadow="sm">
              <CardHeader>
                <span className="font-bold">Chú thích</span>
              </CardHeader>
              <CardBody>
                <div className="flex flex-row flex-wrap gap-2">
                  <Chip color="success">Đã hoàn thành</Chip>
                  <Chip color="warning">Tạm dừng</Chip>
                  <Chip color="secondary">Chờ duyệt</Chip>
                  <Chip color="primary">Đang thực hiện</Chip>
                  <Chip color="danger">Công việc mới</Chip>
                </div>
              </CardBody>
            </Card>
            <Card shadow="sm" radius="none">
              <CardBody>
                <CardHeader className="flex justify-center flex-col">
                  <h2 className="text-large font-bold">
                    Các công việc bắt đầu trong ngày hôm nay
                  </h2>
                  <span className="font-semibold text-zinc-500">
                    {dayjs().format("dddd, D MMMM YYYY")}
                  </span>
                </CardHeader>
                <Divider className="my-4" />
                {todayWorks.length > 0 ? (
                  todayWorks.map((work, index) => (
                    <motion.div
                      transition={{ delay: index * 0.25, duration: 0.3 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Link
                        to={"/work-info/" + work.id}
                        className="flex flex-row p-4 bg-foreground-100  hover:bg-foreground-200 my-2 rounded-md justify-between items-center gap-2"
                        key={work.id}
                      >
                        <div>
                          <span className="text-xl font-bold">
                            {dayjs(work.startTime).format("HH:mm")}
                          </span>
                        </div>
                        <div>
                          <Avatar
                            size="sm"
                            src={work.createdBy.avatar || ""}
                            showFallback
                            name={work.createdBy.name || ""}
                          />
                        </div>
                        <div className="w-full flex flex-col">
                          <span>{work.title}</span>
                          <Progress
                            value={calulateWorkProgress(work)}
                            size="sm"
                            color="success"
                            className="mt-1"
                          />
                        </div>
                        <ChevronRight />
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex flex-row p-4 bg-foreground-100  hover:bg-foreground-200 my-2 rounded-md justify-between items-center gap-2">
                    <span className="text-xl font-bold">0</span>
                    <div className="w-full flex flex-col">
                      <span className="text-center">Công việc</span>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CalenderPage;
