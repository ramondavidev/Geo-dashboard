import { TimeZoneInfo } from "@/types";

export const getTimeZoneInfo = (timezone: string): TimeZoneInfo => {
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

export const formatTime = (
  timeString: string,
  showSeconds: boolean
): string => {
  if (!showSeconds) {
    return timeString.substring(0, 5); // Remove seconds
  }
  return timeString;
};

export const formatDate = (timezone: string): string => {
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
