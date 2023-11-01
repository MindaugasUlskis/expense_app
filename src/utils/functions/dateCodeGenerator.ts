export function generateDateCode() {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const yearMonthCode = year + month;

    return yearMonthCode
  }