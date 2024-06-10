import { Proxy } from "../Proxy/Proxy";

export const OnChangeTextToVoice = async (request) => {
  await Proxy("get", "/ConvertToText/onChangeTextToVoice", request);
};
