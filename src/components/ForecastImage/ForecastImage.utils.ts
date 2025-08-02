export const getWeatherCondition = (description: string): string => {
  const desc = description.toLowerCase();
  if (desc.includes("rain") || desc.includes("drizzle")) return "rainy";
  if (desc.includes("snow") || desc.includes("sleet")) return "snowy";
  if (desc.includes("storm") || desc.includes("thunder")) return "stormy";
  if (desc.includes("cloud") || desc.includes("overcast")) return "cloudy";
  if (desc.includes("fog") || desc.includes("mist")) return "foggy";
  return "sunny";
};
