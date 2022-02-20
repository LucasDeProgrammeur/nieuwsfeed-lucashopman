import Axios from "axios"



const getTime = async () => {
    let time = new Date();
   await Axios.get("http://worldtimeapi.org/api/timezone/Europe/Amsterdam").then(response => {
        time = new Date(response.data.datetime);
        time.setHours(time.getHours() + 1)
    })

    return time.getHours() + ":" + ("0" + time.getUTCMinutes().toString()).slice(-2);

}

export default getTime;