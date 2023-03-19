import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

export function RadioButton({
  selected,
  handleChange,
  children,
  label,
  className,
  disabled,
}) {
  const isSelected = selected.toLowerCase() == label.toLowerCase();
  return (
    <RadioGroup.Option
      className={`border-2 relative flex px-4 py-3 ${
        isSelected ? "border-[#4375FF]" : ""
      } cursor-pointer rounded-lg focus:outline-none ${className}`}
      onClick={handleChange}
      disabled={disabled}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-black w-4 h-4 flex justify-center items-center">
            {isSelected && (
              <span className="w-[10px] h-[10px] bg-black rounded"></span>
            )}
          </div>
          <span className={`text-lg ${isSelected ? "font-bold" : ""}`}>
            {label}
          </span>
        </div>
        {children}
      </div>
    </RadioGroup.Option>
  );
}

export default RadioButton;
