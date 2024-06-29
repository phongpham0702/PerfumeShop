import React from "react";

type InvoiceProps = {
  invoice: {
    orderId: string;
    orderProducts: [
      {
        productId: string;
        modelId: string;
        productCapacity: string;
        unitPrice: number;
        quantity: number;
        productName: string;
        modelCapacity: string;
        productThumbnail: string;
      },
    ];
    createdAt: string;
    ownerId: string;
    receiverName: string;
    receiverEmail: string;
    receiverPhone: string;
    receiverAddress: string;
    productCount: number;
    applyVoucherTitle: string;
    discount: number;
    subTotal: number;
    total: number;
    orderPayment: string;
  };
};

const Invoice = ({ invoice }: InvoiceProps) => {
  return (
    <div>
      <h1 className="mb-8 text-center text-2xl font-medium">Your Invoice</h1>
      <div className="grid grid-cols-10">
        <div className=" col-span-10 mb-8 xl:col-span-5 xl:m-0">
          {invoice?.orderProducts.map((item) => (
            <div key={item?.productId}>
              <div className="my-2 flex gap-6">
                <div className="flex w-[100px] items-center py-4">
                  <img
                    className="max-h-[100px] w-full min-w-[100px]"
                    src={item?.productThumbnail}
                    alt="item thumbnail"
                  />
                </div>
                <div className="flex w-full items-end justify-between pr-4">
                  <div>
                    <div className="flex items-center gap-2 text-lg font-medium">
                      <span className="">{item?.productName}</span>
                    </div>

                    <div className="mt-2 flex flex-col gap-1">
                      <span>Capacity: {item?.productCapacity}</span>
                      <p>Quantity: {item?.quantity}</p>
                      <p>
                        Unit price:{" "}
                        {item?.unitPrice?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </p>
                    </div>
                  </div>

                  <span className="mt-4 text-lg font-medium">
                    Total:{" "}
                    {(
                      (item?.unitPrice || 0) * (item?.quantity || 0)
                    ).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
              </div>
              <hr className="border-1 border-dashed border-[#333]" />
            </div>
          ))}
        </div>

        <div className="col-span-10 flex flex-col gap-2 bg-[#efefef] p-6 text-lg xl:col-span-5">
          <p>
            <span className="font-medium">Order ID: </span> {invoice?.orderId}
          </p>
          <hr className="border-1 border-dashed border-[#333]" />

          <p>
            <span className="font-medium">Receiver: </span>
            {invoice?.receiverName}
          </p>
          <p>
            <span className="font-medium">Email: </span>
            {invoice?.receiverEmail}
          </p>
          <p>
            <span className="font-medium">Phone: </span>
            {invoice?.receiverPhone}
          </p>
          <p>
            <span className="font-medium">Address: </span>{" "}
            {invoice?.receiverAddress}
          </p>
          <p>
            <span className="font-medium">Product Count: </span>
            {invoice?.productCount}
          </p>
          {invoice?.applyVoucherTitle && (
            <>
              <p>
                <span className="font-medium">Apply Voucher Title: </span>
                {invoice?.applyVoucherTitle}
              </p>
              <p>
                <span className="font-medium">Discount: </span>
                {invoice?.discount}
              </p>
            </>
          )}
          <p>
            <span className="font-medium">Payment method: </span>{" "}
            {invoice?.orderPayment === "cod-payment"
              ? "Cash on delivery - COD"
              : "CARD"}
          </p>
          <p>
            <span className="font-medium">Sub Total: </span>{" "}
            {invoice?.subTotal.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <hr className="border-1 border-dashed border-[#333]" />
          <p className="text-xl">
            <span className="font-medium">Total: </span>{" "}
            {invoice?.total.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
