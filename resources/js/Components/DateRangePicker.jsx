import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 

export default function MyDateRangePicker() {
  const today = new Date(); // Get today's date
  today.setHours(0, 0, 0, 0); // Ensure time is set to midnight

  const [dateRange, setDateRange] = useState({
    startDate: today,
    endDate: today,
    key: "selection",
  });

  const handleSetDateRange = (ranges) => {
    const { selection } = ranges;

    // Prevent selecting past dates
    if (selection.startDate < today) selection.startDate = today;
    if (selection.endDate < today) selection.endDate = today;

    setDateRange(selection);
  };

  return (
    <DateRange
      ranges={[dateRange]}
      onChange={handleSetDateRange}
      moveRangeOnFirstSelection={false}
      minDate={today} // Restrict past dates
    />
  );
};
