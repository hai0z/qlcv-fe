import React from "react";
import ReactApexChart from "react-apexcharts";

function StatsChart({ data }) {
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
    <div id="chart" className="h-[50vh]">
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
          },
          xaxis: {
            categories: data.map((w) => w.name),
          },
        }}
      />
    </div>
  );
}

export default StatsChart;
