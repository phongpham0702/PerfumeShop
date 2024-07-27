import { useMemo, useState } from "react";
import {
  AiOutlineBook,
  AiOutlineInfoCircle,
  AiOutlineLogout,
  AiOutlineMail,
  AiOutlineUser,
  AiTwotoneLock,
} from "react-icons/ai";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { MdOutlineFilterList } from "react-icons/md";
import TabHR from "../ui/Tabs/TabHR";
import { BiLockAlt, BiHide, BiShowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AddAddressModal from "../components/user/AddAddressModal";
import requestAPI from "../helpers/api";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { IAddress } from "../interfaces/User";
import EditAddressModal from "../components/user/EditAddressModal";
import ConfirmModal from "../components/ConfirmModal";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import moment from "moment";
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
interface Order {
  _id: string;
  total: number;
  orderStatus: string;
  orderPayment: string;
  createdAt: string;
  receiverPhone: string;
  receiverAddress: string;
  productCount: number;
  orderProducts: {
    productName: string;
    productCapacity: string;
    productThumbnail: string;
    unitPrice: number;
    quantity: number;
  }[];
}
const UserAccount = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [editState, setEditState] = useState({ isOpen: false, id: "" });
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [isOpenLogoutConfirm, setIsOpenLogoutConfirm] =
    useState<boolean>(false);
  const [deleteID, setDeleteID] = useState<string>("");
  const [curPass, setCurPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [confirmNewPass, setConfirmNewPass] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [sort, setSort] = useState<string>("latest");
  const { data } = useQuery({
    queryKey: ["user profile"],
    queryFn: () => requestAPI(`/user/profile`, {}, "GET"),
  });

  const userProfile = data?.data.metadata.userProfile;

  const closeModal = () => {
    setIsOpen(false);
  };
  const closeEditModal = () => {
    setEditState((prev) => ({ ...prev, isOpen: false }));
  };

  const queryClient = useQueryClient();
  const { mutate: mutateDelete } = useMutation({
    mutationFn: () =>
      requestAPI("/user/address/", { deleteID: deleteID }, "DELETE"),
    onSuccess: () => {
      setIsOpenConfirm(false);
      queryClient.invalidateQueries({ queryKey: ["user profile"] });
      toast.success("Delete address successfully");
    },
  });
  const handleLogout = async () => {
    await requestAPI("/user/logout", {}, "GET");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("cartCount");
    localStorage.removeItem("wishlistCount");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
    toast.success("Logout successfully");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requestAPI(
        "/user/change-password",
        {
          oldPassword: curPass,
          newPassword: newPass,
          rePassword: confirmNewPass,
        },
        "POST",
      );
      setCurPass("");
      setNewPass("");
      setConfirmNewPass("");
      toast.success("Change password successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error(error.response.data.message);
    }
  };

  const { mutate: mutateDefaultAddress } = useMutation({
    mutationFn: (id: string) =>
      requestAPI("/user/address/default", {}, "GET", { default: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user profile"] });
      toast.success("Set default address successfully");
    },
  });

  const { data: products, fetchNextPage } = useInfiniteQuery({
    queryKey: ["orders", { status, sort }],
    queryFn: ({ pageParam }) =>
      requestAPI(
        `/user/profile/order-history/?type=${status}&page=${pageParam}&sort=${sort}`,
        {},
        "GET",
      ),
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
          results: item?.data?.metadata?.orders?.map((order: Order) => {
            return {
              ...order,
            };
          }),
        };
      });
  }, [products?.pages]);

  const statusList = [
    { value: "all", label: "All" },
    { value: "complete", label: "Complete" },
    { value: "cancel", label: "Cancel" },
    { value: "delivery", label: "In Delivery" },
    { value: "confirmed", label: "Confirmed" },
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
  ];
  const sortList = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
  ];
  const navs = [
    {
      id: "tab1",
      title: (
        <div className="flex items-center gap-2 p-3 text-lg">
          <span className="text-xl">
            <AiOutlineUser />
          </span>
          <p>Profile</p>
        </div>
      ),
      activeTab,
      setActiveTab,
    },
    {
      id: "tab2",
      title: (
        <div className="flex items-center gap-2 p-3 text-lg">
          <span className="text-xl">
            <AiOutlineBook />
          </span>
          <p>My Orders</p>
        </div>
      ),
      activeTab,
      setActiveTab,
    },
    {
      id: "address",
      title: (
        <div className="flex items-center gap-2 p-3 text-lg">
          <span className="text-xl">
            <AiOutlineInfoCircle />
          </span>
          <p>Address</p>
        </div>
      ),
      activeTab,
      setActiveTab,
    },
    {
      id: "tab4",
      title: (
        <div className="flex items-center gap-2 p-3 text-lg">
          <span className="text-xl">
            <BiLockAlt />
          </span>
          <p>Change Password</p>
        </div>
      ),
      activeTab,
      setActiveTab,
    },
    {
      id: "tab5",
      title: (
        <div
          onClick={() => setIsOpenLogoutConfirm(true)}
          className="flex items-center gap-2 p-3 text-lg"
        >
          <span className="text-xl">
            <AiOutlineLogout />
          </span>
          <p>Logout</p>
        </div>
      ),
      activeTab,
      setActiveTab,
    },
  ];
  const contents = [
    {
      id: "tab1",
      activeTab,
      children: (
        <div className="p-4">
          <p className="mb-10 text-2xl font-bold">
            {"Welcome " + userProfile?.FullName}
          </p>
          <div className="flex justify-center gap-6">
            <div className="flex w-[20%] flex-col items-center justify-center border border-[#ccc4c4] px-6 py-4">
              <img src="./images/total-order.png" className="w-[60px]" alt="" />
              <p>Total Order</p>
            </div>
            <div className="flex w-[20%] flex-col items-center justify-center border border-[#ccc4c4] px-6 py-4">
              <img
                src="./images/pending-order.png"
                className="w-[60px]"
                alt=""
              />
              <p>Pending Order</p>
            </div>
            <div className="flex w-[20%] flex-col items-center justify-center border border-[#ccc4c4] px-6 py-4">
              <img
                src="./images/processing-order.png"
                className="w-[60px]"
                alt=""
              />
              <p>Processing Order</p>
            </div>
            <div className="flex w-[20%] flex-col items-center justify-center border border-[#ccc4c4] px-6 py-4">
              <img
                src="./images/complete-order.png"
                className="w-[60px]"
                alt=""
              />
              <p>Complete Order</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "tab2",
      activeTab,
      children: (
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
                      {head === "Status" ? (
                        <Menu>
                          <MenuHandler>
                            <Typography className="flex cursor-pointer items-center gap-1">
                              {head} <MdOutlineFilterList />
                            </Typography>
                          </MenuHandler>
                          <MenuList>
                            {statusList.map((item) => (
                              <MenuItem
                                key={item.value}
                                onClick={() => setStatus(item.value)}
                              >
                                {item.label}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>
                      ) : head === "CreatedAt" ? (
                        <Menu>
                          <MenuHandler>
                            <Typography className="flex cursor-pointer items-center gap-1">
                              {head}{" "}
                              {sort === "latest" ? (
                                <IoIosArrowRoundDown />
                              ) : (
                                <IoIosArrowRoundUp />
                              )}
                            </Typography>
                          </MenuHandler>
                          <MenuList>
                            {sortList.map((item) => (
                              <MenuItem
                                key={item.value}
                                onClick={() => setSort(item.value)}
                              >
                                {item.label}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>
                      ) : (
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {flattedData?.map((page) =>
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
                              {item?.receiverPhone}
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
                            {moment(item?.createdAt).format(
                              "DD/MM/YYYY, h:mm:ss a",
                            )}
                          </Typography>
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
      ),
    },
    {
      id: "address",
      activeTab,
      children: (
        <>
          <div className="">
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => setIsOpen(true)}
                className="rounded-sm border  bg-[#f8b500] px-6 py-2"
              >
                + Add new address
              </button>
            </div>

            <div>
              {userProfile?.Addresses.map((item: IAddress) => (
                <div key={item._id} className="flex justify-between p-4">
                  <div>
                    <p className="text-sm text-[#112dcc]">
                      {item._id === userProfile.defaultAddress ? (
                        "Default"
                      ) : (
                        <span
                          className="cursor-pointer text-[#112dcc] hover:underline"
                          onClick={async () =>
                            mutateDefaultAddress(item?._id || "")
                          }
                        >
                          Set as Default
                        </span>
                      )}
                    </p>
                    <div className="flex gap-4">
                      <p className="font-semibold">{item.receiverName}</p> |
                      <p>{item.receiverPhoneNumber}</p> |
                      <p>Nation: {item.Nation}</p>
                    </div>
                    <p>City/Province: {item.City}</p>
                    <p>District: {item.District}</p>
                    <p>Ward/Commune: {item.Ward}</p>
                    <p>Detail: {item.addressDetail}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      className="border border-[#1a1306] px-6 py-1"
                      onClick={() =>
                        setEditState({ isOpen: true, id: item._id || "" })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="border border-[#1a1306] px-6 py-1"
                      onClick={() => {
                        setIsOpenConfirm(true);
                        setDeleteID(item._id || "");
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ),
    },
    {
      id: "tab4",
      activeTab,
      children: (
        <>
          <form
            onSubmit={handleChangePassword}
            className="mx-auto mt-4 flex w-[96%] flex-col items-center gap-6 rounded-sm p-4 font-space  sm:w-[600px]"
          >
            <div className="mx-auto flex w-[98%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-sm sm:w-[80%] sm:text-lg">
              <AiOutlineMail />
              <input
                className="w-full p-2 outline-none"
                placeholder="Enter your old password"
                type={isShowPass ? "text" : "password"}
                name="oldPassword"
                value={curPass}
                onChange={(e) => setCurPass(e.target.value)}
                required
              />
            </div>
            <div className="mx-auto flex w-[98%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-sm sm:w-[80%] sm:text-lg">
              <AiTwotoneLock />
              <input
                className="w-full p-2 outline-none"
                type={isShowPass ? "text" : "password"}
                placeholder="New password"
                name="newPassword"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                required
              />
            </div>
            <div className="gap2 mx-auto flex w-[98%] items-center rounded-sm border border-[#d5cfcf] p-2 px-4 text-sm sm:w-[80%] sm:text-lg">
              <AiTwotoneLock />
              <input
                className="w-full p-2 outline-none"
                type={isShowPass ? "text" : "password"}
                name="rePassword"
                placeholder="Confirm password"
                value={confirmNewPass}
                onChange={(e) => setConfirmNewPass(e.target.value)}
                required
              />
            </div>
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={() => setIsShowPass((prev) => !prev)}
            >
              <button type="button">
                {isShowPass ? <BiHide /> : <BiShowAlt />}
              </button>
              <span>{isShowPass ? "Hide password" : "Show password"}</span>
            </div>
            <button
              type="submit"
              className=" mt-2 w-[98%] bg-[#f50963] p-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#181717] sm:w-[80%] sm:text-lg"
            >
              Update
            </button>
          </form>
        </>
      ),
    },
    {
      id: "tab5",
      activeTab,
      children: (
        <div>
          <p>Logout</p>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto flex w-[90%] gap-4 font-inter">
      <TabHR navs={navs} contents={contents} />
      <AddAddressModal modalIsOpen={isOpen} closeModal={closeModal} />
      <EditAddressModal
        modalIsOpen={editState.isOpen}
        closeModal={closeEditModal}
        addressId={editState.id}
      />
      <ConfirmModal
        modalIsOpen={isOpenConfirm}
        closeModal={() => setIsOpenConfirm(false)}
        onOk={mutateDelete}
      />
      <ConfirmModal
        modalIsOpen={isOpenLogoutConfirm}
        closeModal={() => setIsOpenLogoutConfirm(false)}
        onOk={handleLogout}
      />
    </div>
  );
};

export default UserAccount;
