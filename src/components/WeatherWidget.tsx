import { useEffect, useState } from "react";
import { WeatherCode } from "../types/types";
import BackButton from "./BackButton";
import { WeatherLineChart } from "./WeatherLineChart";

interface Props {
  weather: any;
  weatherCodes: Array<WeatherCode>;
  setWidgetEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const WeatherWidget = ({ weather, weatherCodes, setWidgetEnabled }: Props) => {
  const [weatherCodeEntry, setWeatherCodeEntry] = useState(weatherCodes[0]);

  useEffect(() => {
    setWeatherCodeEntry(
      weatherCodes[
        weatherCodes.findIndex((e) => e.code === weather.current_weather.weathercode)
      ]
    );
  }, [weather, weatherCodes]);
  return weatherCodeEntry ? (
    <div className={"weatherWidget " + weatherCodeEntry.condition}>
      <section className="topWeatherInfo">
        <h3>{weather.current_weather.temperature}</h3>
        <p className="tempIndicator"> °C</p>
        <p className="conditionIcon">{weatherCodeEntry.letter}</p>
      </section>
      <WeatherLineChart hourlyRain={weather.hourly.rain} hours={weather.hourly.time}/>
      <section className="bottomWeatherInfo">
        <p>De Bilt</p>
        <p>{weatherCodeEntry.conditionDutch}</p>
        <p>Windsnelheid: {weather.current_weather.windspeed} km/h</p>
      </section>
    </div>
  ) : (
    <p></p>
  );
};

export default WeatherWidget;
