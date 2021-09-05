import axios from "axios";
import { useEffect, useState } from "react";

interface fetchRes<Record> {
  data: Record | null;
  error: Error | null;
}

export function fetchData<T>(url: string, params: object = {}): fetchRes<T> {
  return axios
    .post(url, params)
    .then((res) => {
      const { data: T } = res;
      return { data, error: null };
    })
    .catch((error) => {
      return { data: null, error: error };
    });
}

// Doesn't work with other State Components
export const useAxiosGet = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axios
      .get("/api/posts")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, loading };
};
