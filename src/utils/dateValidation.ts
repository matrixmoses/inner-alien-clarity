import { startOfDay, isValid, parseISO } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

export const validateTimeRange = (start: string, end: string): boolean => {
  if (!start || !end) return false;
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  
  if (startHour > endHour) return false;
  if (startHour === endHour && startMinute >= endMinute) return false;
  
  return true;
};

export const formatDateForStorage = (date: Date): string => {
  if (!isValid(date)) {
    throw new Error("Invalid date provided");
  }
  
  // Get the user's timezone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Convert the local date to UTC, preserving the date in the user's timezone
  const utcDate = fromZonedTime(date, timeZone);
  
  // Format the date components
  const year = utcDate.getUTCFullYear();
  const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(utcDate.getUTCDate()).padStart(2, '0');
  
  console.log('Original date:', date);
  console.log('User timezone:', timeZone);
  console.log('UTC date:', utcDate);
  console.log('Formatted date for storage:', `${year}-${month}-${day}`);
  
  return `${year}-${month}-${day}`;
};

export const isBeforeToday = (date: Date): boolean => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = startOfDay(toZonedTime(new Date(), timeZone));
  const compareDate = startOfDay(toZonedTime(date, timeZone));
  return compareDate < today;
};

export const parseDateString = (dateString: string): Date | null => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return null;
    
    // Convert to user's timezone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return toZonedTime(date, timeZone);
  } catch {
    return null;
  }
};