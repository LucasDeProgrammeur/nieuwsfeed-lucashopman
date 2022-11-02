const getWeather = async () => {
    let result = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.111&longitude=5.1825&hourly=temperature_2m&current_weather=true&start_date=2022-11-02&end_date=2022-11-02").then(res => res.json()).then(data => {
        console.log(data.current_weather.temperature)
        return data.current_weather.temperature;
    })

    return result;
}

export default getWeather;