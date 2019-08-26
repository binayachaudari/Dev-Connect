import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { like, unlike } from '../../actions/post.action';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class PostItem extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    like: PropTypes.func.isRequired,
    unlike: PropTypes.func.isRequired
  }

  getDate = (date) => {
    const ISODate = new Date(date);
    const options = { month: 'short', year: 'numeric', day: 'numeric' };
    return ISODate.toLocaleString('en', options);
  }


  render() {
    const { auth, post: { _id, text, user: { name, avatar }, likes, comments, date } } = this.props;
    return (
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/developers/profile/${this.props.post.user._id}`}>
            <img
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
          <button type="button" className="btn btn-light" style={{ margin: '15px' }} onClick={() => this.props.like(_id)}>
            <i className="fas fa-thumbs-up"></i>
            {likes.length > 0 && <span> {likes.length}</span>}
          </button>
          <button type="button" className="btn btn-light" onClick={() => this.props.unlike(_id)}>
            <i className="fas fa-thumbs-down"></i>
          </button>
          <Link to="#1" className="btn btn-primary" style={{ margin: '15px' }}>
            Discussion {comments.length > 0 &&
              <span className='comment-count'> {comments.length}</span>
            }
          </Link>
          {(!auth.loading && auth.isAuthenticated) ?
            this.props.post.user._id === auth.user._id &&
            (<button
              type="button"
              className="btn btn-danger-outline" style={{ float: 'right', border: 'none' }}>
              <i className="fas fa-times"></i>
            </button>) : ''}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { like, unlike })(PostItem);
