import React from "react";
import { useCountdown } from "../../hook/useCountdown";

const ExpiredNotice = () => {
  return (
    <div>
      <span className="text-red">Expired!!!</span>
    </div>
  );
};

const ShowCounter = ({ minutes, seconds }: any) => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <p>{minutes}</p>
      <p>:</p>
      <p>{seconds}</p>
    </div>
  );
};

const CountdownTimer = ({ targetDate }: any) => {
  const [minutes, seconds] = useCountdown(targetDate);

  if (minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return <ShowCounter minutes={minutes} seconds={seconds} />;
  }
};

export default CountdownTimer;
