import React from "react";
import {useCountdown} from "../libs/useCountdown";

export const Countdown: React.FC<{ to: string}> = ({ to }) => {
  const date = new Date(to);
  const { days, hours, minutes, seconds } = useCountdown(date);

  return (
    <div>
      {days ? <div><span>{days}</span> <span>days</span></div> : null}
      {hours ? <div><span>{hours}</span> <span>hours</span></div> : null}
      {minutes ? <div><span>{minutes}</span> <span>minutes</span></div> : null}
      {seconds ? <div><span>{seconds}</span> <span>seconds</span></div> : null}
    </div>
  );
}
