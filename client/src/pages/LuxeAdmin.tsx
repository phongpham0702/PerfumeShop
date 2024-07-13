import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { ProductTable } from "../components/admin/ProductTable";
import { OrderTable } from "../components/admin/OrderTable";
const data = [
  {
    label: "Products",
    value: "products",
    desc: <ProductTable />,
  },
  {
    label: "Orders",
    value: "orders",
    desc: <OrderTable />,
  },
  {
    label: "Vouchers",
    value: "Vouchers",
    desc: `Because it's about motivating the doers. Because I'm here
    to follow my dreams and inspire other people to follow their dreams, too.`,
  },
];
const LuxeAdmin = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <header>
        <div className="w-fulls m-auto flex h-[80px] flex-col items-center justify-center border-b-[1px] border-black px-[50px] font-space text-lg">
          <div className="flex w-full cursor-pointer justify-between">
            <div className="flex items-center">
              <img
                className="w-[120px] "
                src="https://storage.googleapis.com/luxeperfume/images/logo.png"
                alt="logo"
              />
            </div>
            <button
              className="rounded-md bg-[#000] px-4 py-2 text-white"
              onClick={() => {
                localStorage.removeItem("adminToken");
                navigate("/luxe-admin-login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* body */}
      <Tabs
        value="products"
        orientation="vertical"
        className="h-[100vh] overflow-y-scroll bg-[#ecfaec]"
      >
        <TabsHeader className="h-[100vh] w-[200px] gap-2 rounded-none">
          {data.map(({ label, value }) => (
            <Tab key={value} value={value} className="h-fit text-left">
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="h-[90vh] overflow-scroll">
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value} className="py-0">
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  );
};

export default LuxeAdmin;
