import { useSWR, type Fetcher } from "lib/swr";
import { getCookie } from "lib/js-cookie";
import { COOKIES_KEYS } from "data";
import axios from "axios";
import { Button } from "components";

 const ButtonFetcher = async (url: string) => {
  const currentUser = getCookie(COOKIES_KEYS.currentUser);
  console.log(currentUser);
  const res = await axios.put(url, {
    headers: {
      Authorization: `Bearer ${currentUser?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
//bank 6410cb6387086b00f03d5f3f
//cash 640f5cb778fd73b40d217e37 /640f5ceb78fd73b40d217e72
//64121c5b7fb7075da8210629
const Buttonwitdraw = () => {
  const withdrawId = "640f5ceb78fd73b40d217e72";
  const { data, error, isLoading } = useSWR(
    `https://talents-valley-backend.herokuapp.com/api/withdraw/confirm-payout/${withdrawId}`,
    ButtonFetcher
  );
  console.log('withdraw' + data);

  let buttonText;
  if (status === "sent" || status === "ready") {
    buttonText = "Confirm Receipt";
  } else {
    buttonText = "Withdraw";
  }
  return (
    <>
      <Button
          className="mt-5 py-4 !bg-[#FFFFFF] !text-black shadow-md"
          type="submit"
          buttonSize="small"
          fullWidth
        >
          Cancel Withdrawal{" "}
        </Button>
    </>
  )
}
export default Buttonwitdraw;