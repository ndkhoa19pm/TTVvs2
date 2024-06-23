import AsyncStorage from "@react-native-async-storage/async-storage";
export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("my-key", value);
  } catch (e) {
    // saving error
  }
};
