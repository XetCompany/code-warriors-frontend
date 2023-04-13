import {observer} from "mobx-react";
import UserStore from "../store/User/UserStore";
import {useEffect, useRef} from "react";
import ChatApi from "../store/Request/ChatApi";
import ChatStore from "../store/Request/ChatStore";
import {Button, Input, Space, Tooltip} from "antd";
import Bottom from "../img/bottom.png";


import "./Chat.css"
import Message from "./Message";
import UserCardApi from "../store/Request/UserCardApi";
import RequestStore from "../store/Request/RequestStore";
import {Link} from "react-router-dom";

function BottomIcon() {
    return <img src={Bottom} alt="bottom" style={{width: '20px', height: '20px'}}/>
}

const Chat = ({user_id}) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTo(0, messagesEndRef.current.scrollHeight);
        }
    };

    useEffect(() => {
        ChatStore.setIsLoadChat(false);
        UserCardApi.getUser(user_id).then((response) => {
            RequestStore.setUsernameChat(response.data.data.user.username);
            RequestStore.setUserIdChat(response.data.data.user.id);
        });
        const interval = setInterval(() => {
            ChatApi.getChatMessages(user_id).then((response) => {
                ChatStore.setChatMessaged(response.data.messages);
                ChatStore.setIsLoadChat(true);
            })
        }, 1000)

        return () => clearInterval(interval);
    }, [user_id])

    if (!UserStore.userIsLoaded) {
        return <div>Загрузка...</div>
    }

    if (!ChatStore.isLoadChat) {
        return <div>Загрузка...</div>
    }

    return (<div style={{
        width: '100%', height: '100%', backgroundColor: '#97cbf0'

    }} className={"chat"}>
        <div className={"chat-header"}>
            <div className={"chat-header-title"}>
                <Link to={"/user/" + RequestStore.userIdChat + "/"} style={{
                    color: 'white', textDecoration: 'none'
                }}>
                    {RequestStore.usernameChat}
                </Link>
            </div>
        </div>

        <div className={"messages-container"} ref={messagesEndRef}>
            {ChatStore.chatMessages.map((message) => {
                return <Message message={message}/>
            })}
            <Tooltip title="Вниз" className={"tobottom"}>
                <Button type="primary" shape="circle" icon={<BottomIcon/>} onClick={scrollToBottom}/>
            </Tooltip>
        </div>
        <div>
            <Space.Compact
                style={{
                    width: '100%', height: '50px',
                }}>
                <Input style={{
                    borderRadius: '0px', borderBottomLeftRadius: '10px',
                }} onChange={(e) => {
                    ChatStore.setMessageSend(e.target.value)
                }} value={ChatStore.messageSend} onPressEnter={() => {
                    ChatApi.sendChatMessage(user_id, ChatStore.messageSend).then((response) => {
                        ChatStore.setMessageSend('');
                    })
                }}/>
                <Button style={{
                    height: '50px', borderRadius: '0px', borderBottomRightRadius: '10px'
                }} type="primary" onClick={() => {
                    ChatApi.sendChatMessage(user_id, ChatStore.messageSend).then((response) => {
                        ChatStore.setMessageSend('')
                    })
                }}>Отправить</Button>
            </Space.Compact>
        </div>
    </div>)
}

export default observer(Chat);
