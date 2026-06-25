import axios from 'axios';

export interface WeatherData {
  temp: number;
  condition: string;
  bestTime: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

const mockWeatherInfo: Record<string, WeatherData> = {
  "malibu": { temp: 24, condition: "Sunny", bestTime: "June - Sept", icon: "01d", humidity: 60, windSpeed: 12 },
  "aspen": { temp: 8, condition: "Snowy", bestTime: "Dec - Mar", icon: "13d", humidity: 45, windSpeed: 8 },
  "valais": { temp: 10, condition: "Clear Sky", bestTime: "July - Sept", icon: "02d", humidity: 50, windSpeed: 9 },
  "santorini": { temp: 26, condition: "Sunny", bestTime: "May - Oct", icon: "01d", humidity: 55, windSpeed: 15 },
  "bali": { temp: 29, condition: "Humid", bestTime: "April - Oct", icon: "09d", humidity: 80, windSpeed: 10 },
  "moab": { temp: 32, condition: "Hot & Dry", bestTime: "Oct - April", icon: "01d", humidity: 20, windSpeed: 14 },
  "tuscany": { temp: 21, condition: "Partly Cloudy", bestTime: "Apr - June", icon: "03d", humidity: 65, windSpeed: 11 },
  "palawan": { temp: 30, condition: "Tropical", bestTime: "Dec - Apr", icon: "02d", humidity: 75, windSpeed: 8 },
  "joshua tree": { temp: 23, condition: "Sunny", bestTime: "Oct - April", icon: "01d", humidity: 15, windSpeed: 16 },
  "tromso": { temp: -2, condition: "Arctic Chill", bestTime: "Nov - March", icon: "13n", humidity: 70, windSpeed: 20 },
  "rovaniemi": { temp: -4, condition: "Snowy", bestTime: "Dec - March", icon: "13d", humidity: 75, windSpeed: 10 },
  "big sur": { temp: 18, condition: "Foggy", bestTime: "June - Sept", icon: "50d", humidity: 85, windSpeed: 18 },
  "lake placid": { temp: 15, condition: "Rainy", bestTime: "May - Sept", icon: "10d", humidity: 70, windSpeed: 12 },
  "santa cruz": { temp: 19, condition: "Breezy", bestTime: "June - Sept", icon: "03d", humidity: 65, windSpeed: 14 },
  "bora bora": { temp: 28, condition: "Tropical Breeze", bestTime: "May - Oct", icon: "01d", humidity: 70, windSpeed: 9 },
  "banff": { temp: 6, condition: "Cold & Clear", bestTime: "Dec - March", icon: "03d", humidity: 50, windSpeed: 10 },
  "queenstown": { temp: 12, condition: "Clear", bestTime: "Dec - Feb", icon: "01d", humidity: 55, windSpeed: 13 },
  "provence": { temp: 22, condition: "Sunny", bestTime: "June - Aug", icon: "01d", humidity: 50, windSpeed: 7 },
  "palm springs": { temp: 34, condition: "Hot & Clear", bestTime: "Oct - Apr", icon: "01d", humidity: 22, windSpeed: 12 },
  "cusco": { temp: 14, condition: "Cool & Crisp", bestTime: "May - Sept", icon: "03d", humidity: 40, windSpeed: 8 },
};

export const getWeather = async (city: string): Promise<WeatherData> => {
  const normalizedCity = city.toLowerCase().trim();
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  if (apiKey) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = response.data;
      const condition = data.weather[0]?.main || "Clear";
      const iconCode = data.weather[0]?.icon || "01d";
      const mockInfo = mockWeatherInfo[normalizedCity] || { bestTime: "All Year round" };

      return {
        temp: Math.round(data.main.temp),
        condition,
        bestTime: mockInfo.bestTime || "Year round",
        icon: iconCode,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6),
      };
    } catch (e) {
      console.warn("Weather API call failed. Using local mock fallback.", e);
    }
  }

  // Simulate network delay for a real feeling
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockWeatherInfo[normalizedCity] || {
    temp: 20,
    condition: "Clear",
    bestTime: "Year round",
    icon: "01d",
    humidity: 50,
    windSpeed: 12,
  };
};
