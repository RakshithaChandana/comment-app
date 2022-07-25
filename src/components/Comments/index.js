import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {name: '', comment: '', commentCount: 0, commentsList: []}

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onLikeComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteComment = id => {
    const {commentsList} = this.state
    const filteredCommentList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState(prevState => ({
      commentsList: filteredCommentList,
      commentCount: prevState.commentCount - 1,
    }))
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialBackgroundColor = `logo ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      date: new Date(),
      backgroundClassNames: initialBackgroundColor,
      isLiked: false,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
      commentCount: prevState.commentCount + 1,
    }))
  }

  render() {
    const {name, comment, commentCount, commentsList} = this.state
    return (
      <div className="app-container">
        <div>
          <h1 className="comment-heading">Comments</h1>
          <div className="container">
            <div>
              <p className="paragraph">Say something about 4.O Technologies</p>
              <form className="form-container" onSubmit={this.onAddComment}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="name-input-element"
                  onChange={this.onChangeName}
                  value={name}
                />
                <textarea
                  type="text"
                  rows="10"
                  cols="50"
                  placeholder="Your Comment"
                  value={comment}
                  className="textarea-element"
                  onChange={this.onChangeComment}
                />
                <button type="submit" className="button">
                  Add Comment
                </button>
                <hr className="header-line" />
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />
          </div>
        </div>
        <div className="comments-container">
          <div className="comment-count-container ">
            <h1 className="comment-count">{commentCount}</h1>
            <p className="comment-count-heading ">Comments</p>
          </div>
          <ul className="list-items-container ">
            {commentsList.map(eachComment => (
              <CommentItem
                commentItem={eachComment}
                onLikeComment={this.onLikeComment}
                onDeleteComment={this.onDeleteComment}
                key={eachComment.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Comments
