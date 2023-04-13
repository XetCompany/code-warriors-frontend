import "./Message.css";

const Message = ({ message }) => {
    return <div className="message-container">
        <div className="message-sender">
            {message.sender.username}
        </div>
        <div className="message-content">
            {message.message}
        </div>
    </div>

}

export default Message;
