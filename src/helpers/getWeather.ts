const getWeather = async () => {
    let result = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.111&longitude=5.1825&hourly=temperature_2m,rain,showers&current_weather=true&start_date=2022-11-02&end_date=2022-11-02").then(res => res.json()).then(data => {
        return data;
    })

    return result;
}

export default getWeather;