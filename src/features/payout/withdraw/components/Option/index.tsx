import { Divider } from "components";
import React from "react";
import { Listbox } from "@headlessui/react";

function Option({ office, withDivider }) {
  return (
    <Listbox.Option
      className={`relative cursor-pointer select-none pt-2 pl-6 pr-6 list-none`}
      value={office}
    >
      <>
        <div className={`block truncate`}>
          <div className="flex justify-between items-end mb-1">
            <span className="font-bold">{office.name}</span>
            <span className="text-xs text-gray-400">
              ساعات العمل {office.startingHour} صباحا- {office.endingHour}مساءً
            </span>
          </div>
          <div className="flex justify-between items-end text-xs text-gray-400">
            <span>{office.address}</span>
            <span>{office.fees == 0 ? "بدون عمولة" : office.fees}</span>
          </div>
        </div>
        {withDivider && <Divider />}
      </>
    </Listbox.Option>
  );
}

export default Option;
