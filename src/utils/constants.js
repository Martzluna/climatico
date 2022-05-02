export const colorWeather = {
     "Thunderstorm": "#EAF111",
     "Drizzle": "#6CEFFC",
     "Rain": "#0980DE",
     "Snow": "#00ECFF",
     "Clear": "#eeeef5",
     "Clouds": "#CACACA",
}

export const getHour = (time) => {
     const date = new Date(time * 1000).toLocaleTimeString("en-US", { hour: '2-digit' });
     return date
 }