import { Button } from "components";
import { options } from "features/payout/data";
import { BarsIcon } from "lib/@heroicons";
import React, { useState } from "react";



export const SelectCheckBox = ({selectedOptions,setSelectedOptions}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedOptions, setSelectedOptions] = useState([]);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string) => () => {
    setSelectedOptions(value);
    console.log(selectedOptions);
  };

  // function handle(event) {
  //   const { value, checked } = event.target;
  //   if (checked === true) {
  //     setSelectedOptions(pre => [...pre, value]);
  //   } else {
  //     setSelectedOptions(pre => pre.filter(status => status !== value));
  //   }
  
  //  }
  
 
  
 console.log(selectedOptions)
  return (
    <div className="relative">
      <Button
        onClick={toggling}
        className="bg-white text-[#707070] hover:bg-slate-50 flex pl-5"
      >
        <BarsIcon className="h-5 w-5 mt-1 mr-1"/>
        <span>Filter</span>
        
      </Button>
      {isOpen && (
        <div className="mt-1 absolute right-0 shadow-md border">
            {options.map((option) => (
              <form key={option.id} className="bg-white flex p-2"   >
              <input type="checkbox" className="mr-5 mt-1 ml-2" value={option.id}  onChange={onOptionClicked(option.id)} />
              <label>
                {option.select}
              </label>
              </form>
            ))}
        </div>
      )}
    </div>
  );
};
export default SelectCheckBox;
