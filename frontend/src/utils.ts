import { Task } from "./interfaces";

const getFormattedDate = (): string => {
  const date = new Date();

  const days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek: string = days[date.getDay()];
  const day: number = date.getDate();
  const month: string = months[date.getMonth()];
  const year: number = date.getFullYear();

  const nth = (d: number): string => {
    if (d > 3 && d < 21) return "th"; // exceptions for 11th to 13th
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formattedDate: string = `${dayOfWeek} ${day}${nth(
    day
  )} ${month} ${year}`;

  return formattedDate;
};

export const formattedDate: string = getFormattedDate();

export const formatTimeRange = (startTime: string, endTime: string): string => {
    // Function to format a single time
    const formatTime = (time: string): string => {
      const [hours, minutes, seconds] = time.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'pm' : 'am';
      const formattedHour = (hour % 12 || 12).toString(); // Convert 0 to 12
      const formattedMinutes = minutes === '00' ? '' : `:${minutes}`;
  return `${formattedHour}${formattedMinutes} ${ampm}`;
    };
  
    // Format start and end times
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);
  
    // Concatenate and return the formatted times
    return `${formattedStartTime} - ${formattedEndTime}`;
  };
  

export const fetchTasks = async (
  selectedList: string | null,
  selectedDate: string | null,
  setTasks: (value: Task[]) => void
) => {
  let url = "http://localhost:4000/tasks/all";
  if (selectedList && selectedDate) {
    url = `http://localhost:4000/tasks/list/${selectedList}/date/${selectedDate}`;
  } else if (selectedList) {
    url = `http://localhost:4000/tasks/list/${selectedList}`;
  } else if (selectedDate) {
    url = `http://localhost:4000/tasks/date/${selectedDate}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    setTasks(data);
  } catch (error) {
    console.error("Error fetching tasks here:", error);
  }
};

export const formatNumberToTime = (input: number | null): string => {
    // If input is null or undefined, return '00:00:00'
    if (input === null || input === undefined) {
      return '00:00:00';
    }
  
    // Convert number to string
    const inputStr = input.toString();
  
    // Split the input by colon and check the number of parts
    const parts = inputStr.split(':');
    const numberOfParts = parts.length;
  
    // If the input has only one part, it could be either HH, HH:MM, or HH:MM:SS
    if (numberOfParts === 1) {
      const hours = parseInt(parts[0], 10);
      if (!isNaN(hours)) {
        // HH format
        return `${hours.toString().padStart(2, '0')}:00:00`;
      }
    }
    // If the input has two parts, it could be either HH:MM or MM:SS
    else if (numberOfParts === 2) {
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      if (!isNaN(hours) && !isNaN(minutes)) {
        // HH:MM format
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
      }
    }
    // If the input has three parts, it should be HH:MM:SS
    else if (numberOfParts === 3) {
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      const seconds = parseInt(parts[2], 10);
      if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
        // HH:MM:SS format
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }
  
    // If the input does not match any expected format, return '00:00:00' as default
    return '00:00:00';
  };

  export const formatTimeRangeAmPm = (startTime: number | null, endTime: number | null): string | null => {
    if (startTime === null || endTime === null) {
      return null;
    }
  
    const formatTime = (time: number): string => {
      const hours = Math.floor(time);
      const minutes = Math.round((time - hours) * 60);
      const ampm = hours >= 12 ? 'pm' : 'am';
      const formattedHour = (hours % 12 || 12).toString(); // Convert 0 to 12
      const formattedMinutes = minutes === 0 ? '' : `:${minutes.toString().padStart(2, '0')}`;
      return `${formattedHour}${formattedMinutes} ${ampm}`;
    };
  
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);
  
    return `${formattedStartTime} - ${formattedEndTime}`;
  };

  export const formatDay = (day: string): string => {
    const suffixes = ["th", "st", "nd", "rd"];
    
    // Split the input string into parts
    const [dayNumberStr, month, year] = day.split(' ');
  
    // Convert dayNumberStr to an integer
    const dayNumber = parseInt(dayNumberStr, 10);
  
    // Determine the correct suffix
    const daySuffix =
      dayNumber % 10 === 1 && dayNumber !== 11
        ? suffixes[1]
        : dayNumber % 10 === 2 && dayNumber !== 12
        ? suffixes[2]
        : dayNumber % 10 === 3 && dayNumber !== 13
        ? suffixes[3]
        : suffixes[0];
  
    // Return the formatted string without the year
    return `${dayNumber}${daySuffix} ${month}`;
  };

  