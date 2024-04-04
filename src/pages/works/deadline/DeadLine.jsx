import React, { useEffect } from "react";
import WorkCard from "../../../components/workCard";
import useWorkStore from "../../../store/workStore";
import { useSearchParams } from "react-router-dom";
import SkeletonCard from "../../../components/skeletonCard";
import dayjs from "dayjs";

const PAGE_SIZE = 500;

const DeadLine = () => {
  const [searchParams] = useSearchParams();

  let { listWorks, getListWorks, loading } = useWorkStore((state) => state);

  useEffect(() => {
    getListWorks(Number(searchParams.get("page") || 1), PAGE_SIZE);

    window.scrollTo(0, 0);
  }, [searchParams.get("page")]);

  return (
    <div className=" flex flex-col items-center lg:mx-28 mx-6 min-h-screen pb-20 bg-background overflow-x-hidden">
      <div className="lg:pt-24 pt-8 w-full ">
        <div className="w-full flex flex-col gap-8 xl:flex-row">
          <div className="w-full xl:w-8/12 px-2">
            <h1 className="text-2xl font-bold">Công việc trễ hạn</h1>
            {loading ? (
              <div className="flex  items-center w-full flex-col">
                {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : listWorks.data.length > 0 ? (
              <div>
                {listWorks.data
                  .filter(
                    (work) =>
                      dayjs(work.endTime) < dayjs() &&
                      work.status !== "COMPLETED"
                  )
                  .map((work, index) => (
                    <WorkCard key={index} work={work} index={index} />
                  ))}
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold">Chưa có công việc</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeadLine;
