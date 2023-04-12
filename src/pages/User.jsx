import UserCard from "../components/UserCard";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import UserCardApi from "../store/Request/UserCardApi";
import UserCardStore from "../store/Request/UserCardStore";
import {observer} from "mobx-react";
import UserCommentCard from "../components/UserCommentCard";

const User = () => {
    const user_id = useParams().id;

    useEffect(() => {
        UserCardStore.setIsUserLoaded(false);
        UserCardStore.setIsUserCommentLoaded(false);
        UserCardApi.getUser(user_id).then((data) => {
            UserCardStore.setIsUserLoaded(true);
            UserCardStore.setUser(data.data.data.user)
        })
        UserCardApi.getCommentsUser(user_id).then((data) => {
            UserCardStore.setIsUserCommentLoaded(true);
            UserCardStore.setComments(data.data);
        })
    }, [user_id])

    if (!UserCardStore.isUserLoaded) {
        return <div>Загрузка...</div>
    }

    return <div>
        <UserCard isMyProfile={false} user={UserCardStore.user}/>
        {UserCardStore.isUserCommentLoaded && <UserCommentCard comments={UserCardStore.comments}/>}
    </div>;
}

export default observer(User);
