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
  // Get year, month, and day in local timezone
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  // Format as YYYY-MM-DD
  return `${year}-${month}-${day}`;
};

export const isBeforeToday = (date: Date): boolean => {
  const today = startOfDay(new Date());
  const compareDate = startOfDay(date);
  return compareDate < today;
};