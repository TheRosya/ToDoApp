// Функция для форматирования даты на русском языке
const formatDay = (date) => {
    const options = {
        day: 'numeric',
    };

    let formattedDate = date.toLocaleDateString('ru-RU', options);

    return formattedDate;
};

export default formatDay;