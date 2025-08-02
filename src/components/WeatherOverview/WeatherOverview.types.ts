export interface WeatherStats {
  avgTemp: number;
  mostCommonCondition: string;
  totalUsers: number;
  conditionCounts: Record<string, number>;
  temperatureRange: {
    min: number;
    max: number;
  };
}

export interface WeatherOverviewProps {
  weatherStats: WeatherStats;
  totalUsers: number;
  className?: string;
}

export interface WeatherConditionData {
  condition: string;
  count: number;
  percentage: number;
  icon: string;
  color: string;
}
