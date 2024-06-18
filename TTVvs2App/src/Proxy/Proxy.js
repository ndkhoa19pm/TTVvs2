import axios from "axios";
import { ServerEndPoint } from "./ServerEndpoint";
import { BaseResponse } from "./BaseResponse";

export const Proxy = async (method, api, request) => {
  let result = new BaseResponse(false, "", null);
  try {
    let response;
    if (method.toLowerCase() === "get") {
      response = await axios.get(`${ServerEndPoint}${api}`, {
        params: request,
      });
    } else {
      response = await axios.post(`${ServerEndPoint}${api}`, request);
    }
    result.data = response.data.data;
    result.message = response.data.message;
    result.success = response.data.success;
  } catch (error) {
    console.error("Error in Proxy:", error);
    if (error.response) {
      result.message = `Error: ${error.response.status} - ${error.response.data}`;
    } else {
      result.message = `Error: ${error.message}`;
    }
  }
  return result;
};
export const ProxyWithFiles = async (api, request) => {
  let result = new BaseResponse(false, "", null);
  let response;
  try {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data", // Thêm Content-Type
      },
    };
    response = await axios.post(`${ServerEndPoint}${api}`, request, config);
    result.success = response?.data?.success;
    result.message = response?.data?.message;
    result.data = response?.data?.data;
  } catch (error) {
    if (error.response) {
      result.message = `Error: ${error.response.status} - ${error.response.data}`;
    } else {
      result.message = `Error: ${error.message}`;
    }
  }
  return result;
};
