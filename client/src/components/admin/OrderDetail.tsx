import { useQuery } from "@tanstack/react-query";
import React from "react";
import requestAPI from "../../helpers/api";

interface OrderDetail {
  _id: string;
  ownerType: string;
  ownerId: string;
  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;
  receiverAddress: string;
  orderProducts: {
    productId: string;
    modelId: string;
    quantity: number;
    unitPrice: number;
    _id: string;
  }[];
  productCount: number;
  applyVoucherTitle: string;
  discount: number;
  subTotal: number;
  total: number;
  orderStatus: string;
  orderPayment: string;
  createdAt: string;
  updatedAt: string;
}

const OrderDetail = ({ oid }: { oid: string }) => {
  const { data: orderDetail }: { orderDetail: OrderDetail } = useQuery({
    queryKey: ["orderDetail", oid],
    queryFn: () => requestAPI(`/luxe-admin/orders/detail/${oid}`, {}, "GET"),
  });

  return <div>OrderDetail</div>;
};

export default OrderDetail;
