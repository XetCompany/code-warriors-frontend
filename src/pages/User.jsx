import UserCard from "../components/UserCard";
import {useParams} from "react-router-dom";

const User = () => {
    const user_id = useParams().id;

    return <div>
        <h2>Информация о пользователе</h2>
        <UserCard isMyProfile={false} user={}/>
    </div>;
}

export default User;
