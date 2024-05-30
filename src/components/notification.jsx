import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "../store/notificationStore";
dayjs.extend(relativeTime);

export default function Notification({ data }) {
  const navigate = useNavigate();

  const { updateNotification } = useNotificationStore();

  const handleNotificationPress = (notificationId, workId) => {
    updateNotification(notificationId).then(() => {
      navigate(`/work-info/${workId}`);
    });
  };
  return (
    <motion.div>
      <Card shadow="sm" radius="sm">
        <CardHeader className="flex justify-between items-center">
          <div className="font-bold text-xl">
            Thông báo gần đây{" "}
            {data.filter((item) => item.isRead === false).length > 0 && (
              <Chip size="sm" color="primary">
                {data.filter((item) => item.isRead === false).length}
              </Chip>
            )}
          </div>
        </CardHeader>
        <CardBody>
          <div className="h-72">
            {data.length > 0 ? (
              data?.map((item, index) => (
                <Card
                  radius="none"
                  shadow="none"
                  key={index}
                  isPressable
                  className={`w-full`}
                  onPress={() =>
                    handleNotificationPress(item.notification_id, item.workId)
                  }
                >
                  <CardBody>
                    <div className="flex flex-row  gap-4 justify-between">
                      <div className="flex flex-row items-center gap-4 flex-1">
                        <Avatar src={item?.avatar} />
                        <div className="flex-1 flex-col">
                          <div className="flex-row">
                            <span className="font-bold">
                              {item?.sender?.name}
                            </span>{" "}
                            <span className="text-sm"> {item?.message}</span>
                          </div>
                          <span
                            className={`text-xs text-foreground-400 ${
                              !item.isRead && "text-primary-500"
                            }`}
                          >
                            {dayjs(item?.timestamp).fromNow()}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-4">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            !item.isRead && "bg-primary-400"
                          }`}
                        ></div>
                      </div>
                    </div>
                    {index !== data.length - 1 && <Divider className="mt-2" />}
                  </CardBody>
                </Card>
              ))
            ) : (
              <div className="text-center">Chưa có thông báo</div>
            )}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
