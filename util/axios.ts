import axios from "axios";

export const axiosFetcher = ({ url, params }: { url: string; params: any }) => {
  return axios.get(url, { params }).then((res) => res.data);
};
