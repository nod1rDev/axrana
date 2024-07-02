import { useState, useEffect } from "react";

const Timer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const remainingTime = calculateTimeLeft(targetDate);
      setTimeLeft(remainingTime);

      if (remainingTime.total <= 0) {
        clearInterval(intervalId);
        console.log("Bajarildi");
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div>
      {timeLeft.hours.toString().padStart(2, "0")}:
      {timeLeft.minutes.toString().padStart(2, "0")}:
      {timeLeft.seconds.toString().padStart(2, "0")}
    </div>
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
  const targetDate = new Date("Tue Jul 02 2024 22:50:01 GMT+0500 (Uzbekistan Standard Time)");

  return (
    <div>
      <h1>Timer</h1>
      <Timer targetDate={targetDate} />
    </div>
  );
};

export default Timerr;
