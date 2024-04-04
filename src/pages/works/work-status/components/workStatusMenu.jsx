import React from "react";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Avatar,
  Chip,
} from "@nextui-org/react";
import { Eye, Pencil, Trash2, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWorkStore from "../../../../store/workStore";
import dayjs from "dayjs";
function WorkStatusMenu() {
  const [workStatusCount, setWorkStatusCount] = useState({
    new: 0,
    pending: 0,
    completed: 0,
    pasue: 0,
    inProgress: 0,
    deadline: 0,
  });

  const { getListWorks } = useWorkStore((state) => state);
  useEffect(() => {
    (async () => {
      const data = await getListWorks(1, 500);
      setWorkStatusCount({
        new: data.data.filter((w) => w.status === "NEW").length,
        pending: data.data.filter((w) => w.status === "PENDING").length,
        completed: data.data.filter((w) => w.status === "COMPLETED").length,
        pasue: data.data.filter((w) => w.status === "PAUSE").length,
        inProgress: data.data.filter((w) => w.status === "IN_PROGRESS").length,
        deadline: data.data.filter(
          (w) => dayjs() > dayjs(w.endTime) && w.status !== "COMPLETED"
        ).length,
      });
    })();
  }, []);
  return (
    <div
      className="w-full xl:w-4/12 mt-[44px]"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3, delay: 0.25 }}
    >
      <Card radius="none">
        <CardHeader>
          <h2 className="font-bold text-lg">Menu</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <Listbox aria-label="Actions">
            <ListboxItem
              key="list"
              to="/work-status"
              as={Link}
              endContent={<Chip>{workStatusCount.inProgress}</Chip>}
            >
              Đang thực hiện
            </ListboxItem>
            <ListboxItem
              key="list"
              to="/work-status/new"
              as={Link}
              endContent={<Chip>{workStatusCount.new}</Chip>}
            >
              Công việc mới
            </ListboxItem>
            <ListboxItem
              key="copy"
              to="/work-status/completed"
              as={Link}
              endContent={<Chip>{workStatusCount.completed}</Chip>}
            >
              Đã hoàn thành
            </ListboxItem>
            <ListboxItem
              key="copy"
              to="/work-status/pasue"
              as={Link}
              endContent={<Chip>{workStatusCount.pasue}</Chip>}
            >
              Tạm dừng
            </ListboxItem>
            <ListboxItem
              key="copy"
              to="/work-status/pending"
              as={Link}
              endContent={<Chip>{workStatusCount.pending}</Chip>}
            >
              Chờ duyệt
            </ListboxItem>
            <ListboxItem
              key="copy"
              to="/work-status/deadline"
              as={Link}
              endContent={<Chip>{workStatusCount.deadline}</Chip>}
            >
              Trễ hẹn
            </ListboxItem>
          </Listbox>
        </CardBody>
      </Card>
    </div>
  );
}

export default WorkStatusMenu;
