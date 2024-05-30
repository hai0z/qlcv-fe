import React, { useContext, useEffect } from "react";
import WorkCard from "../components/workCard";
import ProgressChart from "../components/progressChart";
import useWorkStore from "../store/workStore";
import Paginations from "../components/pagination";
import { motion } from "framer-motion";
import Notification from "../components/notification";
import useNotificationStore from "../store/notificationStore";
import { useSearchParams } from "react-router-dom";
import SkeletonCard from "../components/skeletonCard";
import { Tab, Tabs } from "@nextui-org/react";
import { AuthContext } from "../context/authProvider";
const PAGE_SIZE = 5;

const HomePage = () => {
  const [searchParams] = useSearchParams();

  const [progressChart, setProgressChart] = React.useState([]);
  const { listWorks, getListWorks, getProgressChart, loading } = useWorkStore(
    (state) => state
  );

  const { notifications, getNotification } = useNotificationStore(
    (state) => state
  );

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    getListWorks(Number(searchParams.get("page") || 1), PAGE_SIZE);
    window.scrollTo(0, 0);
  }, [searchParams.get("page")]);

  useEffect(() => {
    (async () => {
      const data = await getProgressChart(auth.id);
      setProgressChart(data);
    })();
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
              <div className="flex flex-col gap-8 mt-8">
                {listWorks.data.map((work, index) => (
                  <WorkCard key={index} work={work} index={index} />
                ))}
              </div>
            ) : (
              <div className="w-full h-[50vh] justify-center items-center flex">
                <span>Không có dữ liệu...</span>
              </div>
            )}
            <div className="flex justify-end flex-row w-full mt-4">
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
          {listWorks.data.length > 0 && (
            <div className="w-full xl:w-4/12 px-2 xl:mt-16">
              <Tabs aria-label="Options" radius="md" className="mx-1">
                <Tab key="overview" title="Thống kê">
                  {progressChart && <ProgressChart chartData={progressChart} />}
                </Tab>
                <Tab
                  key="activity"
                  title={
                    notifications.filter((item) => item.isRead === false)
                      .length > 0
                      ? `Thông báo ${
                          notifications.filter((item) => item.isRead === false)
                            .length
                        }`
                      : "Thông báo"
                  }
                >
                  {notifications.length > 0 && (
                    <Notification data={notifications} />
                  )}
                </Tab>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
