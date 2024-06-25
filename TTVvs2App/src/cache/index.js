import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCache = async (key) => {
  let data = await AsyncStorage.getItem(key);
  return data != null ? JSON.parse(data) : null;
};
export const setCache = async (key, data) => {
  return await AsyncStorage.setItem(key, JSON.stringify(data));
};
export const removeCache = async (key) => {
  return await AsyncStorage.removeItem(key);
};

export const clearCache = async () => {
  return await AsyncStorage.clear();
};
export const APIKEY = {
  LANGUAGES: "@SERVERENDPOINT",
};
