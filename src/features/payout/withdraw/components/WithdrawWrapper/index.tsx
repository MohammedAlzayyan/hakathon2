import { Card, Input, RadioButton } from "components";
import { BankIcon } from "lib/@heroicons";
import { useEffect, useState } from "react";
import Cash from "../Cash";
import Bank from "../Bank";
import { RadioGroup } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { getFieldHelperText } from "utils";
import { API_SERVICES_URLS } from "data";
import { useSwrFetch } from "hooks";

export const WithdrawWrapper = () => {
  const [selected, setSelected] = useState("CASH");
  const [amount, setAmount] = useState();
  const [lastWithdraw, setLastWithdraw] = useState();
  const { data, error, isLoading } = useSwrFetch(
    API_SERVICES_URLS.FREELANCER.LAST_WITHDRAW,
    {
      method: "GET",
      headers: {},
    }
  );
  useEffect(() => {
    if (data) {
      setLastWithdraw(data.data);
      setSelected(data.data.withdraw.typeWithdraw.toUpperCase());
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handlePaymentChange = (value) => {
    setSelected(() => value);
  };
  const handleSetAmount = (value) => {
    setAmount(() => value);
  };
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const validateNumberField = (value: string): string | boolean => {
    if (value.includes(".")) {
      return "You can't withdraw cents in cash.";
    }
    return true;
  };
  //   const handleSetAmount = (value: any) => {
  //     console.log("test ", VALIDATION_RULES.isNumber.test(value), value);
  //     if (VALIDATION_RULES.isNumber.test(value.slice(1))) {
  //       setAmount((prevAmount) =>
  //         prevAmount?.indexOf("$") === -1 ? `$${value}` : value
  //       );
  //     }
  //   };

  return (
    <>
      <Card className="mt-7 ml-5 pb-10">
        <h3 className="font-bold text-sm border-b-2 pb-2">
          Choose Payment Method
        </h3>

        <form noValidate onSubmit={onSubmit}>
          <div>
            <RadioGroup className="max-w-[450px] flex justify-center items-center gap-5 my-8 mx-auto">
              <RadioButton
                selected={selected}
                handleChange={() => handlePaymentChange("CASH")}
                label="Cash"
                className="flex-1 sm:flex-[0.5]"
              >
                <BankIcon className="w-8" />
              </RadioButton>
              <RadioButton
                selected={selected}
                handleChange={() => handlePaymentChange("BANK")}
                label="Bank"
                className={`flex-1 sm:flex-[0.5] ${
                  lastWithdraw &&
                  (!lastWithdraw.isWithdrawBankPermissionGranted
                    ? "pointer-events-none"
                    : "")
                }`}
              >
                <BankIcon className="w-8" />
              </RadioButton>
            </RadioGroup>

            {/* Amount */}
            <div className="flex justify-center">
              <div className=" w-44">
                <div className="flex justify-between items-end text-xs leading-5 mb-1">
                  <p className="text-base font-semibold">Amount</p>
                  <div>
                    <span className="font-semibold text-[#9E9E9E]">
                      Available
                    </span>{" "}
                    <span
                      className="cursor-pointer font-bold text-blue-light"
                      onClick={() =>
                        handleSetAmount(
                          "240.19".slice(0, "240.19".indexOf("."))
                        )
                      }
                    >
                      $240.19
                    </span>
                  </div>
                </div>
                <Input
                  id="amount"
                  inputSize="small"
                  inputClassName="pl-7 py-3 text-center text-2xl font-bold text-black bg-[#FDFDFD]"
                  type="number"
                  min={0}
                  max={250.19}
                  value={amount}
                  startIcon="$"
                  {...register("amount", {
                    required: "field is empty",
                    validate: validateNumberField,
                    onChange: (e) => handleSetAmount(e.target.value),
                  })}
                  helperText={getFieldHelperText(
                    "error",
                    errors.amount?.message
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center"></div>
          {/* {selected === "CASH" ? <Cash /> : <Bank />} */}
          {selected === "CASH" ? (
            <Cash selectedBalance={amount} />
          ) : (
            <Bank selectedBalance={amount} />
          )}
        </form>
      </Card>
    </>
  );
};
export default WithdrawWrapper;
