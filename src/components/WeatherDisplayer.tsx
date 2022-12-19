import { useEffect, useState } from "react";
import getWeather from "../helpers/getWeather"

const WeatherDisplayer = () => {
    const [temp, setTemp] = useState(0);
    const [currentWeatherCode, setCurrentWeatherCode] = useState(0);
    const weatherCodes = [
        {code: 0, letter: "B"},
        {code: 1, letter: "B"},
        {code: 2, letter: "H"},
        {code: 3, letter: "N"},
        {code: 45, letter: "M"},
        {code: 48, letter: "M"},
        {code: 51, letter: "Q"},
        {code: 53, letter: "Q"},
        {code: 55, letter: "Q"},
        {code: 56, letter: "U"},
        {code: 57, letter: "U"},
        {code: 61, letter: "Q"},
        {code: 63, letter: "Q"},
        {code: 65, letter: "R"},
        {code: 66, letter: "Q"},
        {code: 67, letter: "T"},
        {code: 71, letter: "V"},
        {code: 73, letter: "X"},
        {code: 75, letter: "W"},
        {code: 77, letter: "X"},
    ]

    useEffect(() => {
        
        const fetchData = async () => {
            let weather = await getWeather();
            console.log("🚀 ~ file: WeatherDisplayer.tsx:12 ~ fetchData ~ weather", weather)
            setTemp(weather.temperature);
            setCurrentWeatherCode(weather.weathercode);
        }
        fetchData()

    }, []);

    return (

        <div className={"weatherPanel"}>
          <p className="weatherType">{currentWeatherCode ? weatherCodes[weatherCodes.findIndex(e => e.code === currentWeatherCode)].letter : ""}</p>  <p className="temp">{temp + " °C"}</p>
        </div>
    )
}

export default WeatherDisplayer;