import {Card} from "antd";
import User from "./User";
import {Link} from "react-router-dom";

const UserCard = ({isMyProfile, user}) => {
    return <Card style={{maxWidth: '50vw'}}>
        <div>
            <User {...user} />
        </div>
        {
            isMyProfile && <div>
                <Link to="/personal-account/edit">Редактировать профиль</Link>
            </div>
        }
    </Card>
}

export default UserCard;

