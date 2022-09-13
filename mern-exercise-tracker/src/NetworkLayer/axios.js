import axios from "axios";
import env from "react-dotenv";
import Cookies from "universal-cookie";

export const makeRequest = (url, method, data) => {
    const cookies = new Cookies();
    const token = cookies.get("token");

  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: env.BASE_URL + url,
      ...(data && {data: data}),
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
