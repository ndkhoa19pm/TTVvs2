import { Proxy, ProxyWithFiles } from "../Proxy/Proxy";
export const OnConvertTextToFileSound = async (request) => {
  return await Proxy(
    "post",
    "/api/ConvertToText/onConvertTextToFileSound",
    request
  );
};
export const OnChangeFileToText = async (request) => {
  return await ProxyWithFiles("/api/ConvertToText/onChangeFileToText", request);
};
export const OnChangeTextToVoice = async (request) => {
  return await Proxy("get", "api/ConvertToText/onChangeTextToVoice", request);
};
