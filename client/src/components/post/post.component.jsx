import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getPost } from "../../reducers/actions/postAction";
import Spinner from '../layout/spinner';
import PostItem from '../posts/postItem.component';
import PostComment from './postcomment.component';
import Comments from './comments.component';
import { Link } from 'react-router-dom';

const Post = ({ getPost, match , post:{post,loading} }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost,match.params.id]);
  return loading || post === null ? <Spinner/> : <Fragment> 
      <Link className='btn' to='/posts'>Go To Posts</Link>
      <PostItem post={post} buttons={false}/>
        
        <PostComment postId={post._id}/>
        {
          post.comments.map((comment) => (
            <Comments key={comment._id} comment={comment} postId={post._id}/>
          ))
        }
        
  </Fragment>

};

const mapStateToProps = state => ({
    post:state.post
})

export default connect(mapStateToProps, { getPost })(Post);
