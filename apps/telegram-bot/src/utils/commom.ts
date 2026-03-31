import { IVNIndexSummary } from '../types/chartData.interface';

export const mapVNIndex = (data: any): IVNIndexSummary => {
  return {
    close: data.priceClose,
    open: data.priceOpen,
    netChange: data.netChange,
    pctChange: data.pctChange,
    changeRange: {
      '7d': data.pricePctChg7d,
      '30d': data.pricePctChg30d,
      ytd: data.pricePctChgYtd,
      '1y': data.pricePctChg1y,
    },
  };
};
