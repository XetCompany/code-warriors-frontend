import {observer} from "mobx-react";
import React, {useEffect} from "react";
import UserStore from "../store/User/UserStore";
import RequestApi from "../store/Request/RequestApi";
import RequestStore from "../store/Request/RequestStore";
import {Button, Checkbox, Form} from "antd";
import SearchStore from "../store/Request/SearchStore";

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


    return (<div>
        <h1>Исполнители</h1>
        {RequestStore.isShowCategories ? (<Form.Item label="Категории" name="chosen_categories">
            {RequestStore.categories.map((category) => {
                return <Checkbox
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
        </Form.Item>) : <div>Загрузка...</div>}
        <Button type="primary" htmlType="submit">Поиск</Button>
        <div>
            {SearchStore.isDataSearchShow ? (<>
                {SearchStore.dataSearch.map((user) => {
                    return <div>
                        <div>{user.username}</div>
                        <div>{user.fullname}</div>
                        <div>{user.description}</div>
                        <div>{user.phone}</div>
                        <div>{user.email}</div>
                    </div>
                })}
            </>) : SearchStore.isSearch && <div>Загрузка...</div>}
        </div>
    </div>);
}

export default observer(Performers);
