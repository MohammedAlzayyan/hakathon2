import { COOKIES_KEYS } from "data";
import { getCookie } from "lib/js-cookie";
import { useSWR } from "lib/swr";

export const useSwrFetch = (subUrl, options) => {
  const url = process.env.NEXT_PUBLIC_API_ENDPOINT + "" + subUrl;
  const currentUser = getCookie(COOKIES_KEYS.currentUser);
  options.headers.Authorization = `Bearer ${currentUser.accessToken}`;
  const fetcher = (apiURL: string) =>
    fetch(apiURL, options).then((res) => res.json());

  // If GET method
  // if (options.method.toLowerCase() == "get") {
  //   //   const { data, error, isLoading } = useSWR(url, (apiURL: string) =>
  //   //   fetch(apiURL, options).then((res) => res.json())
  //   // );
  // }
  return useSWR(url, fetcher);

  // const { data, error, isLoading } = useSWR(url, (apiURL: string) =>
  //   fetch(apiURL, options).then((res) => res.json())
  // );
  // return { data, mutate, error, isLoading };

  // const fetcher = async ([url, currentUser]) => {
  //     // console.log("test" , url, currentUser)
  //     const response = await axios.get(url, {
  //         headers: {
  //             Authorization: `Bearer ${currentUser.accessToken}`,
  //         },
  //     });
  //     return response.data.data;
  // };

  // const currentUser = getCookie(COOKIES_KEYS.currentUser);

  // const { data, error, isLoading } = useSWR(["url", options, currentUser],
  //     fetcher,
  // )
};

export default useSwrFetch;
