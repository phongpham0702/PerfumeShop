export interface IVoucherInfo {
  voucherTitle: string;
  voucherType: string;
  voucherValue: number;
  minOrderTotal: number;
  maxDiscountPrice: number;
}

export interface ICheckResult {
  checkCode: string;
  checkMessage: string;
  isValid: boolean;
}
