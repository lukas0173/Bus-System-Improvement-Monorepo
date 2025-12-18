const calculateDuration = (start: string, end: string) => {
  if (!start || !end) return "0 phút";

  // Normalize date string for better cross-platform support (e.g. Android/iOS)
  // Replaces the first space with 'T' to conform to ISO 8601 standard if missing
  const normalize = (dateStr: string) => dateStr.replace(" ", "T");

  const startDate = new Date(normalize(start));
  const endDate = new Date(normalize(end));

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    console.warn("Invalid date format in calculateDuration:", start, end);
    return "0 phút";
  }

  const diff = endDate.getTime() - startDate.getTime();
  const minutes = Math.floor(diff / 60000);
  return `${minutes} phút`;
};

export default calculateDuration;
