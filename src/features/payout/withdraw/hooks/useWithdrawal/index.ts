// import { useSWR, type Fetcher } from "lib/swr";
// import axios from "lib/axios";
// import { API_SERVICES_URLS } from "data";
// import type { WithdrawalResponseData } from "../../types";

// const WithdrawalFetcher: Fetcher<WithdrawalResponseData, string> = (url) =>
//   axios.get(url).then((res) => res.data);

// export const useWithdrawal= (id: string | undefined) => {
//   const { data, error, isLoading } = useSWR(
//     id ? API_SERVICES_URLS.CLIENT.INVOICE_PREVIEW(id) : null,
//     WithdrawalFetcher
//   );
//   return { Withdrawal: data?.data, error, isLoading };
// };

// export default useWithdrawal;