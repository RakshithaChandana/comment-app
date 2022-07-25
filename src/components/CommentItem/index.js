// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentItem, onLikeComment, onDeleteComment} = props
  const {name, comment, date, id, isLiked, backgroundClassNames} = commentItem
  const initial = name.slice(0, 1).toUpperCase()

  const onDeleteButton = () => {
    onDeleteComment(id)
  }

  const imgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeTextClassName = isLiked ? 'text-color' : 'like-text'

  const onClickLike = () => {
    onLikeComment(id)
  }

  return (
    <li className="comments-containers ">
      <div className="name-comment-container">
        <div className="main-container">
          <h1 className={backgroundClassNames}>{initial}</h1>
          <div className="name-time-container ">
            <h1 className="name">{name}</h1>
            <p className="time">{formatDistanceToNow(new Date(date))}</p>
          </div>
        </div>
        <p className="comment">{comment}</p>
        <div className="like-delete-container">
          <div className="like-container">
            <button type="button" className="like-button" onClick={onClickLike}>
              <img src={imgUrl} alt="like" className="like-icon" />
            </button>
            <p className={likeTextClassName}>Like</p>
          </div>
          <button
            type="button"
            className="delete-button"
            onClick={onDeleteButton}
            testid="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
              className="delete-icon"
            />
          </button>
        </div>
      </div>
    </li>
  )
}
export default CommentItem
