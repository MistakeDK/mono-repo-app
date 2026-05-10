import { IVNIndexSummary } from '../types/chartData.interface';

const VIETNAM_TIMEZONE = 'Asia/Ho_Chi_Minh';

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

export const isValidNotifyTime = (time?: string) =>
  Boolean(time && /^([01]\d|2[0-3]):[0-5]\d$/.test(time));

export const getVietnamDateTimeParts = () => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: VIETNAM_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());

  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value || '';

  return {
    date: `${getPart('year')}-${getPart('month')}-${getPart('day')}`,
    time: `${getPart('hour')}:${getPart('minute')}`,
  };
};
