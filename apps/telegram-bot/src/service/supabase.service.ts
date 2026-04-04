import { IUserInfoStore } from '../types/commom.interface';
import { supabase } from '../utils/supabase';

export const createOrUpdateUserInfo = async (
  id: number,
  data: IUserInfoStore,
) => {
  const { data: result, error } = await supabase
    .from('TeleBotUserInfo')
    .upsert({ id, userInfo: data });

  if (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
  return result;
};

export const getUserInfoByCondition = async (
  column: string,
  value: unknown,
) => {
  const { data, error } = await supabase
    .from('TeleBotUserInfo')
    .select('*')
    .eq(column, value);

  if (error) {
    console.error(`Error fetching user info by ${column}:`, error);
    throw error;
  }
  return data;
};
