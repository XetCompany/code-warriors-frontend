import {Rate, Card} from "antd";

const UserCommentCard = ({comments}) => {
    return (<div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'white', alignItems: 'center'}}>
        {comments.map((comment) => {
            return (<Card style={{display: 'flex', justifyContent: 'center', width: '40%'}} key={comment.id}>
                <div>От: {comment.host.username}</div>
                <div>Комментарий: {comment.review_text}</div>
                <div>Рейтинг: {comment.rating} <Rate disabled defaultValue={Math.round(comment.rating)}/></div>
            </Card>)
        })}
    </div>)
}

export default UserCommentCard;
