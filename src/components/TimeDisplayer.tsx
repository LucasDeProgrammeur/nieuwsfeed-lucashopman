import * as React from "react";
import getTime from "../helpers/getTime";

const TimeDisplayer = () => {
  const [time, setTime] = React.useState<string>("");

  React.useEffect(() => {
    const getTimeToSet = async () => {
      setTime(await getTime());
    };
    getTimeToSet();
  }, []);
  return (
    <>
      <div className="timePanel">
        <p>{time}</p>
      </div>
    </>
  );
};

export default TimeDisplayer;
