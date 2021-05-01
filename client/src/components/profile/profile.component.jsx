import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/spinner";
import ProfileTop from "./profileTop.component";
import ProfileAbout from "./profileAbout.component";
import ProfileExperience from "./profileExperience.component";
import ProfileEducation from "./profileEducation.component";

import { getProfileById } from "../../reducers/actions/profileAction";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {" "}
      {profile === null && loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile?.user?._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            {profile && loading === false && (
              <Fragment>
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
                <div className="profile-exp bg-white p-2">
                  <h2 className="text-primary">Experience</h2>
                  {profile?.experience?.length > 0 ? (
                    <Fragment>
                      {profile.experience.map((experience) => (
                        <ProfileExperience
                          key={experience._id}
                          experience={experience}
                        />
                      ))}
                    </Fragment>
                  ) : (
                    "No Experience Found"
                  )}
                </div>

                <div className="profile-edu bg-white p-2">
                  <h2 className="text-primary">Education</h2>
                  {profile?.education?.length > 0 ? (
                    <Fragment>
                      {profile.education.map((education) => (
                        <ProfileEducation
                          key={education._id}
                          education={education}
                        />
                      ))}
                    </Fragment>
                  ) : (
                    "No Education Found"
                  )}
                </div>
              </Fragment>
            )}
          </div>
          {
            profile === null && loading === false && <h2 className='profile-grid my-1'>Profile Not Found</h2>
          }
          
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToPropsp = (state) => ({
  profile: state.profile,
  auth: state.register,
});

export default connect(mapStateToPropsp, { getProfileById })(Profile);
