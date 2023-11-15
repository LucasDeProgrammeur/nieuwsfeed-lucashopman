import { useEffect, useState } from "react";

const TimeDisplayer = () => {
  const [date, setDate] = useState(new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Amsterdam"})))

  useEffect(() => {
    setInterval(() => {
      setDate(new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Amsterdam"})))
    }, 60000)
  }, [])
  return (
    <>
      <div className="timePanel">
        <p>{date.getHours() + ":" + date.getMinutes().toString().padStart(2, "0")}</p>
      </div>
    </>
  );
};

export default TimeDisplayer;
