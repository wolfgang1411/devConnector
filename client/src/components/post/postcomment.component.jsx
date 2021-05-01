import React , { useState } from 'react'
import {connect} from 'react-redux';
import {addComment} from '../../reducers/actions/postAction';

const PostComment = ({addComment,postId}) => {
    const [text, setFormData] = useState('')
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={e => {
          e.preventDefault()
          addComment(postId,{text})
          setFormData('')
      }}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
          value={text}
          onChange={ e => setFormData(e.target.value)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
}

export default connect(null,{addComment})(PostComment)
