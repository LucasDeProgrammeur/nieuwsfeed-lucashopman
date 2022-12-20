import { useState } from "react";
import Menu from "./Menu";

const Hamburger = () => {
    const [open, setOpen] = useState(false);
  return (
    <>
    <div className={open ? "hamburger open" : "hamburger"} onClick={() => setOpen(!open)}>
      <span className="line"></span>
      <span className="line"></span>
      <span className="line"></span>{" "}
    </div>
    <Menu open={open}/>
    </>
  );
};

export default Hamburger;
