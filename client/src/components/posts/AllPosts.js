import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/post.action';
import PostItem from './PostItem';
import AddPost from './AddPost';
import Alert from '../layouts/Alert';

class AllPosts extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    getAllPosts: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    this.props.getAllPosts();
  };

  // componentDidUpdate = (prevProps) => {
  //   console.log(prevProps.post === this.props.post)
  //   if (prevProps.post === this.props.post)
  //     this.props.getAllPosts();
  // }

  render() {
    const { posts, loading } = this.props.post;
    return (
      <section className="container">
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome to the community!
        </p>
        <Alert />
        <AddPost />
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          <div className="posts">
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getAllPosts })(AllPosts);
