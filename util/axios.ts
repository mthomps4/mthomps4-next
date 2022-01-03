import axios from "axios";

type SearchParams = {
  limit: string | number | null;
  page: string | number | null;
  search: string | null;
  // TODO
  // tag: string[] | null;
  // category: string | null;
};

type FetchArgs = {
  url: string;
  params: SearchParams;
};

export const axiosFetcher = async ({ url, params }: FetchArgs) => {
  console.log({ params });
  const res = await axios.get(url, { params });
  return res.data;
};
