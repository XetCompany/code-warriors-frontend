import User from "../components/User";
import UserStore from "../store/User/UserStore";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";

const PersonalAccount = () => {

    if (!UserStore.user) {
        return (<div>
            <h1>Личный кабинет</h1>
            <div>Вы не авторизованы</div>
        </div>);
    }

    return (<div>
        <h1>Личный кабинет</h1>
        <User {...UserStore.user} />
        <Link to="/personal-account/edit">Редактировать</Link>
    </div>);
}

export default observer(PersonalAccount);
