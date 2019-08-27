import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../actions/post.action';

class CommentItem extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    postID: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
  }

  getDate = (date) => {
    const ISODate = new Date(date);
    const options = { month: 'short', year: 'numeric', day: 'numeric' };
    return ISODate.toLocaleString('en', options);
  }

  render() {
    const { postID, auth, comment: { _id, text, date, user: { name, avatar } } } = this.props;
    console.log(this.props)
    return (
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/developer/profile/${this.props.comment.user._id}`}>
            <img
              className="round-img"
              src={avatar}
              alt={name}
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1" style={{ textAlign: 'left' }}>
            {text}
          </p>
          <p className="post-date">
            Posted on {this.getDate(date)}
          </p>
          {(!auth.loading && auth.isAuthenticated) ?
            this.props.comment.user._id === auth.user._id &&
            (<button
              type="button"
              className="btn btn-danger-outline" style={{ float: 'right', border: 'none' }} onClick={() => this.props.deleteComment(postID, _id)}>
              <i className="fas fa-times"></i>
            </button>) : ''}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
