import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getCurruntProfile } from "../../reducers/actions/profileAction";
import { Link } from "react-router-dom";

import ProfileLinks from "./links.component";
import Education from "./education.component";
import Experience from "./experience.component";
import Spinner from "../layout/spinner";

import { deleteAccount } from "../../reducers/actions/profileAction";

const Dashboard = ({
  getCurruntProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurruntProfile();
  }, [getCurruntProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">DashBoard</h1>
      <p className="lead">
        <i className="fa fa-user"> Welcome {user && user.name}</i>
      </p>
      {!profile ? (
        <Fragment>
          <p>You have not yet setup a profile.Please add some details</p>
          <Link to="create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <ProfileLinks />
          {profile.education === null ? (
            <Fragment></Fragment>
          ) : (
            <Experience experience={profile.experience} />
          )}

          <Education education={profile.education} />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fa fa-user-minus"></i>Delete My Account
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.register,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurruntProfile, deleteAccount })(
  Dashboard
);
