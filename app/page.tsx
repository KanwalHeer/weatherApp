// "use client";
// import { useState, useEffect } from "react";
// import SearchBar from "@/components/searchBar";
// import WeatherDisplay from "../components/WeatherDisplay";
// import FavoriteCities from "../components/FavoriteCities";
// import { WeatherData } from "@/app/types/weather";

// const API_KEY = "a43cb225bda482d002879d08c4a5210b";

// const Home: React.FC = () => {
//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [favoriteCities, setFavoriteCities] = useState<string[]>(() => {
//     const storedCities = localStorage.getItem("favoriteCities");
//     return storedCities ? JSON.parse(storedCities) : [];
//   });

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
//     }
//   }, [favoriteCities]);

//   const fetchWeather = async (city: string) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//       );
//       const data: WeatherData = await response.json();
//       setWeather(data);
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const addFavoriteCity = (city: string) => {
//     if (!favoriteCities.includes(city)) {
//       setFavoriteCities([...favoriteCities, city]);
//     }
//   };

//   const removeFavoriteCity = (city: string) => {
//     setFavoriteCities(favoriteCities.filter((c) => c !== city));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4 text-center">Weather App</h1>

//       <SearchBar onSearch={fetchWeather} />
//       {weather && (
//         <div className="mt-4">
//           <WeatherDisplay weather={weather} isLoading={isLoading} />
//           <div className="flex flex-col items-center justify-center mt-4">
//             <button
//               onClick={() => addFavoriteCity(weather.name)}
//               className="mt-2 px-4 py-2 bg-slate-950 hover:bg-slate-900 text-white rounded flex flex-col items-center"
//             >
//               Add to Favorites
//             </button>
//           </div>
//         </div>
//       )}
//       {favoriteCities.length !== 0 && (
//         <div className="mt-4">
//           <FavoriteCities
//             cities={favoriteCities}
//             onCitySelect={fetchWeather}
//             onRemoveCity={removeFavoriteCity}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

"use client";
import { useState, useEffect } from "react";
import SearchBar from "@/components/searchBar";
import WeatherDisplay from "../components/WeatherDisplay";
import FavoriteCities from "../components/FavoriteCities";
import { WeatherData } from "@/app/types/weather";

const API_KEY = "a43cb225bda482d002879d08c4a5210b";

const Home: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favoriteCities, setFavoriteCities] = useState<string[]>(() => {
    const storedCities = sessionStorage.getItem("favoriteCities");
    return storedCities ? JSON.parse(storedCities) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
  }, [favoriteCities]);

  const fetchWeather = async (city: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data: WeatherData = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFavoriteCity = (city: string) => {
    if (!favoriteCities.includes(city)) {
      setFavoriteCities([...favoriteCities, city]);
    }
  };

  const removeFavoriteCity = (city: string) => {
    setFavoriteCities(favoriteCities.filter((c) => c !== city));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Weather App</h1>

      <SearchBar onSearch={fetchWeather} />
      {weather && (
        <div className="mt-4">
          <WeatherDisplay weather={weather} isLoading={isLoading} />
          <div className="flex flex-col items-center justify-center mt-4">
            <button
              onClick={() => addFavoriteCity(weather.name)}
              className="mt-2 px-4 py-2 bg-slate-950 hover:bg-slate-900 text-white rounded flex flex-col items-center"
            >
              Add to Favorites
            </button>
          </div>
        </div>
      )}
      {favoriteCities.length !== 0 && (
        <div className="mt-4">
          <FavoriteCities
            cities={favoriteCities}
            onCitySelect={fetchWeather}
            onRemoveCity={removeFavoriteCity}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
