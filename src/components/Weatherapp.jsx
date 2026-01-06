import { useEffect, useState } from 'react'
import './weatherapp.css'

const Weatherapp = () => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const [searchCity, setSearchCity] = useState("Noida"); 
    const [inputCity, setInputCity] = useState("");      
    const [infodata, setinfoData] = useState(null);

    const handleSearch = () => {
    if (!inputCity.trim()) return;
    setSearchCity(inputCity);
    getWeatherdata(inputCity);
    setInputCity("");
    };

    const getWeatherdata = async (city = searchCity) => {
    if (!city.trim()) return;

    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        let res = await fetch(url);
        let data = await res.json();
        setinfoData(data);
    } catch (err) {
        console.log(err);
    }
    };


    useEffect(() => {
    getWeatherdata("Noida");
    }, []);


  return (
    <>
       <div className="maindiv">
            <div className="searchSection">
                <input
                    type="text"
                    id="input-search"
                    placeholder="Enter your city..."
                    value={inputCity}
                    onChange={(e) => setInputCity(e.target.value)} 
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                        handleSearch();
                        }
                    }}
                />
                <button className="search-button" 
                onClick={handleSearch}
                ><i className="fa-solid fa-magnifying-glass searchicon"></i></button>
      </div>    
        
            {(infodata)&& (
                <>
                    <div className="weatherSection">
                        <p>{infodata.name}, {infodata.sys.country}</p>
                        <h2>{Math.round(infodata.main.temp)}°</h2>
                        <p>{infodata.weather[0].main}</p>
                        <p>H:{Math.round(infodata.main.temp_max)}° L:{Math.round(infodata.main.temp_min)}°</p>
                    </div>
                    <div className="otherStats">
                        <div className="feelslike boxStats">Feels Like <br/>{Math.round(infodata.main.feels_like)}°C </div>
                        <div className="wind boxStats">Wind<br/>{infodata.wind.speed} km/h</div>
                        <div className="humidity boxStats">Humidity <br/>{infodata.main.humidity}%</div>
                        <div className="Pressure boxStats">Pressure <br/>{infodata.main.pressure} hPa</div>
                    </div>  
                </>
                
                

            )   
            }
           
        </div> 
    </>
  )
}

export default Weatherapp
