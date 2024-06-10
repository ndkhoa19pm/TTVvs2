import axios from "axios";
import { ServerEndPoint } from "./ServerEndpoint";
import { BaseResponse } from "./BaseResponse";

export const Proxy = async (method, api, request) => {
  let result = new BaseResponse(false, "", null);
  try {
    if (method.toLowerCase() === "get") {
      let response = await axios.get(ServerEndPoint + api, request);
      result.data = response.data.data;
      result.message = response.data.message;
      result.success = response.data.success;
    } else {
      let response = await axios.post(ServerEndPoint + api, request);
      result.data = response.data.data;
      result.message = response.data.message;
      result.success = response.data.success;
    }
  } catch (error) {
    result.message = error;
  }
  return result;
};
