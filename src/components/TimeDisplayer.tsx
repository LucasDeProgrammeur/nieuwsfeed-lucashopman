const TimeDisplayer = () => {
  
  let date = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Amsterdam"}));
  return (
    <>
      <div className="timePanel">
        <p>{date.getHours() + ":" + date.getMinutes().toString().slice(-2)}</p>
      </div>
    </>
  );
};

export default TimeDisplayer;
