const getWeather = async (latitude: Number, longitude: Number) => {
  const date = new Date();
  const [split] = date.toISOString().split("T");

  let result = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,showers&current_weather=true&start_date=${split}&end_date=${split}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return result;
};

export default getWeather;
