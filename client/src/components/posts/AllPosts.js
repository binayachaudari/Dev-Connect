import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/post.action';
import PostItem from './PostItem';

class AllPosts extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    getAllPosts: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    this.props.getAllPosts();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.post.likes !== this.props.post.likes)
      this.props.getAllPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    return (
      <section className="container">
        <h1 className="large text-primary">
          Posts
      </h1>
        <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
        {/* Post Form */}
        {loading ? <h4>Loading...</h4> :
          <div className="posts">
            {posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        }
      </section>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getAllPosts })(AllPosts);
