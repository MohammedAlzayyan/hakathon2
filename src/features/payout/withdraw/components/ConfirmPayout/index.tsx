import { Image, Button, OtpInput, HelperText } from "components";
import { COOKIES_KEYS } from "data";
import { getCookie } from "lib/js-cookie";
import { useState } from "react";
import useFetch from "../../hook/useFetch";
import CountdownTimer from "../CountdownTimer";

export const ConfirmPayout = ({
  data,
  modalVerifyCode,
  modalAddBank,
  selectedItemBank,
}: any) => {
  const [otpCode, setOtpCode] = useState("");
  const otpChangeHandler = (value: string) => setOtpCode(value);

  const { fetchData, isLoading, error } = useFetch();
  const currentUser = getCookie(COOKIES_KEYS.currentUser);

  // CountdownTimer
  const TWO_MIN = 120 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterTwoMinutes = NOW_IN_MS + TWO_MIN;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const options = {
      method: `${selectedItemBank?._id ? "PUT" : "POST"}`,
      headers: {
        Authorization: `Bearer ${currentUser?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: selectedItemBank
        ? JSON.stringify({
            ...data,
            code: otpCode,
          })
        : JSON.stringify({
            ...data,
            code: otpCode,
            bankName: "Bank of Palesine",
          }),
    };
    // console.log({
    //   ...data,
    //   code: otpCode,
    //   bankName: "Bank of Palesine",
    // });
    data.idNumber
      ? await fetchData(options, "recipient/create")
      : await fetchData(
          options,
          `${
            selectedItemBank?._id
              ? `bank/edit/${selectedItemBank?._id}`
              : "bank/add"
          }`
        );
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-8  items-center">
      <Image
        src="/assets/img/smartphone.svg"
        width={40}
        height={50}
        alt="confirm"
      />
      <p className="w-[280px]">
        We have sent you a verification code to your phone number ********789
      </p>
      <form
        onSubmit={handleSubmit}
        className="text-center w-full flex flex-col gap-5"
      >
        <OtpInput onOtpChange={otpChangeHandler} />
        <CountdownTimer targetDate={dateTimeAfterTwoMinutes} />
        <p>
          Did not get the code?
          <span className="text-blue-light cursor-pointer"> Resend</span>
        </p>
        <Button
          type="submit"
          buttonSize="small"
          fullWidth
          onClick={() => {
            modalVerifyCode.closeModal();
            // modalAddBank.closeModal();
          }}
        >
          Continue
        </Button>
        {error && (
          <HelperText
            className="text-red w-full text-xs justify-center min-h-[20px] mb-8"
            text={error}
          />
        )}
      </form>
    </div>
  );
};
export default ConfirmPayout;
