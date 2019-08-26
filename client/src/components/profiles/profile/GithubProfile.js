import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../../actions/profile.action';

class GithubProfile extends Component {
  static propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired
  }

  componentDidMount() {
    this.props.getGithubRepos(this.props.username)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.username !== this.props.username)
      this.props.getGithubRepos(this.props.username)
  }

  render() {
    const { repos } = this.props;

    return (
      <div className="profile-github">
        <h2 className="text-primary my-1">
          <i className="fab fa-github"></i> Github Repos
      </h2>
        <div className="repo-container" >
          {repos.length === 0 ? <h4>Loading Repos...</h4> : (
            repos.map(repo => (
              <div key={repo.id} className="repo bg-white p-1">

                <div>
                  <h4><a href={repo.html_url} target="_blank"
                    rel="noopener noreferrer">{repo.name}</a></h4>
                  <p>{repo.description}</p>
                  <p><strong>Language: </strong>{repo.language}</p>
                  {repo.license && <p><strong>License: {repo.license.name}</strong></p>}
                  {repo.homepage && <p><a href={repo.homepage}><strong>DEMO</strong></a></p>}
                </div>

                <div>
                  <ul>
                    <li className="badge badge-primary" ><i className="fas fa-star"></i> Stars: {repo.stargazers_count}</li>
                    <li className="badge badge-dark"><i className="fas fa-eye"></i> Watchers: {repo.watchers_count}</li>
                    <li className="badge badge-light"><svg className="octicon octicon-repo-forked v-align-text-bottom" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fillRule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg> Forks: {repo.forks_count}</li>
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  repos: state.profile.repos
})

export default connect(mapStateToProps, { getGithubRepos })(GithubProfile);
