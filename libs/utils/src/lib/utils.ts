import { v4 as uuidv4 } from 'uuid';

export const generateUUID = () => {
  return uuidv4();
};

export const convertJsonToObj = <T>(obj: string, defaultValue?: T): T => {
  try {
    return JSON.parse(obj);
  } catch {
    return defaultValue as T;
  }
};

export const convertObjToJson = (obj: unknown): string => {
  return JSON.stringify(obj);
};
