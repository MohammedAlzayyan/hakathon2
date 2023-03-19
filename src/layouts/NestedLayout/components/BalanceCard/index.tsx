import React from "react";
import { Card } from "components";
import { Button } from "components";
import { PaperAirplane, DownoldIcon } from "lib/@heroicons";
export const BalanceCard = () => {
  return (
    <Card>
      <h3 className="text-[#8C8C8C] text-xl">Balance</h3>
      <div className="flex ">
        <p className="font-medium my-3 text-3xl">$250.00</p>
        <DownoldIcon className="w-5 h-5 ml-5 mt-5 bg-gray-50 " />
      </div>

      <div className="flex xl:w-[300px] ">
        <Button
          buttonSize="small"
          className=" text-blue-400 pt-0 bg-gray-50 text-sm font-normal w-full mt-4 mr-6 hover:bg-gray-50"
        >
          <span className="font-bold text-xl mr-1">+</span> Create Link
        </Button>
        <Button
          buttonSize="small"
          className=" text-blue-400  bg-gray-50  text-sm font-normal w-full mt-4 hover:bg-gray-50"
        >
          <PaperAirplane className="w-4 h-4 inline mr-2" /> Send Invoice
        </Button>
      </div>
    </Card>
  );
};
// mr-20   ml-11 max-lg:m-0
