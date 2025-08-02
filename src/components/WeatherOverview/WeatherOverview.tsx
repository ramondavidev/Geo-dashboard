"use client";

import React from "react";
import { WeatherOverviewProps } from "./WeatherOverview.types";
import { 
  FaThermometerHalf, 
  FaTemperatureHigh, 
  FaUsers, 
  FaChartPie 
} from "react-icons/fa";
import {
  formatTemperature,
  calculateConditionData,
  getWeatherIcon,
} from "./WeatherOverview.utils";
import {
  WeatherOverviewContainer,
  Header,
  Title,
  TitleIcon,
  StatsGrid,
  StatCard,
  StatIcon,
  StatValue,
  StatLabel,
  ConditionsSection,
  ConditionsTitle,
  ConditionsList,
  ConditionItem,
  ConditionIcon,
  ConditionInfo,
  ConditionName,
  ConditionStats,
  ConditionCount,
  ConditionPercentage,
  EmptyState,
  EmptyIcon,
  EmptyText,
} from "./WeatherOverview.styles";

export const WeatherOverview: React.FC<WeatherOverviewProps> = ({
  weatherStats,
  totalUsers,
  className,
}) => {
  if (!weatherStats || weatherStats.totalUsers === 0) {
    return (
      <WeatherOverviewContainer
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Header>
          <Title>
            <TitleIcon>🌤️</TitleIcon>
            Weather Overview
          </Title>
        </Header>
        <EmptyState>
          <EmptyIcon>🌍</EmptyIcon>
          <EmptyText>No weather data available yet</EmptyText>
        </EmptyState>
      </WeatherOverviewContainer>
    );
  }

  const conditionData = calculateConditionData(
    weatherStats.conditionCounts,
    weatherStats.totalUsers
  );

  const coveragePercentage = Math.round(
    (weatherStats.totalUsers / totalUsers) * 100
  );

  return (
    <WeatherOverviewContainer
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header>
        <Title>
          <TitleIcon>🌤️</TitleIcon>
          Weather Overview
        </Title>
      </Header>

      <StatsGrid>
        <StatCard
          className="stat-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <StatIcon $color="#F59E0B">
            <FaThermometerHalf />
          </StatIcon>
          <StatValue>{formatTemperature(weatherStats.avgTemp)}</StatValue>
          <StatLabel>Avg Temperature</StatLabel>
        </StatCard>

        <StatCard
          className="stat-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <StatIcon $color="#EF4444">
            <FaTemperatureHigh />
          </StatIcon>
          <StatValue>
            {formatTemperature(weatherStats.temperatureRange.min)} - {formatTemperature(weatherStats.temperatureRange.max)}
          </StatValue>
          <StatLabel>Temperature Range</StatLabel>
        </StatCard>

        <StatCard
          className="stat-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <StatIcon $color="#10B981">
            <FaUsers />
          </StatIcon>
          <StatValue>{weatherStats.totalUsers}</StatValue>
          <StatLabel>Users with Weather</StatLabel>
        </StatCard>

        <StatCard
          className="stat-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <StatIcon $color="#3B82F6">
            <FaChartPie />
          </StatIcon>
          <StatValue>{coveragePercentage}%</StatValue>
          <StatLabel>Weather Coverage</StatLabel>
        </StatCard>
      </StatsGrid>

      {conditionData.length > 0 && (
        <ConditionsSection>
          <ConditionsTitle>
            <span>🌈</span>
            Weather Conditions
          </ConditionsTitle>
          <ConditionsList>
            {conditionData.map((condition, index) => (
              <ConditionItem
                key={condition.condition}
                $color={condition.color}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300
                }}
                whileHover={{ scale: 1.01 }}
              >
                <ConditionIcon>
                  {getWeatherIcon(condition.condition, "unicode")}
                </ConditionIcon>
                <ConditionInfo>
                  <ConditionName>{condition.condition}</ConditionName>
                  <ConditionStats>
                    <ConditionCount>
                      {condition.count} user{condition.count !== 1 ? "s" : ""}
                    </ConditionCount>
                    <ConditionPercentage $color={condition.color}>
                      {condition.percentage}%
                    </ConditionPercentage>
                  </ConditionStats>
                </ConditionInfo>
              </ConditionItem>
            ))}
          </ConditionsList>
        </ConditionsSection>
      )}
    </WeatherOverviewContainer>
  );
};
