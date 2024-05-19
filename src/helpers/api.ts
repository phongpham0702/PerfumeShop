import axios from "axios";

const requestAPI = (endpoint: string, body: unknown, method: string) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const instance = axios.create({ withCredentials: true, headers });

  instance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        config.headers["authorization"] = accessToken;
      }
      console.log(config.headers.authorization);
      console.log(config);

      return config;
    },
    (error) => {
      console.log(error);

      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (res) => {
      console.log(res);

      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      // console.log("AccessToken expired");
      // console.log(err);

      if (err.response && err.response.status === 404) {
        try {
          // console.log("Call refresh token api");
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
  });
};

export default requestAPI;
