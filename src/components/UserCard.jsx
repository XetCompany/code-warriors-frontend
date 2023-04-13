import {Card} from "antd";
import User from "./User";
import {Link} from "react-router-dom";

const UserCard = ({isMyProfile, user}) => {
    return <div>{isMyProfile ? <Card style={{maxWidth: '50vw', width: '600px'}}>
        <div>
            <User {...user} groups={user.groups}/>
        </div>
        <div>
            <Link to="/personal-account/edit">Редактировать профиль</Link>
        </div>
    </Card> : <div style={{
        display: 'flex',
        maxWidth: '100vw',
        justifyContent: 'center'
    }}>
        <Card className="user_card">
            <User {...user} groups={user.groups}/>
        </Card>
    </div>}
    </div>
}

export default UserCard;

