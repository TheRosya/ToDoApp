const formatDate = (date) => {
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    };

    let formattedDate = date.toLocaleDateString('ru-RU', options);

    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    return formattedDate;
};

export default formatDate;