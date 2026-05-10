import { IUserInfoStore } from '../types/common.interface';
import { supabase } from '../utils/supabase';

export const createOrUpdateUserInfo = async (
  id: number,
  data: IUserInfoStore,
) => {
  const currentUserInfo = await getUserInfoById(id);

  const { data: result, error } = await supabase
    .from('TeleBotUserInfo')
    .upsert({ id, userInfo: { ...currentUserInfo?.userInfo, ...data } });

  if (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
  return result;
};

export const getUserInfoById = async (id: number) => {
  const { data, error } = await supabase
    .from('TeleBotUserInfo')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching user info by id ${id}:`, error);
    throw error;
  }
  return data;
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
