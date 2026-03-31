import { IUserInfoStore } from '../types/commom.interface';
import { supabase } from '../utils/supabase';

export const createUserInfo = async (id: string, data: IUserInfoStore) => {
  const { data: result, error } = await supabase
    .from('TeleBotUserInfo')
    .insert({ id: parseInt(id), userInfo: data });

  if (error) {
    console.error('Error creating user info:', error);
    throw error;
  }
  return result;
};

export const editUserInfo = async (id: string, data: IUserInfoStore) => {
  const { data: result, error } = await supabase
    .from('TeleBotUserInfo')
    .upsert({ id: parseInt(id), userInfo: data });

  if (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
  return result;
};
