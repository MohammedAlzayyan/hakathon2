import { Image, Button, Divider, Modal } from "components";
import { useState } from "react";
import { MiniCard } from "../MiniCard";
import { DeleteIcon, EditIcon } from "lib/@heroicons";
import useFetch from "../../hook/useFetch";
import { getCookie } from "lib/js-cookie";
import { API_SERVICES_URLS, COOKIES_KEYS } from "data";
import { useSwrMutationFetch } from "hooks";

export const WithdrawPreview = ({
  selectedBank,
  selectedBalance,
  recipient,
  office,
  dir = "rtl",
}: any) => {
  const currentUser = getCookie(COOKIES_KEYS.currentUser);

  const { fetchData, isLoading, error } = useFetch();

  const { trigger, isMutating } = useSwrMutationFetch(
    API_SERVICES_URLS.FREELANCER.REQUEST_CASH,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  const handleConfirmWithdraw = async () => {
    const formData = {
      amount: selectedBalance,
      bankId: selectedBank?._id,
      recipientId: recipient?._id,
      officeId: office?._id,
    };
    const data = await trigger(formData);

    console.log(data);

    // const dataBank = await fetchData(options, `withdraw/request-bank`);
  };

  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="flex flex-col items-center">
        <p className=" text-gray-dark">Amount:</p>
        <p className="text-blue-light text-4xl font-semibold">
          {selectedBalance} USD
        </p>
      </div>
      <div>
        <p>Transferred to:</p>
        <MiniCard>
          <div>
            {dir == "ltr" && selectedBank ? (
              <div className="flex gap-4" dir={dir}>
                <Image
                  src="/assets/img/bank.png"
                  alt="bankd image"
                  width={35}
                  height={35}
                />
                <div>
                  <p>
                    {selectedBank?.bankName} - {selectedBank?.accountName}
                  </p>
                  <p>
                    {selectedBank?.accountNumber}-001-{selectedBank?.ledger}-000
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex text-right gap-4" dir={dir}>
                <Image
                  src="/assets/img/bank.png"
                  alt="bankd image"
                  width={35}
                  height={35}
                />
                <div>
                  <p>{office?.name}</p>
                  <p>{office?.address}</p>
                </div>
              </div>
            )}
          </div>
        </MiniCard>
      </div>

      <MiniCard>
        <div className="flex justify-between">
          <div>
            {recipient && <p>Recipient name</p>}
            <p>Transfer amount</p>
            <p>Fee</p>
          </div>
          <div>
            {recipient && <p>{recipient.name}</p>}
            <p>${selectedBalance}</p>
            <p>Free</p>
          </div>
        </div>
        <hr className="my-1 bg-gray-dark h-0.5 "></hr>
        <div className="flex justify-between">
          <p>You will get</p>
          <p>${selectedBalance}</p>
        </div>
      </MiniCard>
      <ul className="space-y-1 list-disc list-inside p-4">
        <li>Estimated arrival: 2 business days.</li>
        <li>Transfers made after 9:00 PM or on weekends takes longer.</li>
        <li>
          All transfers are subject to review and could be delayed or stopped if
          we identify an issue.
        </li>
      </ul>

      <Button
        type="submit"
        buttonSize="small"
        fullWidth
        className="text-2xl bg-blue-light"
        onClick={handleConfirmWithdraw}
      >
        Confirm
      </Button>
    </div>
  );
};
export default WithdrawPreview;
