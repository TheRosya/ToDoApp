function isSameDate(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function getRelativeDate(date) {
  const today = new Date();
  const tomorrow = new Date(today);
  const prevToday = new Date(today)
  prevToday.setDate(today.getDate() - 1)
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const daysDifference = Math.floor((date - today) / (24 * 60 * 60 * 1000));
  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - today.getDay());
  const currentWeekEnd = new Date(today);
  currentWeekEnd.setDate(today.getDate() + 6 - today.getDay());

  const nextWeekStart = new Date(currentWeekEnd);
  nextWeekStart.setDate(currentWeekEnd.getDate() + 1);
  const nextWeekEnd = new Date(nextWeekStart);
  nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
  if (date < prevToday) {
    return "Вчера. "
  }
  if (isSameDate(date, today)) {
    return 'Сегодня. ';
  } else if (isSameDate(date, tomorrow)) {
    return 'Завтра. ';
  } else if (isSameDate(date, dayAfterTomorrow)) {
    return 'Послезавтра. ';
  // } else if (daysDifference >= 0 && date >= currentWeekStart && date <= currentWeekEnd) {
  //   return 'В течениe семи дней. ';
  // } 
   } else {
    return ''
  }
}

function DateInfo({ date }) {
  const result = getRelativeDate(new Date(date));

  return <span>{result}</span>;
}

export default DateInfo;