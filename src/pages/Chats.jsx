import {observer} from "mobx-react";
import ChatsStore from "../store/Request/ChatsStore";
import {useEffect} from "react";
import ChatsApi from "../store/Request/ChatsApi";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

const Chats = () => {
    useEffect(() => {
        ChatsApi.getChats().then((response) => {
            ChatsStore.setChats(response.data.chats);
            ChatsStore.setIsChatsLoaded(true);
        })
    }, []);

    const navigate = useNavigate();

    if (!ChatsStore.isChatsLoaded) {
        return <div>Загрузка...</div>
    }

    return (<div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '257px',
            borderRadius: '0 0 10px 10px',
        }} className="back">
            {ChatsStore.chats.map((value, index, array) => {
                return <Button style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#46affa',
                    margin: '5px',
                    padding: '15px 0',
                    borderRadius: '10px',
                    height: '53px',
                }} onClick={
                    () => navigate(`/chat/${value.id}`)
                }>
                    {value.username ? value.username : 'Неизвестный отправитель'}
                </Button>
            })}
        </div>

    )
}

export default observer(Chats);


