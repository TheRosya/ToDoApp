export function formatDate (date) {
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    };

    let formattedDate = date.toLocaleDateString('ru-RU', options);

    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    return formattedDate;
};

// Функция для форматирования даты на русском языке
export function formatDay (date) {
    const options = {
        day: 'numeric',
    };

    let formattedDate = date.toLocaleDateString('ru-RU', options);

    return formattedDate;
};

// Функция для форматирования даты на русском языке
export function formatWeekday (date) {
    const options = {
        weekday: 'short',
        
    };

    let formattedDate = date.toLocaleDateString('ru-RU', options);

    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    return formattedDate;
};

