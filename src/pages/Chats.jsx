import {observer} from "mobx-react";
import ChatsStore from "../store/Request/ChatsStore";
import {useEffect} from "react";
import ChatsApi from "../store/Request/ChatsApi";
import Chat from "../components/Chat";

const Chats = () => {
    useEffect(() => {
        ChatsApi.getChats().then((response) => {
            ChatsStore.setChats(response.data.chats);
            ChatsStore.setIsChatsLoaded(true);
        })
    }, []);

    if (!ChatsStore.isChatsLoaded) {
        return <div>Загрузка...</div>
    }

    return (
        ChatsStore.chats.map((value, index, array) => {
            return <div>
                <p>
                    {value.name ? value.name : 'Неизвестный отправитель'}
                </p>
                <Chat user_id={1} />
            </div>
        })
    )
}

export default observer(Chats);


