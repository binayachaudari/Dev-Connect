import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSinglePost, displayPost } from '../../actions/post.action';
import Alert from '../layouts/Alert';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

class singlePost extends Component {
  static propTypes = {
    getSinglePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  }

  componentDidMount = () => {
    const { post: { posts }, computedMatch: { params } } = this.props;
    const currPost = posts.find(post => post._id === params.id);
    if (currPost)
      this.props.displayPost(currPost);

    this.props.getSinglePost(params.id);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.post.post === this.props.post.post)
      this.props.getSinglePost(this.props.computedMatch.params.id);
  }

  render() {
    const { post: { post, loading } } = this.props;
    return (
      <section className="container">
        <Link to="/posts" className="btn btn-light-outline" style={{ marginRight: '15px' }}>Back To Posts</Link>
        <Alert />
        {(!loading && post) ? (
          <Fragment>
            <PostItem post={post} displayDiscussionBtn={false} />
            <CommentForm postID={post._id} />
            {post.comments.map(comment => (<CommentItem key={comment._id} comment={comment} postID={post._id}></CommentItem>))}
          </Fragment>
        ) : <h4>Loading...</h4>}
      </section>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getSinglePost, displayPost })(singlePost);
