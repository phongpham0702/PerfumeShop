import axios from "axios";

const requestAPI = (
  endpoint: string,
  body: object,
  method: string,
  params?: unknown,
) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const instance = axios.create({ withCredentials: true, headers });

  instance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) config.headers["authorization"] = accessToken;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      // console.log("AccessToken expired");
      console.log(err);
      if (err.response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("cartCount");
        localStorage.removeItem("wishlistCount");
        window.location.href = "/login";
      }

      if (
        (err.response && err.response.status === 423) ||
        err.response.status === 404
      ) {
        try {
          const result = await instance.get(
            `${import.meta.env.VITE_SERVER_URL}/user/gain-access`,
          );
          localStorage.setItem("accessToken", result.data.metadata.AT);
          originalConfig.headers["authorization"] = result.data.metadata.AT;

          return instance(originalConfig);
        } catch (_error) {
          window.location.href = "/login";
          return Promise.reject(_error);
        }
      }
      return Promise.reject(err);
    },
  );

  return instance.request({
    method: method,
    data: body,
    url: `${import.meta.env.VITE_SERVER_URL}${endpoint}`,
    params: params,
  });
};

export default requestAPI;
