"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { TimeZoneInfo } from "@/types";

interface TimeZoneClockProps {
  timezone: string;
  userName: string;
  size?: "sm" | "md" | "lg";
  showSeconds?: boolean;
}

const sizes = {
  sm: { width: "120px", fontSize: "0.75rem", padding: "0.5rem" },
  md: { width: "160px", fontSize: "0.875rem", padding: "0.75rem" },
  lg: { width: "200px", fontSize: "1rem", padding: "1rem" },
};

const ClockContainer = styled(motion.div)<{ $size: keyof typeof sizes }>`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ $size }) => sizes[$size].padding};
  width: ${({ $size }) => sizes[$size].width};
  color: white;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 2px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const UserName = styled.div<{ $size: keyof typeof sizes }>`
  font-size: ${({ $size }) => sizes[$size].fontSize};
  font-weight: 600;
  margin-bottom: 0.25rem;
  opacity: 0.9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TimeDisplay = styled.div<{ $size: keyof typeof sizes }>`
  font-size: ${({ $size }) => {
    const baseSizes = { sm: "1.1rem", md: "1.3rem", lg: "1.5rem" };
    return baseSizes[$size];
  }};
  font-weight: 700;
  font-family: "Monaco", "Menlo", monospace;
  margin-bottom: 0.25rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const TimezoneLabel = styled.div<{ $size: keyof typeof sizes }>`
  font-size: ${({ $size }) => {
    const baseSizes = { sm: "0.65rem", md: "0.75rem", lg: "0.85rem" };
    return baseSizes[$size];
  }};
  opacity: 0.8;
  font-weight: 500;
`;

const DateDisplay = styled.div<{ $size: keyof typeof sizes }>`
  font-size: ${({ $size }) => {
    const baseSizes = { sm: "0.6rem", md: "0.7rem", lg: "0.8rem" };
    return baseSizes[$size];
  }};
  opacity: 0.7;
  margin-top: 0.25rem;
`;

const getTimeZoneInfo = (timezone: string): TimeZoneInfo => {
  try {
    const now = new Date();
    const timeInZone = new Date(
      now.toLocaleString("en-US", { timeZone: timezone })
    );
    const utcTime = new Date(now.toUTCString());
    const offset =
      (timeInZone.getTime() - utcTime.getTime()) / (1000 * 60 * 60);

    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "short",
    });

    const parts = formatter.formatToParts(now);
    const abbreviation =
      parts.find((part) => part.type === "timeZoneName")?.value || "";

    return {
      timezone,
      localTime: timeInZone.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      offset: `UTC${offset >= 0 ? "+" : ""}${offset}`,
      abbreviation,
    };
  } catch (error) {
    console.error("Error getting timezone info:", error);
    return {
      timezone,
      localTime: new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      offset: "UTC+0",
      abbreviation: "UTC",
    };
  }
};

const formatTime = (timeString: string, showSeconds: boolean): string => {
  if (!showSeconds) {
    return timeString.substring(0, 5); // Remove seconds
  }
  return timeString;
};

const formatDate = (timezone: string): string => {
  try {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      timeZone: timezone,
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
};

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
