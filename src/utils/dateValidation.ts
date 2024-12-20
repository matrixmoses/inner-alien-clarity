import { startOfDay } from "date-fns";

export const validateTimeRange = (start: string, end: string): boolean => {
  if (!start || !end) return false;
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  
  if (startHour > endHour) return false;
  if (startHour === endHour && startMinute >= endMinute) return false;
  
  return true;
};

export const formatDateForStorage = (date: Date): string => {
  // Simply get YYYY-MM-DD from the date object's local representation
  return date.toISOString().split('T')[0];
};

export const isBeforeToday = (date: Date): boolean => {
  const today = startOfDay(new Date());
  const compareDate = startOfDay(date);
  return compareDate < today;
};