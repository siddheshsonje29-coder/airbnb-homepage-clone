import React, { useEffect, useState } from 'react';
import { getWeather } from '../../services/weatherService';
import type { WeatherData } from '../../services/weatherService';
import { 
  Sun, 
  Moon, 
  Cloud, 
  CloudSun, 
  CloudRain, 
  CloudLightning, 
  Snowflake, 
  CloudFog, 
  Calendar,
  AlertCircle,
  Wind,
  Droplets
} from 'lucide-react';

interface WeatherWidgetProps {
  city: string;
}

const getLucideIcon = (iconCode: string) => {
  const code = iconCode.replace(/[dn]/, ''); // Strip day/night specifier
  switch (code) {
    case '01':
      return iconCode.endsWith('d') ? Sun : Moon;
    case '02':
      return CloudSun;
    case '03':
    case '04':
      return Cloud;
    case '09':
    case '10':
      return CloudRain;
    case '11':
      return CloudLightning;
    case '13':
      return Snowflake;
    case '50':
      return CloudFog;
    default:
      return Sun;
  }
};

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city }) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);

    getWeather(city)
      .then(res => {
        if (active) {
          setData(res);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error(err);
        if (active) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [city]);

  const travelGrade = (temp: number, condition: string) => {
    const lowerCond = condition.toLowerCase();
    if (lowerCond.includes("snow") || lowerCond.includes("chill") || temp < 0) {
      return { grade: "Adventure Grade", color: "text-blue-500", desc: "Bundle up! Excellent for snow sports and northern lights." };
    }
    if (lowerCond.includes("rain") || lowerCond.includes("storm")) {
      return { grade: "Indoor / Sightseeing", color: "text-amber-500", desc: "Expect showers. Perfect time for museum tours & dining." };
    }
    if (temp >= 18 && temp <= 27) {
      return { grade: "Perfect Travel Grade", color: "text-emerald-500", desc: "Ideal pleasant weather. Great for hiking, beach and sightseeing." };
    }
    if (temp > 27) {
      return { grade: "Hot/Sunny Grade", color: "text-rose-500", desc: "Warm temperatures. Perfect for swimming and evening cruises." };
    }
    return { grade: "Moderate Grade", color: "text-zinc-500", desc: "Fair weather. Suitable for outdoor activities with light layers." };
  };

  if (loading) {
    return (
      <div className="w-full animate-pulse border border-zinc-100 dark:border-zinc-800 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 space-y-4">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 w-1/3 rounded" />
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
          <div className="h-8 w-16 bg-zinc-200 dark:bg-zinc-700 rounded" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full border border-red-100 dark:border-red-950/20 p-5 rounded-2xl bg-red-50/50 dark:bg-red-950/5 flex items-center gap-3 text-red-700 dark:text-red-400">
        <AlertCircle className="h-5 w-5" />
        <span className="text-xs font-semibold">Failed to fetch weather forecast.</span>
      </div>
    );
  }

  const WeatherIcon = getLucideIcon(data.icon);
  const gradeInfo = travelGrade(data.temp, data.condition);

  return (
    <div className="w-full border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl bg-white dark:bg-zinc-900 transition-all shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-450">Destination Weather</span>
          <span className="text-base font-extrabold text-zinc-800 dark:text-zinc-100">{city}</span>
        </div>
        <WeatherIcon className="h-9 w-9 text-primary stroke-[1.8] animate-bounce" style={{ animationDuration: '3s' }} />
      </div>

      <div className="flex items-baseline justify-between mb-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">{data.temp}°C</span>
          <span className="text-xs font-semibold text-zinc-550 dark:text-zinc-450">{data.condition}</span>
        </div>
        
        <div className="flex items-center gap-3.5 text-xs text-zinc-550 dark:text-zinc-400">
          <div className="flex items-center gap-1">
            <Droplets className="h-3.5 w-3.5 text-blue-400" />
            <span>{data.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="h-3.5 w-3.5 text-zinc-400" />
            <span>{data.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      {/* Travel Advice */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold text-zinc-650 dark:text-zinc-350">
            Best season: <span className="font-bold text-zinc-800 dark:text-white">{data.bestTime}</span>
          </span>
        </div>

        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
          <div className={`text-xs font-bold ${gradeInfo.color} mb-0.5`}>
            {gradeInfo.grade}
          </div>
          <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-450 font-medium">
            {gradeInfo.desc}
          </p>
        </div>
      </div>

    </div>
  );
};
