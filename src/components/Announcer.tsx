import { useEffect, useState } from "react";
import "./announcer.css";


const Announcer = () => { 

    const [announcement, setAnnouncement] = useState("");
    const [announcerOpen, setAnnouncerOpen] = useState(false);
    const getAnnouncement = async () => {
       let res = await fetch("https://announcer.lucashopman.nl/announcement").then(res => res.json())
       setAnnouncement(res.description)

       if (res.description) {
        setAnnouncerOpen(true)
        }
    }
    useEffect(() => {
        getAnnouncement()
    }, [])
     

    return (announcerOpen ? <div className="announcer">
        <p>{announcement}</p>
        <button onClick={() => setAnnouncerOpen(false)}>x</button>
        </div>: <></>)
}

export default Announcer;