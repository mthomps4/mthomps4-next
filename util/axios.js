import axios from 'axios';
import { useEffect, useState } from 'react';

export const useAxiosGet = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axios
      .get('/api/posts')
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
