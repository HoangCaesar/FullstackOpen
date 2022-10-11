import { useState, useEffect } from 'react'
import axios from 'axios';

const Weather = ({ filterItem }) => {
    const [weather, setWeather] = useState({});
    const [icon, setIcon] = useState('');
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const day = {
        "clear sky": "01d@2x.png",
        "few clouds": "02d@2x.png",
        "scattered clouds": "03d@2x.png",
        "broken clouds": "04d@2x.png",
        "shower rain": "09d@2x.png",
        "rain": "10d@2x.png",
        "thunderstorm": "11d@2x.png",
        "snow": "13d@2x.png",
        "mist": "50d@2x.png",
        "overcast clouds": "04d@2x.png",
    }

    const night = {
        "clear sky": "01n@2x.png",
        "few clouds": "02n@2x.png",
        "scattered clouds": "03n@2x.png",
        "broken clouds": "04n@2x.png",
        "shower rain": "09n@2x.png",
        "rain": "10n@2x.png",
        "thunderstorm": "11n@2x.png",
        "snow": "13n@2x.png",
        "mist": "50n@2x.png",
        "overcast clouds": "04d@2x.png",
    }

    const temp = (Number(weather?.main?.temp) - 273.15).toFixed(2);
    // create Date object for sunrise with timezone offset

    const time = calcTime(weather?.timezone)
    const type = weather?.weather?.[0].description;
    const windSpeed = weather?.wind?.speed;

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${filterItem.capital}&appid=${apiKey}`)
            .then(res => setWeather(res.data))
    }, [filterItem])

    useEffect(() => {
        let info = {};
        if (time.hour > 6 && time.day) {
            info = day;
        } else {
            info = night;
        }
        setIcon(info[type]);
    }, [weather])

    function calcTime(offset) {
       
        const srTime = new Date((weather?.sys?.sunrise + weather?.timezone) * 1000);
        const hours = srTime.getHours();

        return {
            hour: hours.toLocaleString(),
            day: !srTime.toLocaleString().split(" ").includes("AM")
        }
    }

    return (
        <>
            <h3>Weather in {filterItem.capital[0]}</h3>
            <p>Temperature {temp} Celcius</p>
            {icon && <img src={`https://openweathermap.org/img/wn/${icon}`} alt="Weather Icon" />}
            <p>Wind: {windSpeed} m/s</p>
        </>
    )
}

export default Weather