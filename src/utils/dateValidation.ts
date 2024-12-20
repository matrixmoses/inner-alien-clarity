import { startOfDay, format } from "date-fns";

export const validateTimeRange = (start: string, end: string): boolean => {
  if (!start || !end) return false;
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  
  if (startHour > endHour) return false;
  if (startHour === endHour && startMinute >= endMinute) return false;
  
  return true;
};

export const formatDateForStorage = (date: Date): string => {
  // Get the local date string in YYYY-MM-DD format
  return format(date, 'yyyy-MM-dd');
};

export const isBeforeToday = (date: Date): boolean => {
  const today = startOfDay(new Date());
  const compareDate = startOfDay(date);
  return compareDate < today;
};