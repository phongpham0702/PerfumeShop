import { PencilIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  CardFooter,
} from "@material-tailwind/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import requestAPI from "../../helpers/api";
import moment from "moment";
import { useMemo, useState } from "react";
import { BiPlus } from "react-icons/bi";
import Modal from "react-responsive-modal";
import ProductDetail from "../Products/ProductDetail";

interface Product {
  createdAt: string;
  productBrand: string;
  productName: string;
  productThumbnail: string;
  sold: number;
  updatedAt: string;
  _id: string;
}

const TABLE_HEAD = ["Name", "Brand", "Sold", "CreatedAt", "UpdatedAt", ""];

export function ProductTable() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const { data: products, fetchNextPage } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) =>
      requestAPI(`/luxe-admin/product/${pageParam}`, {}, "GET"),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (
        lastPage?.data?.metadata?.productList?.currentPage ===
        lastPage?.data?.metadata?.productList?.totalPage
      ) {
        return undefined;
      }
      return lastPage?.data?.metadata?.productList?.currentPage + 1;
    },
  });

  const flattedData = useMemo(() => {
    return products?.pages
      ?.flatMap((page) => page)
      .map((item) => {
        return {
          page: item?.data?.metadata?.productList?.currentPage,
          results: item?.data?.metadata?.productList?.productList?.map(
            (movie: Product) => {
              return {
                ...movie,
              };
            },
          ),
        };
      });
  }, [products?.pages]);

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Product Table
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the product
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                crossOrigin={"anonymous"}
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <BiPlus strokeWidth={2} className="h-4 w-4" /> Add Products
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
            {flattedData?.map((page) =>
              page?.results?.map((item: Product, index: number) => {
                const isLast = index === page?.results?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr
                    key={item._id}
                    onClick={() => {
                      setOpen(true);
                      setId(item._id);
                    }}
                  >
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
                        {item?.sold}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moment(item?.createdAt).format(
                          "DD/MM/YYYY, h:mm:ss a",
                        )}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moment(item?.updatedAt).format(
                          "DD/MM/YYYY, h:mm:ss a",
                        )}
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
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <ProductDetail id={id} similar={false} />
      </Modal>
    </Card>
  );
}
