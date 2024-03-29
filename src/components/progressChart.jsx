import { Card, CardBody, CardHeader, Progress } from "@nextui-org/react";
import { motion } from "framer-motion";
import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

export default function ProgressChart({ chartData }) {
  const getSeries = useMemo(() => {
    const completed = chartData?.data?.completed || 0;
    const inProgress = chartData?.data?.inProgress || 0;
    const pause = chartData?.data?.pause || 0;
    const pending = chartData?.data?.pending || 0;
    const newWork = chartData?.data?.new || 0;
    return [completed, newWork, pause, pending, inProgress];
  }, [chartData]);

  return (
    <motion.div
      initial={{ opacity: 0, translateX: 200 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: 200 }}
      transition={{ duration: 0.75, delay: 0.25 }}
    >
      <Card className="xl:mt-16 rounded-s-md flex flex-col p-6" shadow="sm">
        <CardHeader>
          <span className="font-bold">Tiến độ công việc</span>
        </CardHeader>
        <CardBody>
          <ReactApexChart
            type="pie"
            series={getSeries}
            options={{
              chart: {
                type: "pie",
              },
              labels: [
                "Đã hoàn thành",
                "Công việc mới",
                "Tạm ngưng",
                "Chờ duyệt",
                "Đang thực hiện",
              ],
              dataLabels: {
                style: {
                  colors: ["#fff"],
                },
              },
              legend: {
                labels: {
                  useSeriesColors: true,
                },
                fontSize: "11px",
              },
              colors: ["#17c964", "#f31260", "#f5a524", "#7828c8", "#006FEE"],
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    legend: {
                      position: "bottom",
                    },
                  },
                },
              ],
            }}
          />
          <div>
            <Progress
              value={(getSeries[0] / chartData?.totalWork) * 100 || 0}
              color="success"
              isStriped
              showValueLabel
            />
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
