import { Card, Input } from "components";
import RadioButton from "components/RadioButton";
import { BankIcon } from "lib/@heroicons";
import { useState } from "react";

export const WrapBalance = () => {
  const [selectedValue, setSelectedValue] = useState("cash");

  const handleRadioChange = (event: any) => {
    setSelectedValue(() => event.target.value);
  };
  return (
    <>
      <Card className="mt-7 ml-5">
        <h3 className="font-bold text-sm border-b-2 pb-2">
          Choose Payment Method
        </h3>

        <div className="flex justify-around mt-8">
          <RadioButton
            id="radio-1"
            type="radio"
            value="cash"
            checked={selectedValue === "cash"}
            name="radio"
            className="text-black"
            onChange={handleRadioChange}
            label="Cash"
          >
            <BankIcon className="w-11 ml-8" />
          </RadioButton>

          <RadioButton
            id="radio-2"
            type="radio"
            checked={selectedValue === "bank"}
            value="bank"
            name="radio"
            className="text-black"
            onChange={handleRadioChange}
            label="Bank"
          >
            <BankIcon className="w-11 ml-8" />
          </RadioButton>
        </div>
      </Card>
    </>
  );
};
