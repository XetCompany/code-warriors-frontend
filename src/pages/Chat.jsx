import {observer} from "mobx-react";
import {useParams} from "react-router-dom";
import Chat from "../components/Chat";

const ChatPage = () => {
    const chatId = useParams().id;

    return (
        <div>
            <Chat user_id={chatId}/>
        </div>
    );

}

export default observer(ChatPage);
