// Функция для форматирования даты на русском языке
const formatWeekday = (date) => {
    const options = {
        weekday: 'short',
        
    };

    let formattedDate = date.toLocaleDateString('ru-RU', options);

    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    return formattedDate;
};

export default formatWeekday;