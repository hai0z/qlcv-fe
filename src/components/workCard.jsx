import React from "react";
import {
  Card,
  CardBody,
  Avatar,
  Progress,
  Spinner,
  Checkbox,
  AvatarGroup,
} from "@nextui-org/react";
import {
  calulateWorkProgress,
  workStatusColor,
  workStatusEnumToString,
} from "../utils/work";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativetime from "dayjs/plugin/relativeTime";
import { CalendarClock, CheckCheck, MessageSquareMore } from "lucide-react";
import { useNavigate } from "react-router-dom";
dayjs.extend(relativetime);

dayjs.locale("vi");

import { motion } from "framer-motion";

export default function WorkCard({ work, index }) {
  const navigate = useNavigate();
  const workProgess = React.useMemo(() => calulateWorkProgress(work), [work]);

  const getLatestWorkRequest = React.useMemo(() => {
    if (work?.implementer.length === 0) return null;
    let latestWorkRequest = work.implementer[0].request[0];
    for (let i = 0; i < work.implementer.length; i++) {
      for (let j = 0; j < work.implementer[i].request.length; j++) {
        if (
          new Date(work.implementer[i].request[j].createdAt) >
          new Date(latestWorkRequest.createdAt)
        ) {
          latestWorkRequest = work.implementer[i].request[j];
        }
      }
    }
    return latestWorkRequest;
  }, [work]);

  const getLatestComment = React.useMemo(() => {
    return work.comments[0] || null;
  }, [work]);

  return (
    <motion.div
      key={work.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: index * 0.25 }}
    >
      <Card
        isPressable
        onPress={() => {
          navigate(`/work-info/${work.id}`);
        }}
        className="w-full my-8"
        classNames={{
          base: "poiter",
        }}
        radius="sm"
        shadow="sm"
      >
        <CardBody className="px-3 py-0 text-small text-default-400 flex flex-row p-6 gap-8">
          <div className="flex gap-5">
            <Avatar
              showFallback
              name={work.createdBy.name || work.createdBy.email}
              isBordered
              radius="full"
              size="lg"
              src={work.createdBy.avatar ? work.createdBy.avatar : ""}
            />
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-1 items-start justify-center">
              <div className="flex flex-row justify-between items-center gap w-full">
                <div className="flex flex-row gap-2 items-center">
                  {work.status === "IN_PROGRESS" && <Spinner size="sm" />}
                  <h4
                    className={`text-tiny font-semibold leading-none text-${workStatusColor(
                      work.status
                    )}`}
                  >
                    {workStatusEnumToString(work.status)}
                  </h4>
                </div>
                <div>
                  {work.status === "COMPLETED" ? (
                    <span className=" text-success text-tiny">
                      <CheckCheck />
                    </span>
                  ) : dayjs() > dayjs(work.endTime) ? (
                    <span className=" text-danger text-tiny flex flex-row items-center gap-2">
                      <CalendarClock size={20} /> Trễ hạn:{" "}
                      {dayjs().to(dayjs(work.endTime))}
                    </span>
                  ) : (
                    <span className=" text-success text-tiny">
                      Thời hạn: {dayjs().to(dayjs(work.endTime))}
                    </span>
                  )}
                </div>
              </div>
              <Progress
                value={workProgess}
                className="mt-2"
                size="sm"
                color="success"
              />
              <h2 className="text-xl font-semibold leading-none text-default-600 mt-2">
                {work.title}
              </h2>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="mt-4 ">
                Tạo lúc:{" "}
                {dayjs(work.createdAt).format("HH:mm:ss, dddd, DD/MM/YYYY  ")}
              </p>
              <AvatarGroup isBordered max={3}>
                {work.implementer.map((implementer) => (
                  <Avatar
                    size="sm"
                    key={implementer.id}
                    src={implementer.user.avatar}
                    showFallback
                    name={implementer.user.name}
                  />
                ))}
              </AvatarGroup>
            </div>
            <div className="flex flex-col">
              {getLatestWorkRequest && (
                <div className="flex flex-row items-center mt-8">
                  <div className="flex flex-row">
                    <Checkbox
                      radius="sm"
                      isSelected={getLatestWorkRequest.isCompleted}
                      size="sm"
                      color={
                        getLatestWorkRequest.isCompleted ? "success" : "danger"
                      }
                    />
                    <span className="text-tiny ml-1 text-foreground">
                      {getLatestWorkRequest?.title}
                    </span>
                  </div>
                  <span className="ml-auto text-tiny text-foreground  ">
                    Bởi: {getLatestWorkRequest?.createdBy.name} |{" "}
                    {dayjs().to(dayjs(getLatestWorkRequest?.createdAt))}
                  </span>
                </div>
              )}
              {getLatestComment && (
                <div className="flex flex-row items-center mt-8">
                  <div className="flex flex-row">
                    <MessageSquareMore size={14} />
                    <span className="text-tiny ml-3 text-foreground">
                      {getLatestComment?.content}
                    </span>
                  </div>
                  <span className="ml-auto text-tiny text-foreground">
                    Bởi: {getLatestComment?.createdBy.name} |{" "}
                    {dayjs().to(dayjs(getLatestComment.createdAt))}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
