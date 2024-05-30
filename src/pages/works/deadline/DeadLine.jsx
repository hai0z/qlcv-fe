import React, { useEffect } from "react";
import useWorkStore from "../../../store/workStore";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Avatar,
} from "@nextui-org/react";
import { calulateWorkProgress } from "../../../utils/work";
import relativetime from "dayjs/plugin/relativeTime";
dayjs.extend(relativetime);

dayjs.locale("vi");

const PAGE_SIZE = 500;

const DeadLine = () => {
  let { getListWorks } = useWorkStore((state) => state);

  const pathName = useLocation().pathname;
  const [loading, setLoading] = React.useState(true);

  const [works, setWorks] = React.useState([]);

  const threeDaysFromNow = dayjs().add(3, "day");

  const pathNameMap = {
    "/deadline": "trễ hạn",
    "/deadline/upcoming": "gần tới hạn",
  };
  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await getListWorks(1, PAGE_SIZE);
      switch (pathName) {
        case "/deadline":
          setWorks(
            data.data.filter(
              (w) => dayjs() > dayjs(w.endTime) && w.status !== "COMPLETED"
            )
          );
          break;
        case "/deadline/upcoming":
          setWorks(
            data.data.filter(
              (w) =>
                dayjs(w.endTime).isBefore(threeDaysFromNow) &&
                dayjs(w.endTime).isAfter(dayjs()) &&
                w.status !== "COMPLETED"
            )
          );
          break;
        default:
          break;
      }
      setLoading(false);
    })();
  }, [pathName]);

  const navigation = useNavigate();
  if (loading) {
    return (
      <div className="w-full h-[50vh] items-center flex flex-col justify-center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="w-full px-2">
      <h1 className="text-2xl font-bold">
        {`Công việc ${pathNameMap[pathName]}`}
      </h1>
      <div className="flex flex-col gap-8 mt-4">
        <Table
          aria-label="Example static collection table"
          radius="none"
          selectionMode="single"
        >
          <TableHeader>
            <TableColumn>Avatar</TableColumn>
            <TableColumn>Bởi</TableColumn>
            <TableColumn>Công việc</TableColumn>
            <TableColumn>Bắt đầu</TableColumn>
            <TableColumn>Thời hạn</TableColumn>
            {pathName === "/deadline" ? (
              <TableColumn>Trễ hạn</TableColumn>
            ) : (
              <TableColumn>Trong</TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent="Không có dữ liệu">
            {works.map((w, index) => {
              return (
                <TableRow
                  key={index}
                  className="cursor-pointer"
                  onClick={() => {
                    navigation(`/work-info/${w.id}`);
                  }}
                >
                  <TableCell>
                    <Avatar isBordered src={w.createdBy.avatar} />
                  </TableCell>
                  <TableCell>{w.createdBy.name}</TableCell>
                  <TableCell>{w.title}</TableCell>

                  <TableCell>
                    {dayjs(w.startTime).format("DD/MM/YYYY HH:mm")}
                  </TableCell>
                  <TableCell>
                    {dayjs(w.endTime).format("DD/MM/YYYY HH:mm")}
                  </TableCell>
                  {pathName === "/deadline" ? (
                    <TableCell>
                      <span className="text-danger-400">
                        {" "}
                        Trễ hạn: {dayjs().to(dayjs(w.endTime))}
                      </span>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <span className="text-success-400">
                        {dayjs().to(dayjs(w.endTime))}
                      </span>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default DeadLine;
