import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../reducers/actions/postAction";
import Spinner from "../layout/spinner";
import PostItem from "./postItem.component";
import AddPost from "./postfrom.component";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      {/* post a post */}
      <AddPost />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
