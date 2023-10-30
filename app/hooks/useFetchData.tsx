import { useState, useEffect } from "react";

interface FetchDataProps {
  data: any;
  isLoading: boolean;
  error: any;
}

const useFetchData = (url: string, body: any): FetchDataProps => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        if (isMounted) {
          setData(jsonData.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
          setIsLoading(false);
        }
      }
    };

    if (data === null) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [url, body, data]);

  return { data, isLoading, error };
};

export default useFetchData;
