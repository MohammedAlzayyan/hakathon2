import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ArrowDownIcon } from "lib/@heroicons";
import Option from "../Option";
import { Image } from "components";

export function SelectList({
  selected,
  setSelected,
  selectedOptionComp,
  children,
  dir = "rtl",
}: any) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1" dir={dir}>
        <Listbox.Button
          className={`relative w-full ${
            dir == "ltr" ? "flex gap-2 items-center" : ""
          } h-20 cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left border sm:text-sm`}
        >
          {dir == "ltr" && selected && (
            <Image
              src="/assets/img/bank.svg"
              width={40}
              height={40}
              alt="dollar"
            />
          )}

          {/* Selected */}
          {selectedOptionComp()}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ArrowDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {children}
        </Transition>
      </div>
    </Listbox>
  );
}

export default SelectList;
