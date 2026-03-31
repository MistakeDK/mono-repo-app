export interface IPriceChangeRange {
  '7d': number;
  '30d': number;
  ytd: number;
  '1y': number;
}

export interface IVNIndexSummary {
  close: number; // giá đóng
  open: number; // giá mở
  netChange: number; // tăng/giảm tuyệt đối
  pctChange: number; // % thay đổi trong ngày
  changeRange: IPriceChangeRange; // % theo các khoảng thời gian
}
