import { useEffect, useState } from "react";
import getWeather from "../helpers/getWeather";
import { WeatherCode, geoCodingData } from "../types/types";
import WeatherWidget from "./WeatherWidget";
import { json } from "stream/consumers";

interface WeatherDisplayerProps {
  weatherLocation: string;
  kioskMode: boolean;
}

const WeatherDisplayer = ({ weatherLocation, kioskMode }: WeatherDisplayerProps) => {
  const [temp, setTemp] = useState(0);
  const [currentWeatherCode, setCurrentWeatherCode] = useState(0);
  const [weather, setWeather] = useState({});
  const [widgetEnabled, setWidgetEnabled] = useState(false);
  const weatherCodes: Array<WeatherCode> = [
    {
      code: 0,
      letter: "B",
      condition: "clearSky",
      conditionDutch: "Blauwe lucht",
    },
    {
      code: 1,
      letter: "B",
      condition: "mainlyClear",
      conditionDutch: "Grotendeels opgeklaard",
    },
    {
      code: 2,
      letter: "H",
      condition: "partlyCloudy",
      conditionDutch: "Gedeeltelijk bewolkt",
    },
    {
      code: 3,
      letter: "N",
      condition: "overcast",
      conditionDutch: "Grotendeels bewolkt",
    },
    { code: 45, letter: "M", condition: "fog", conditionDutch: "Mist" },
    {
      code: 48,
      letter: "M",
      condition: "depositingRimeFog",
      conditionDutch: "Mist",
    },
    {
      code: 51,
      letter: "Q",
      condition: "drizzleLight",
      conditionDutch: "Zachte regen (miezer)",
    },
    {
      code: 53,
      letter: "Q",
      condition: "drizzleModerate",
      conditionDutch: "Redelijke miezer",
    },
    {
      code: 55,
      letter: "Q",
      condition: "drizzleDense",
      conditionDutch: "Dichte bui",
    },
    {
      code: 56,
      letter: "U",
      condition: "freezingDrizzleLight",
      conditionDutch: "Bevroren, zachte bui",
    },
    {
      code: 57,
      letter: "U",
      condition: "freezingDrizzleDense",
      conditionDutch: "Dichte bevroren bui",
    },
    {
      code: 61,
      letter: "Q",
      condition: "rainLight",
      conditionDutch: "Lichte regen",
    },
    {
      code: 63,
      letter: "Q",
      condition: "rainModerate",
      conditionDutch: "Regen",
    },
    {
      code: 65,
      letter: "R",
      condition: "rainHeavy",
      conditionDutch: "Regen hevig",
    },
    {
      code: 66,
      letter: "Q",
      condition: "freezingRainLight",
      conditionDutch: "Bevriezende regen",
    },
    {
      code: 67,
      letter: "T",
      condition: "freezingRainHeavy",
      conditionDutch: "Hevige bevriezende regen",
    },
    {
      code: 71,
      letter: "V",
      condition: "snowFallSlight",
      conditionDutch: "Lichte sneeuw",
    },
    {
      code: 73,
      letter: "X",
      condition: "snowFallModerate",
      conditionDutch: "Sneeuw",
    },
    {
      code: 75,
      letter: "W",
      condition: "snowFallHeavy",
      conditionDutch: "Hevige sneeuw",
    },
    {
      code: 77,
      letter: "X",
      condition: "snowGrains",
      conditionDutch: "Sneeuwstukjes",
    },
    {
      code: 80,
      letter: "Q",
      condition: "rainShowerLight",
      conditionDutch: "Lichte regenbui",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      let result: any = await fetch(
        `https://geocode.maps.co/search?q=${weatherLocation}`
      ).then((res) => {
        return res.json();
      });
      let weather = await getWeather(result[0].lat, result[0].lon);
      setTemp(weather.current_weather.temperature);
      setCurrentWeatherCode(weather.current_weather.weathercode);
      setWeather(weather);
      if (kioskMode) setWidgetEnabled(true)
    };
    fetchData();
  }, [weatherLocation]);

  return (
    <>
      <div
        className={
          widgetEnabled ? "weatherPanel widgetEnabled" : "weatherPanel"
        }
        onClick={() => setWidgetEnabled(!widgetEnabled)}
      >
        <p className="weatherType">
          {currentWeatherCode
            ? weatherCodes[
                weatherCodes.findIndex((e) => e.code === currentWeatherCode)
              ].letter
            : ""}
        </p>{" "}
        <p className="temp">{temp + " °C"}</p>
      </div>
      {widgetEnabled && (
        <WeatherWidget
          setWidgetEnabled={setWidgetEnabled}
          weather={weather}
          weatherCodes={weatherCodes}
          weatherLocation={weatherLocation}
          kioskMode={kioskMode}
        />
      )}
    </>
  );
};

export default WeatherDisplayer;
