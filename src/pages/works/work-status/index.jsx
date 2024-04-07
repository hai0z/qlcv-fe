import { Avatar, Card, CardBody } from "@nextui-org/react";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useWorkStore from "../../../store/workStore";
import WorkCard from "../../../components/workCard";
import dayjs from "dayjs";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from "@nextui-org/react";
import { calulateWorkProgress } from "../../../utils/work";
function WorkStatusPage() {
  const pathName = useLocation().pathname;
  const [loading, setLoading] = React.useState(true);
  const [works, setWorks] = React.useState([]);
  const { getListWorks } = useWorkStore((state) => state);
  const navigation = useNavigate();
  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await getListWorks(1, 500);
      switch (pathName) {
        case "/work-status":
          setWorks(data.data.filter((w) => w.status === "IN_PROGRESS"));
          break;
        case "/work-status/completed":
          setWorks(data.data.filter((w) => w.status === "COMPLETED"));
          break;
        case "/work-status/pasue":
          setWorks(data.data.filter((w) => w.status === "PAUSE"));
          break;
        case "/work-status/pending":
          setWorks(data.data.filter((w) => w.status === "PENDING"));
          break;
        case "/work-status/new":
          setWorks(data.data.filter((w) => w.status === "NEW"));
          break;
        case "/work-status/deadline":
          setWorks(
            data.data.filter(
              (w) => dayjs() > dayjs(w.endTime) && w.status !== "COMPLETED"
            )
          );
          break;
        default:
          break;
      }
      setLoading(false);
    })();
  }, [pathName]);

  const pathNameMap = {
    "/work-status": "đang thực hiện",
    "/work-status/completed": "đã hoàn thành",
    "/work-status/pasue": "đã tạm dừng",
    "/work-status/pending": "chờ duyệt",
    "/work-status/deadline": "trễ hẹn",
    "/work-status/new": "mới",
  };

  const workStatus = {
    IN_PROGRESS: "đang thực hiện",
    COMPLETED: "đã hoàn thành",
    PAUSE: "đã tạm dừng",
    PENDING: "chọn duyệt",
    NEW: "Mới",
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-[50vh]">
        <CircularProgress size="md" color="primary" css={{ margin: "auto" }} />
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col gap-8 xl:flex-row">
      <div
        className="w-full"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-bold text-lg">Công việc {pathNameMap[pathName]}</h2>
        <div className="flex flex-col mt-4 gap-8">
          <Table
            aria-label="Example static collection table"
            radius="none"
            selectionMode="single"
          >
            <TableHeader>
              <TableColumn>Avatar</TableColumn>
              <TableColumn>Bởi</TableColumn>
              <TableColumn>Công việc</TableColumn>
              <TableColumn>Trạng thái</TableColumn>
              <TableColumn>Tiên độ</TableColumn>
              <TableColumn>Bắt đầu</TableColumn>
              <TableColumn>Thời hạn</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Không có dữ liệu">
              {works.map((w, index) => {
                const workProgess = () => calulateWorkProgress(w);
                return (
                  <TableRow
                    key={index}
                    className="cursor-pointer"
                    onClick={() => navigation("/work-info/" + w.id)}
                  >
                    <TableCell>
                      <Avatar isBordered src={w.createdBy.avatar} />
                    </TableCell>
                    <TableCell>{w.createdBy.name}</TableCell>
                    <TableCell>{w.title}</TableCell>
                    <TableCell>{workStatus[w.status]}</TableCell>
                    <TableCell>
                      <CircularProgress
                        aria-label="progress..."
                        size="md"
                        value={workProgess()}
                        color="success"
                        showValueLabel={true}
                      />
                    </TableCell>
                    <TableCell>
                      {dayjs(w.startTime).format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                    <TableCell>
                      {dayjs(w.endTime).format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
export default WorkStatusPage;
