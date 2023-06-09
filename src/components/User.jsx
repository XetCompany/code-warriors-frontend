import {Button, Rate} from "antd";
import UserStore from "../store/User/UserStore";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react";

const User = ({username, email, groups, ...data}) => {
    const transformGroups = {
        'customer': 'заказчик', 'performer': 'исполнитель',
    }

    const navigate = useNavigate();

    const perhapsNullFields = ['fullname', 'phone', 'description', 'notifications', 'photos', 'videos'];
    perhapsNullFields.forEach(field => {
        if (!data[field]) {
            data[field] = 'не указано';
        } else if (Array.isArray(data[field]) && data[field].length === 0) {
            data[field] = 'нет';
        }
    });

    return (<div style={{
        width: '400px'
    }}>
        <h3 style={{fontWeight: 'bold'}}>Информация о пользователе</h3>
        <div>Имя пользователя: {username}</div>
        <div>Почта: {email}</div>
        <div>Имя: {data.fullname}</div>
        <div>Телефон: {data.phone}</div>
        <div>Описание: {data.description}</div>
        {groups.includes('performer') && (<>
            <div>Изображения: {data.photos}</div>
            <div>Видео: {data.videos}</div>
            <div>
                {groups.includes('performer') && (<div>
                    <h3>Выбранные категории: {data.chosen_categories.length === 0 && 'нет'}</h3>
                    {data.chosen_categories.map((category, index) => {
                        return (<div key={index}>{category.name}</div>);
                    })}
                </div>)}
            </div>
        </>)}
        <div>Роль: {groups.map((group, index) => {
            return (<span key={index}>{transformGroups[group]}{index !== groups.length - 1 ? ', ' : ''}</span>);
        })}</div>
        <div>
            Рейтинг: {data.rating} <Rate disabled defaultValue={Math.round(data.rating)}/>
        </div>
        {UserStore.role && UserStore.role.includes('customer') && (<div>
            <Button onClick={() => {
                navigate('/chat/' + data.id + '/');
            }}>Связаться с пользователем</Button>
        </div>)}

    </div>);
}

export default observer(User);
