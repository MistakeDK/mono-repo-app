import { NOTIFY_TIME_OPTIONS } from '../constants/vnindex-notification.constant';

export const VNINDEX_NOTIFY_TIME_PREFIX = 'vnindex_notify_time:';

export const TELEGRAM_BUTTON_TEXT = {
  vnindexInfo: 'VNIndex Info',
  registerVNIndexInfo: 'Register VNIndex Info',
  setVNIndexNotifyTime: 'Set VNIndex Notify Time',
  unregisterVNIndexInfo: 'UnRegister VNIndex Info',
} as const;

export const KNOWN_BUTTON_TEXT = new Set<string>(
  Object.values(TELEGRAM_BUTTON_TEXT),
);

export const buildMainMenuKeyboard = () => ({
  keyboard: [
    [{ text: TELEGRAM_BUTTON_TEXT.vnindexInfo }],
    [{ text: TELEGRAM_BUTTON_TEXT.registerVNIndexInfo }],
    [{ text: TELEGRAM_BUTTON_TEXT.setVNIndexNotifyTime }],
    [{ text: TELEGRAM_BUTTON_TEXT.unregisterVNIndexInfo }],
  ],
  resize_keyboard: true,
  one_time_keyboard: false,
});

export const buildNotifyTimeKeyboard = () => ({
  inline_keyboard: NOTIFY_TIME_OPTIONS.map((time) => [
    {
      text: time,
      callback_data: `${VNINDEX_NOTIFY_TIME_PREFIX}${time}`,
    },
  ]),
});
