import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import requestAPI from "../../helpers/api";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { FaFillDrip } from "react-icons/fa";
import toast from "react-hot-toast";
import Modal from "react-responsive-modal";

export interface OutOfStockProduct {
  _id: string;
  productName: string;
  productBrand: string;
  displayPrice: number;
  priceInfo: {
    capacity: string;
    price: number;
    _id: string;
    inStock: number;
  };
  productThumbnail: string;
}

const Dashboard = () => {
  const [fillData, setFillData] = useState<{
    isOpen: boolean;
    productId: string;
    modelId: string;
  }>({ isOpen: false, productId: "", modelId: "" });
  const [amountStockFill, setAmountStockFill] = useState("");
  const { data: saleData } = useQuery({
    queryKey: ["sales"],
    queryFn: () => requestAPI("/luxe-admin/data/sale-data/2024", {}, "GET"),
  });
  const { data: outOfStockProduct } = useQuery({
    queryKey: ["outStocks"],
    queryFn: () => requestAPI("/luxe-admin/data/out-of-stock", {}, "GET"),
  });
  const profits = useMemo(
    () =>
      saleData?.data?.metadata?.map(
        (item: { month: number; profit: number }) => item.profit,
      ),
    [saleData?.data?.metadata],
  );
  const queryClient = useQueryClient();
  const { mutate: mutateFillProduct } = useMutation({
    mutationFn: (params: {
      productId: string;
      modelId: string;
      amount: number;
    }) => requestAPI("/luxe-admin/product/fill-stock", { ...params }, "POST"),
    onSuccess: () => {
      toast.success("Product filled successfully");
      queryClient.invalidateQueries({ queryKey: ["outStocks"] });
    },
    onError: () => {
      toast.error("Failed to fill product");
    },
  });

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
  const TABLE_HEAD = ["Name", "Brand", "Capacity", "Price", ""];
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

      <Card className="mt-8 h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Out of stock products
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {outOfStockProduct?.data?.metadata?.outOfStockProducts?.map(
                (item: OutOfStockProduct) => {
                  const classes = "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={item._id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={item.productThumbnail}
                            alt={item.productName}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {item.productName}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.productBrand}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.priceInfo?.capacity}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.priceInfo?.price.toLocaleString("en-US", {
                            currency: "USD",
                            style: "currency",
                          })}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Tooltip content="Fill product">
                          <IconButton
                            onClick={() =>
                              setFillData({
                                productId: item._id,
                                modelId: item.priceInfo._id,
                                isOpen: true,
                              })
                            }
                            variant="text"
                          >
                            <FaFillDrip className="h-4 w-4 text-[#023047]" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Modal
        open={fillData?.isOpen}
        onClose={() => {
          setFillData({ isOpen: false, productId: "", modelId: "" });
        }}
        center
      >
        <p className="py-6 text-center text-2xl font-bold">
          Fill product stock
        </p>
        <Input
          label="Amount"
          onChange={(e) => setAmountStockFill(e.target.value)}
        />

        <div className="mx-auto my-4 flex w-[97%] justify-end gap-4">
          <button
            onClick={() =>
              setFillData({ isOpen: false, productId: "", modelId: "" })
            }
            className="w-[150px] select-none rounded-md border border-[#333] px-6 py-2"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              mutateFillProduct({
                productId: fillData?.productId,
                modelId: fillData?.modelId,
                amount: parseInt(amountStockFill),
              });
            }}
            className="w-[150px] select-none rounded-md bg-[#333] px-6 py-2 text-white"
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
