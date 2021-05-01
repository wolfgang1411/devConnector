import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  addLikes,
  removeLikes,
  deletePost,
} from "../../reducers/actions/postAction";

const PostItem = ({
  addLikes,
  removeLikes,
  deletePost,
  auth,
  post: { _id, name, text, avatar, user, likes, comments, date },
  buttons = true,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${_id}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment formet="YYYY/MM/DD">{date}</Moment>
        </p>
        {buttons && (
          <Fragment>
            <button
              onClick={(e) => addLikes(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up"></i>
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              onClick={(e) => removeLikes(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion
              {comments.length > 0 && (
                <span className="comment-count"> {comments.length}</span>
              )}
            </Link>

            {auth.loading === false && user === auth.user._id && (
              <button
                onClick={(e) => deletePost(_id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.register,
});

export default connect(mapStateToProps, { addLikes, removeLikes, deletePost })(
  PostItem
);
