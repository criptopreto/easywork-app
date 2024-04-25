import axios from "axios";

const config = axios.defaults;

const instance = (contentType = "application/json") => {
  const axiosInstance = axios.create({
    baseURL: "https://api.easywork.com.mx/v1",
    headers: {
      ...config.headers.common,
      "Content-Type": contentType,
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6W3siaWQiOiIzZmY3ODZkNi04Y2M5LTRkMjktODQxMC0xNzE5N2QyNWVmMGYiLCJuYW1lIjoidXNlciJ9XSwiaXNUd29GYWN0b3JFbmFibGVkIjpmYWxzZSwiaWF0IjoxNzEzOTg2Mzc1LCJleHAiOjE3MTM5ODk5NzUsInN1YiI6IjM3ZTNiOTQ3LWI1NmItNDNiMy1hNjE3LTMwODk3ZjRmNTE5MyJ9.LrxJsOho14juh-G17FF4l3O1AAWKv-B1PWVY0Dw2jv8",
    },
  });
  // Data Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      // console.log("error axios", Promise.reject(error))
      // throw new Error(error)
      return Promise.reject(JSON.stringify(error.response.data));
    }
  );

  return axiosInstance;
};

export default instance;
