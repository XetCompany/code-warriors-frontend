import {observer} from "mobx-react";
import React, {useEffect} from "react";
import UserStore from "../store/User/UserStore";
import RequestApi from "../store/Request/RequestApi";
import RequestStore from "../store/Request/RequestStore";
import {Button, Checkbox} from "antd";
import SearchStore from "../store/Request/SearchStore";
import {useNavigate} from "react-router-dom";

const Performers = () => {
    useEffect(() => {
        if (!UserStore.user) {
            return
        }
        if (UserStore.role.includes('customer')) {
            RequestApi.getCategories().then((response) => {
                const categories = response.data.data.categories;
                RequestStore.setCategories(categories);
                RequestStore.setIsShowCategories(true);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [UserStore.role])

    const navigate = useNavigate();


    return (<div className="container performers">
        <h1 className={"title"}>Исполнители</h1>
        {RequestStore.isShowCategories ? (<div className={"checkbox-container-wrapper"}>
            <p className={"checkbox-container-title"}>
                Выберите категории:
            </p>
            <div className="checkbox-container">
                {RequestStore.categories.map((category) => {
                    return <Checkbox className="checkbox-item"
                                     name={category.id}
                                     checked={!!RequestStore.chosenCategories.find((chosenCategory) => {
                                         return chosenCategory.id === category.id;
                                     })}
                                     onChange={(e) => {
                                         if (e.target.checked) {
                                             RequestStore.addChosenCategory(category);
                                         } else {
                                             RequestStore.removeChosenCategory(category);
                                         }
                                     }}
                    >{category.name}</Checkbox>
                })}
            </div>
        </div>) : <div>Загрузка...</div>}
        <Button type="primary" htmlType="submit" className={"button"} onClick={() => {
            SearchStore.search();
        }}>Поиск</Button>
        <hr/>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {SearchStore.isDataSearchShow ? (<>
                {SearchStore.dataSearch.map((user) => {
                    return <Button style={{
                        width: '60%',
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: '#46affa',
                        margin: '5px',
                        padding: '15px 0',
                        borderRadius: '10px',
                        height: '53px',
                    }} onClick={() => navigate(`/user/${user.id}`)}>
                        {user.username ? user.username + (user.is_buy_update ? " +" : "")  // типо подсвечивается желтым
                            : 'Неизвестный отправитель'}
                    </Button>
                })}
            </>) : SearchStore.isSearch && <div>Загрузка...</div>}
        </div>
    </div>);
}

export default observer(Performers);
