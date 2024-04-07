import { Card, CardBody, CardHeader, Progress } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import ReactApexChart from "react-apexcharts";

export default function ProgressChart({ chartData }) {
  const getSeries = () => {
    const completed = chartData?.data?.completed || 0;
    const inProgress = chartData?.data?.inProgress || 0;
    const pause = chartData?.data?.pause || 0;
    const pending = chartData?.data?.pending || 0;
    const newWork = chartData?.data?.new || 0;
    return [completed, newWork, pause, pending, inProgress];
  };

  return (
    <motion.div>
      <Card className="rounded-s-md flex flex-col p-6" shadow="sm">
        <CardHeader>
          <span className="font-bold">Tiến độ công việc</span>
        </CardHeader>
        <CardBody>
          <ReactApexChart
            type="pie"
            series={getSeries()}
            options={{
              chart: {
                type: "pie",
                events: {
                  legendClick: function (chartContext, seriesIndex, config) {
                    console.log(seriesIndex);
                  },
                },
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
                fontSize: "12px",
              },
              colors: [
                "hsl(var(--nextui-success))",
                "hsl(var(--nextui-danger))",
                "hsl(var(--nextui-warning))",
                "hsl(var(--nextui-secondary))",
                "hsl(var(--nextui-primary))",
              ],
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
              value={(getSeries()[0] / chartData?.totalWork) * 100 || 0}
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
