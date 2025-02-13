export const convertMSToLocalTime = (date: number) => {
  const fullDate = new Date(date);
  //get timezone as string
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toString();
  const formattedDate = fullDate.toLocaleString("en-US", {timeZone: tz, hour12: true, hour: "numeric", minute: "2-digit"})

  return formattedDate.toString();
}

export const convertMSToLocalDate = (date: number) => {
  const fullDate = new Date(date);
  const today = new Date();

  return getDayName(fullDate) + ", " + getMonthName(fullDate) + " " + fullDate.getDate();
}

const getDayName = (date: Date) => {
  const DAYS: string[] = [
    "Sun",
    "Mon", 
    "Tues", 
    "Wed", 
    "Thurs", 
    "Fri", 
    "Sat", 
  ];

  return DAYS[date.getDay()];
}

const getMonthName = (date: Date) => {
  const MONTHS: string[] = [
    "Jan",
    "Feb", 
    "Mar", 
    "Apr", 
    "May", 
    "Jun", 
    "Jul", 
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return MONTHS[date.getMonth()];
}