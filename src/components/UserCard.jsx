import {Card} from "antd";
import User from "./User";
import {Link} from "react-router-dom";

const UserCard = ({isMyProfile, user}) => {
    return <>{isMyProfile ?
        <Card style={{maxWidth: '50vw'}}>
            <div>
                <User {...user} groups={user.groups}/>
            </div>
            <div>
                    <Link to="/personal-account/edit">Редактировать профиль</Link>
            </div>
        </Card>
    :
    <div style={{display: 'flex', maxWidth: '100vw', backgroundColor: 'white', justifyContent: 'center'}}>
        <div className="user_card">
            <User {...user} groups={user.groups}/>
        </div>
    </div>
    }
    </>
}

export default UserCard;

