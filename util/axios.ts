import axios from "axios";

export const axiosFetcher = ({ url, params }) => {
  console.log({ url, params });
  return axios.get(url, { params }).then((res) => res.data);
};
