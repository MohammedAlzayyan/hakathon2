import { Card ,Image } from "components";
import {CurveArrow } from 'components/svg'
import { useState } from "react";

export const HomeCard = () => {
  const [value, setValue] = useState(false);
  return (
    <>
      {value === false && (
        <Card className="mt-7 ml-5 max-lg:hidden">
          <div className="flex justify-between px-5">
            <h3 className="text-[#707070] font-semibold  text-xl">
              Our Services
            </h3>
            <span
              onClick={() => setValue(!value)}
              className="text-[#4375FF] cursor-pointer "
            >
              Hide
            </span>
          </div>

          <div className="flex justify-between px-10 ">
            <div className="flex flex-col items-center pt-4 text-center ">
              <Image
                alt="code verified successfully"
                src="/assets/img/home-first1.png"
                width={120}
                height={70}
                className=" mb-7"
              />
              <p className="text-lg font-bold">Create Invoice</p>
              <span className="text-[#707070]">Share it via email or link</span>
            </div>

            {/* <Image
              alt="code verified successfully"
              src="/assets/img/curved-arrow.svg"
              width={70}
              height={80}
              className=" mb-4"
            /> */}
             <div className="mt-10"><CurveArrow/></div>

            <div className=" flex flex-col items-center text-center">
              <Image
                alt="code verified successfully"
                src="/assets/img/home-second1.png"
                width={110}
                height={70}
                className=" mb-3 "
              />
              <p className="text-lg font-bold">Client Pays It</p>
              <span className="text-[#707070]">
                (PayPal - Credit Card - Bank Transfer)
              </span>
            </div>

            {/* <Image
              alt="code verified successfully"
              src="/assets/img/curved-arrow.svg"
              width={70}
              height={80}
              className=" mb-4"
            /> */}
            <div className="mt-10 mr-6"><CurveArrow/></div>

            <div className="flex flex-col items-center text-center">
              <Image
                alt="code verified successfully"
                src="/assets/img/home-third1.png"
                width={110}
                height={70}
                className="mb-3"
              />
              <p className="text-lg font-bold ">Get Paid</p>
              <span className="text-[#707070]">(Cash - Bank)</span>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};
export default HomeCard;
