import axios from "axios";
import {
  GET_POSTS,
  UPDATE_LIKES,
  POST_ERRORS,
  POST_DELETE,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/post");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addLikes = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { likes: res.data, id },
    });
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeLikes = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { likes: res.data, id },
    });
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/${id}`);

    dispatch({
      type: POST_DELETE,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "/api/post/",
      formData,
      config
    );

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response, status: err.response?.status },
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERRORS,
      payload: { msg: err.response, status: err.response?.status },
    });
  }
};


export const addComment = (id,formData) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `/api/post/comments/${id}`,
        formData,
        config
      );
  
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERRORS,
        payload: { msg: err.response, status: err.response?.status },
      });
    }
  };

  export const deleteComment = (postId,commentId) => async dispatch => {

    try {
      await axios.delete(`/api/post/comments/${postId}/${commentId}`)

      dispatch({
        type:REMOVE_COMMENT,
        payload:{postId,commentId}
      })
    } catch (err) {
      dispatch({
        type: POST_ERRORS,
        payload: { msg: err.response, status: err.response?.status },
      });
    }
  }
  
