import {
  GET_POSTS,
  POST_ERRORS,
  UPDATE_LIKES,
  POST_DELETE,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "./actions/types";

const initalState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export const post = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case GET_POST:
      return {
        ...state,
        post:payload,
        loading:false
      }
    case POST_ERRORS:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
      };
    case POST_DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case ADD_POST:
        return {
            ...state,
            posts: [ payload, ...state.posts],
            loading:false
        }
    case ADD_COMMENT:
      return {
        ...state,
        post:{ ...state.post , comments:payload},
        loading:false
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        post:{...state.post , comments: state.post.comments.filter(comment => comment._id !== payload.commentId)}
      }
        
    default:
      return state;
  }
};
