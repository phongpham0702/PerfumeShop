import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip,
  Input,
  CardFooter,
  Chip,
} from "@material-tailwind/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import requestAPI from "../../helpers/api";
import { useMemo } from "react";

interface Order {
  _id: string;
  receiverPhone: string;
  receiverAddress: string;
  productCount: number;
  total: number;
  orderStatus: string;
  orderPayment: string;
  createdAt: string;
}

const TABLE_HEAD = [
  "Phone",
  "Address",
  "Quantity",
  "Total ($)",
  "Status",
  "Payment",
  "CreatedAt",
  "",
];

export function OrderTable() {
  const { data: products, fetchNextPage } = useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: ({ pageParam }) =>
      requestAPI(`/luxe-admin/orders/${pageParam}`, {}, "GET"),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (
        lastPage?.data?.metadata?.currentPage ===
        lastPage?.data?.metadata?.totalPage
      ) {
        return undefined;
      }
      return lastPage?.data?.metadata?.currentPage + 1;
    },
  });

  const flattedData = useMemo(() => {
    return products?.pages
      ?.flatMap((page) => page)
      .map((item) => {
        return {
          page: item?.data?.metadata?.currentPage,
          results: item?.data?.metadata?.orderList?.map((order: Order) => {
            return {
              ...order,
            };
          }),
        };
      });
  }, [products?.pages]);

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Order Table
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last order
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Export
            </Button>
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
            {flattedData?.map(
              (page) =>
                page?.results?.map((item: Order, index: number) => {
                  const isLast = index === page?.results?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={item._id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {item.receiverPhone}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.receiverAddress}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.productCount}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.total.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={item?.orderStatus}
                            color={
                              item?.orderStatus === "complete"
                                ? "green"
                                : item?.orderStatus === "confirm-pending" ||
                                    item?.orderStatus === "paid"
                                  ? "amber"
                                  : item?.orderStatus === "confirmed"
                                    ? "blue"
                                    : item?.orderStatus === "in-delivery"
                                      ? "purple"
                                      : "red"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={
                              item?.orderPayment === "cod-payment"
                                ? "COD"
                                : "Online"
                            }
                            color={
                              item?.orderPayment === "cod-payment"
                                ? "cyan"
                                : "blue"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.createdAt}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }),
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button className="w-full" onClick={() => fetchNextPage()}>
          Load More
        </Button>
      </CardFooter>
    </Card>
  );
}
