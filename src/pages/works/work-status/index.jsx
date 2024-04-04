import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import useWorkStore from "../../../store/workStore";
import WorkCard from "../../../components/workCard";
import dayjs from "dayjs";

function WorkStatusPage() {
  const pathName = useLocation().pathname;

  const [works, setWorks] = React.useState([]);
  const { getListWorks } = useWorkStore((state) => state);
  useEffect(() => {
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
        <div className="mt-4" radius="none">
          {works?.map((work) => {
            return <WorkCard work={work} />;
          })}
        </div>
      </div>
    </div>
  );
}
export default WorkStatusPage;
