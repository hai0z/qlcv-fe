import React, { useEffect } from "react";
import WorkCard from "../components/workCard";
import ProgressChart from "../components/progressChart";
import useWorkStore from "../store/workStore";
import Paginations from "../components/pagination";
import { motion } from "framer-motion";
import Notification from "../components/notification";
import useNotificationStore from "../store/notificationStore";
import { useSearchParams } from "react-router-dom";
import SkeletonCard from "../components/skeletonCard";

const PAGE_SIZE = 5;

const HomePage = () => {
  const [searchParams] = useSearchParams();

  const { listWorks, getListWorks, getProgressChart, progressChart, loading } =
    useWorkStore((state) => state);
  const { notifications, getNotification } = useNotificationStore(
    (state) => state
  );

  useEffect(() => {
    getListWorks(Number(searchParams.get("page") || 1), PAGE_SIZE);
    window.scrollTo(0, 0);
  }, [searchParams.get("page")]);

  useEffect(() => {
    getProgressChart();
    getNotification();
  }, []);

  return (
    <div className=" flex flex-col items-center lg:mx-28 mx-6 min-h-screen pb-20 bg-background overflow-x-hidden">
      <div className="lg:pt-24 pt-8 w-full ">
        <div className="w-full flex flex-col gap-8 xl:flex-row">
          <div className="w-full xl:w-8/12 px-2">
            <h1 className="text-2xl font-bold">Mới cập nhật</h1>
            {loading ? (
              <div className="flex  items-center w-full flex-col">
                {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : listWorks.data.length > 0 ? (
              <div>
                {listWorks.data.map((work, index) => (
                  <WorkCard key={index} work={work} index={index} />
                ))}
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold">Chưa có công việc</h1>
              </div>
            )}
            <div className="flex justify-end flex-row w-full">
              {listWorks.data.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Paginations
                    currentPage={Number(searchParams.get("page")) || 1}
                    totalPage={listWorks.totalPage}
                  />
                </motion.div>
              )}
            </div>
          </div>
          <div className="w-full xl:w-4/12 px-2">
            {progressChart && <ProgressChart chartData={progressChart} />}
            {notifications.length > 0 && <Notification data={notifications} />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
