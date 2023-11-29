"use client";

import { useEffect, useState } from "react";

const dateToLocaleString = (date: Date, timeZone: string): string => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "long", // or "short"
  });

  const localeString = formatter.format(date);

  return localeString;
};

export const DateTimeLocally = ({ date, ...props }: { date: Date; [key: string]: any }) => {
  const [dateString, setDateString] = useState<string>(date?.toISOString() ?? "Not Given");

  useEffect(() => {
    if(!date) return;

    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    setDateString(dateToLocaleString(date, browserTimeZone));
  }, [date]);

  return <time dateTime={dateString} {...props} >{dateString}</time>;
};

export default DateTimeLocally;
