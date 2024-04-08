import React from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "next-themes";
function StatsChart({ data }) {
  const { theme } = useTheme();
  const series = [
    {
      data: data.map((w) => w.totalWork),
      name: "Tổng công việc",
    },
    {
      data: data.map((w) => w.totalCompleted),
      name: "Đã hoàn thành",
    },
  ];
  return (
    <div id="chart" className="h-[75vh]">
      <ReactApexChart
        series={series}
        type="bar"
        height={"100%"}
        options={{
          plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: {
                position: "top",
              },
            },
          },
          chart: {
            type: "bar",
          },
          dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
              fontSize: "12px",
              colors: ["hsl(var(--nextui-foreground))"],
            },
          },
          tooltip: {
            theme: theme === "dark" || theme === "flat" ? "dark" : "light",
          },
          yaxis: {
            labels: {
              style: {
                colors: ["hsl(var(--nextui-foreground))"],
              },
            },
          },
          legend: {
            labels: {
              colors: [
                "hsl(var(--nextui-foreground))",
                "hsl(var(--nextui-foreground))",
              ],
            },
          },
          xaxis: {
            categories: data.map((w) => w.name),
            labels: {
              style: {
                colors: ["hsl(var(--nextui-foreground))"],
              },
            },
          },
        }}
      />
    </div>
  );
}

export default StatsChart;
