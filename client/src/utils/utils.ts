export const convertMSToLocalDate = (date: number) => {
  const fullDate = new Date(date);
  //get timezone as string
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toString();

  return new Date(fullDate.toLocaleString("en-US", {timeZone: tz, hour12: true}));
}