import { useState } from "react";
import { Divider, Button, Image } from "components";
import { PAYMENT_METHODS, CLIENT_FEES } from "../../data";
import { PaymentMethodValue, ClientFeesValue } from "../../types";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodValue | "">(
    ""
  );
  const [clientFee, setClientFee] = useState<ClientFeesValue>();

  const buttonClassName =
    "sm:shadow-none sm:hover:shadow-none font-medium text-sm px-2 hover:bg-gray-100 active:bg-gray-100 outline sm:text-gray-400";
  const activeButtonClassName =
    "sm:outline-gray-400 sm:bg-white hover:bg-white sm:text-black";

  return (
    <>
      <h2 className="text-lg font-medium">Choose Payment Method</h2>
      <Divider />
      <div className="my-6 flex p-1 gap-3">
        {PAYMENT_METHODS.map((method) => (
          <Button
            key={method.id}
            onClick={() => setPaymentMethod(method.value)}
            className={`flex-1 bg-transparent text-black hover:bg-gray-100 border ${
              paymentMethod === method.value
                ? "opacity-100 border-blue"
                : "opacity-50"
            }`}
          >
            <span className="flex items-center">
              <Image
                alt={method.label}
                src={method.icon}
                width={33}
                height={33}
                className={method.value === "bankTransfer" ? "opacity-50" : ""}
              />
              <span className="flex-1 text-left pl-5 text-sm">
                {method.label}
                <span className="block text-xs">{method.caption}</span>
              </span>
            </span>
          </Button>
        ))}
      </div>
      {paymentMethod && (
        <>
          <h2 className="text-lg font-medium">
            Empower a Freelancer by Helping with Fees
          </h2>
          <Divider />
          <div className="my-6 flex p-1 gap-3">
            {CLIENT_FEES.map((fee) => (
              <Button
                key={fee.id}
                onClick={() => setClientFee(fee.value)}
                className={`flex-1 bg-transparent text-black hover:bg-gray-100 border ${
                  clientFee === fee.value
                    ? "opacity-100 border-blue"
                    : "opacity-50"
                }`}
              >
                <span className="flex items-center">
                  <span className="flex-1 text-left pl-5 text-sm">
                    {fee.label}
                    <span className="block text-xs">{fee.caption}</span>
                  </span>
                  <Image
                    alt={fee.label}
                    src={fee.icon}
                    width={33}
                    height={33}
                  />
                </span>
              </Button>
            ))}
          </div>
          <span className="text-sm">Freelancer Gets $500</span>
        </>
      )}
    </>
  );
};

export default Payment;
