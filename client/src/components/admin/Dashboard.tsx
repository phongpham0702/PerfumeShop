import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import requestAPI from "../../helpers/api";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import moment from "moment";

const Dashboard = () => {
  const { data: saleData } = useQuery({
    queryKey: ["sales"],
    queryFn: () => requestAPI("/luxe-admin/data/sale-data/2024", {}, "GET"),
  });
  const profits = useMemo(
    () =>
      saleData?.data?.metadata?.map(
        (item: { month: number; profit: number }) => item.profit,
      ),
    [saleData?.data?.metadata],
  );

  const chartConfig = {
    height: 240,
    series: [
      {
        name: "Sales",
        data: profits,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };
  const { data: orderCount } = useQuery({
    queryKey: ["order-count"],
    queryFn: () => requestAPI("/luxe-admin/data/order-count", {}, "GET"),
  });
  const colors = [
    "bg-[#3c096c]",
    "bg-[#ee9b00]",
    "bg-[#3a0ca3]",
    "bg-[#005f73]",
    "bg-[#bb3e03]",
    "bg-[#007200]",
  ];

  return (
    <div>
      <div className="mb-6 mt-2 flex gap-3">
        {Object?.entries(orderCount?.data?.metadata || {}).map(
          (item, index) => (
            <div
              key={item?.[0]}
              className={`flex-1 ${colors[index]} flex flex-col justify-center rounded-md p-2 text-center font-space text-white`}
            >
              <p className="text-xl font-bold capitalize">{item?.[0]}</p>
              <p className="text-xl font-bold">{item?.[1] as number}</p>
            </div>
          ),
        )}
      </div>

      <Card>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
        >
          <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
            <Square3Stack3DIcon className="h-6 w-6" />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Sales data
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="max-w-sm font-normal"
            >
              Visualize sales data in {moment(Date.now()).get("year")}
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="px-2 pb-0">
          <Chart type="bar" {...chartConfig} />
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;
