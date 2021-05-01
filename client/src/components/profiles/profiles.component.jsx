import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../reducers/actions/profileAction";
import Spinner from "../layout/spinner";
import ProfileItem from './profileItem.component'

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return <Fragment>{loading ? <Spinner /> : <Fragment>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
          <i className='fab fa-connectdevlop'></i>Browse and connect with Devlopers
      </p>
      <div className="profiles">
          {
              profiles.length > 0 ? (
                profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile}/>
                ))
              ) : <h4>No profile found</h4>
          }
      </div>
      </Fragment>}</Fragment>;
};

const mapstateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapstateToProps, { getProfiles })(Profiles);
