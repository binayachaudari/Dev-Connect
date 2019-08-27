import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post.action';

class CommentForm extends Component {
  static propTypes = {
    addComment: PropTypes.func.isRequired,
    postID: PropTypes.string.isRequired
  }

  state = {
    text: ''
  }

  onChange = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState({ ...newState });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addComment(this.props.postID, { ...this.state });
    this.setState({ text: '' })
  }

  render() {
    const { text } = this.state;
    return (
      <div className="post-form">
        <form className="form my-1" onSubmit={this.onSubmit}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Leave a Comment"
            value={text}
            onChange={this.onChange}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
  }
}

export default connect(null, { addComment })(CommentForm);
