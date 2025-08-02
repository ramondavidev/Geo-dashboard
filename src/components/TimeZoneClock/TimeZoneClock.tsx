"use client";

import React, { useState, useEffect } from "react";
import { TimeZoneInfo } from "@/types";
import { TimeZoneClockProps } from "./TimeZoneClock.types";
import {
  ClockContainer,
  UserName,
  TimeDisplay,
  TimezoneLabel,
  DateDisplay,
} from "./TimeZoneClock.styles";
import { getTimeZoneInfo, formatTime, formatDate } from "./TimeZoneClock.utils";

export const TimeZoneClock: React.FC<TimeZoneClockProps> = ({
  timezone,
  userName,
  size = "md",
  showSeconds = true,
}) => {
  const [timeInfo, setTimeInfo] = useState<TimeZoneInfo>(
    getTimeZoneInfo(timezone)
  );
  const [currentDate, setCurrentDate] = useState<string>(formatDate(timezone));

  useEffect(() => {
    const updateTime = () => {
      setTimeInfo(getTimeZoneInfo(timezone));
      setCurrentDate(formatDate(timezone));
    };

    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  const truncatedName =
    userName.length > 12 ? `${userName.substring(0, 12)}...` : userName;

  return (
    <ClockContainer
      $size={size}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <UserName $size={size}>{truncatedName}</UserName>
      <TimeDisplay $size={size}>
        {formatTime(timeInfo.localTime, showSeconds)}
      </TimeDisplay>
      <TimezoneLabel $size={size}>
        {timeInfo.abbreviation} ({timeInfo.offset})
      </TimezoneLabel>
      <DateDisplay $size={size}>{currentDate}</DateDisplay>
    </ClockContainer>
  );
};
