import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { like, unlike, deletePost } from '../../actions/post.action';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';



class PostItem extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    like: PropTypes.func.isRequired,
    unlike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
  }

  static defaultProps = {
    displayDiscussionBtn: true
  }

  getDate = (date) => {
    const ISODate = new Date(date);
    const options = { month: 'short', year: 'numeric', day: 'numeric' };
    return ISODate.toLocaleString('en', options);
  }

  getLikedUnlikeStatus = (likes, auth) => {
    return likes.find(like => like.user === auth.user._id) ? 'bg-primary' : 'btn-light';
  }

  render() {
    const { auth, post: { _id, text, user: { name, avatar }, likes, comments, date }, displayDiscussionBtn } = this.props;
    return (
      <div>
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/developer/profile/${this.props.post.user._id}`}>
              <LazyLoadImage
                effect="blur"
                className="round-img"
                src={avatar}
                alt={name} />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1" style={{ textAlign: 'left' }}>{text}</p>
            <p className="post-date">
              Posted on {this.getDate(date)}
            </p>
            <button type="button" className={`btn ${
              (!auth.loading && auth.isAuthenticated) && this.getLikedUnlikeStatus(likes, auth)}`} style={{ margin: '15px' }} onClick={() => this.props.like(_id)}>
              <i className="fas fa-thumbs-up"></i>
              {likes.length > 0 && <span> {likes.length}</span>}
            </button>
            <button type="button" className="btn btn-light" onClick={() => this.props.unlike(_id)}>
              <i className="fas fa-thumbs-down"></i>
            </button>
            {displayDiscussionBtn && < Link to={`/post/${_id}`} className="btn btn-primary" style={{ margin: '15px' }}>
              Discussion {comments.length > 0 &&
                <span className='comment-count'> {comments.length}</span>
              }
            </Link>}
            {(!auth.loading && auth.isAuthenticated) ?
              this.props.post.user._id === auth.user._id &&
              (<button
                type="button"
                className="btn btn-danger-outline" style={{ float: 'right', border: 'none' }} onClick={() => this.props.deletePost(_id)}>
                <i className="fas fa-times"></i>
              </button>) : ''}
          </div>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { like, unlike, deletePost })(PostItem);
