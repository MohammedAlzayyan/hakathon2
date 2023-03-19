import axios from "axios";
import { COOKIES_KEYS } from "data";
import { getCookie } from "lib/js-cookie";
import { useSWR } from "lib/swr";
import React, { useState } from "react";

function useFetch() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //   const getListOfBank = async (url: string) => {
  //     const currentUser = getCookie(COOKIES_KEYS.currentUser);
  //     const res = await axios.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${currentUser?.accessToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     return res.data;
  //   };

  //   const { data, error, isLoading } = useSWR(
  //     `https://talents-valley-backend.herokuapp.com/api/${url}`,
  //     getListOfBank
  //   );

  //   return { data, error, isLoading };

  const fetchData = async (options, url) => {
    setIsLoading(true);
    setError(null);
    const res = await fetch(
      `https://talents-valley-backend.herokuapp.com/api/${url}`,
      options
    );
    const dataJSON = await res.json();
    // console.log(dataJSON);

    if (!res.ok) {
      setIsLoading(false);
      setError(dataJSON.error);
    }
    if (res.ok) {
      setIsLoading(false);
      console.log(dataJSON);
      return dataJSON;
    }
  };
  return { fetchData, isLoading, error };
}
export default useFetch;
