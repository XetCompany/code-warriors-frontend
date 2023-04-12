
const User = ({username, email, groups, ...data}) => {
    const transformGroups = {
        'customer': 'заказчик', 'performer': 'исполнитель',
    }

    const perhapsNullFields = ['fullname', 'phone', 'description', 'notifications'];
    perhapsNullFields.forEach(field => {
        if (!data[field]) {
            data[field] = 'не указано';
        }
    });

    console.log(data);

    return (<div>
        <h2>Информация о пользователе</h2>
        <div>Имя пользователя: {username}</div>
        <div>Почта: {email}</div>
        <div>Имя: {data.fullname}</div>
        <div>Телефон: {data.phone}</div>
        <div>Описание: {data.description}</div>
        <div>Роль: {groups.map((group, index) => {
            return (<span key={index}>{transformGroups[group]}{index !== groups.length - 1 ? ', ' : ''}</span>);
        })}</div>
        <div>
            {
                groups.includes('performer') && (
                    <div>
                        <h3>Выбранные категории: {data.chosen_categories && 'нет'}</h3>
                        {
                            data.chosen_categories.map((category, index) => {
                                return (<div key={index}>{category.name}</div>);
                            })
                        }
                    </div>
                )
            }
        </div>
    </div>);
}

export default User;
