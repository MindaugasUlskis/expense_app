export function generateDateCode() {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const yearMonthCode = year + month;

    return yearMonthCode
  }

  export function generateDateCodes(count: number) {
    const currentDate = new Date();
    const dateCodes = [];
  
    for (let i = 0; i < count; i++) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      
      const paddedMonth = String(month).padStart(2, '0');
      const yearMonthCode = year + paddedMonth;
  
      dateCodes.push(yearMonthCode);
  
      // Move to the previous month for the next iteration
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
  
    return dateCodes.reverse();
  }