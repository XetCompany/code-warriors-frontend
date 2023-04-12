import {Rate} from "antd";

const UserCommentCard = ({comments}) => {
    return (<>
        {comments.map((comment) => {
            return (<div key={comment.id}>
                <div>От: {comment.host.username}</div>
                <div>Комментарий: {comment.review_text}</div>
                <div>Рейтинг: {comment.rating} <Rate disabled defaultValue={Math.round(comment.rating)}/></div>
            </div>)
        })}
    </>)
}

export default UserCommentCard;
