import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import { useState, useEffect } from "react";

const Timer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));


  useEffect(() => {
    const intervalId = setInterval(() => {
      const remainingTime = calculateTimeLeft(targetDate);
      setTimeLeft(remainingTime);

      if (remainingTime.total <= 0) {
        clearInterval(intervalId);
        return <div>Bajarildi</div>;
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <>
      {timeLeft.total > 0 ? (
        <div>
          {timeLeft.hours.toString().padStart(2, "0")}:
          {timeLeft.minutes.toString().padStart(2, "0")}:
          {timeLeft.seconds.toString().padStart(2, "0")}
        </div>
      ) : (
        <div>{latinToCyrillic("00:00:00")}</div>
      )}
    </>
  );
};

const calculateTimeLeft = (targetDate: Date) => {
  const difference = targetDate.getTime() - new Date().getTime();

  const timeLeft = {
    total: difference,
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };

  return timeLeft;
};

const Timerr = ({ date }: { date: Date }) => {
  const targetDate = new Date(date);


  return (
    <div>
      <Timer targetDate={targetDate} />
    </div>
  );
};

export default Timerr;
