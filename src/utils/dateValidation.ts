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
  // Create a new date object at midnight in the local timezone
  const localDate = new Date(date);
  localDate.setHours(0, 0, 0, 0);
  
  // Format the date in YYYY-MM-DD format while preserving the local date
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

export const isBeforeToday = (date: Date): boolean => {
  const today = startOfDay(new Date());
  const compareDate = startOfDay(date);
  return compareDate < today;
};