import React  from 'react';
import { connect } from 'react-redux';
import {getGithubRepos} from '../../reducers/actions/profileAction';

const ProfileGithub = ({username,repos,getGithubRepos}) => {
   

    return (
        <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
          {
              repos.map((repo,index) => (
                  <div></div>
              ))
          }
          <div className="repo bg-white p-1 my-1">
            <div>
              
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: 44</li>
                <li className="badge badge-dark">Watchers: 21</li>
                <li className="badge badge-light">Forks: 25</li>
              </ul>
            </div>
          </div>
        </div>
    )
}

const mapStateToProps = state => ({
    repos:state.profile.repos
})

export default connect(mapStateToProps,{getGithubRepos})(ProfileGithub)
