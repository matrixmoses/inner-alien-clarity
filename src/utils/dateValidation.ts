import { startOfDay, isValid, parseISO } from "date-fns";

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
  
  // Create a new Date object at midnight in local timezone
  const localDate = new Date(date);
  localDate.setHours(0, 0, 0, 0);
  
  // Format the date components
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');
  
  console.log('Original date:', date);
  console.log('Formatted local date:', `${year}-${month}-${day}`);
  
  return `${year}-${month}-${day}`;
};

export const isBeforeToday = (date: Date): boolean => {
  const today = startOfDay(new Date());
  const compareDate = startOfDay(date);
  return compareDate < today;
};

export const parseDateString = (dateString: string): Date | null => {
  try {
    const date = parseISO(dateString);
    return isValid(date) ? date : null;
  } catch {
    return null;
  }
};