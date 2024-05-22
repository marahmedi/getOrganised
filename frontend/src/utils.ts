const getFormattedDate = (): string => {
    const date = new Date();
    
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayOfWeek: string = days[date.getDay()];
    const day: number = date.getDate();
    const month: string = months[date.getMonth()];
    const year: number = date.getFullYear();
  
    const nth = (d: number): string => {
      if (d > 3 && d < 21) return 'th'; // exceptions for 11th to 13th
      switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    }
  
    const formattedDate: string = `${dayOfWeek} ${day}${nth(day)} ${month} ${year}`;
    
    return formattedDate;
  };
  
  export const formattedDate: string = getFormattedDate();
  