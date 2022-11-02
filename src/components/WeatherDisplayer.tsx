import { useEffect, useState } from "react";
import getWeather from "../helpers/getWeather"

const WeatherDisplayer = () => {
    const [temp, setTemp] = useState(0);


    useEffect(() => {

        const fetchData = async () => {
            let weather = await getWeather();
            setTemp(weather);
        }
        fetchData()

    }, []);

    return (

        <div className={"weatherPanel"}>
            {temp + " °C"}
        </div>
    )
}

export default WeatherDisplayer;