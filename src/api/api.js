const apiKey= '213641eb9ae00d13ed708466a6e21d61';
const getWeather= async (city,)=>{
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then((res)=>res.json())
    .then((json)=>{
        return json;
    })
}

export default getWeather;