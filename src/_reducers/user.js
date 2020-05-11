import userConstants from '../_constants/user';

const initialState = {
  isLoading: false,
  isUpdating: false,
  isDeleting: false,
  user: null,
  error: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case userConstants.GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.result,
      };
    case userConstants.GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case userConstants.UPDATE_REQUEST:
      return {
        ...state,
        isUpdating: true,
        error: null,
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        user: { ...state.user, ...action.result },
      };
    case userConstants.UPDATE_FAILURE:
      return {
        ...state,
        isUpdating: false,
        error: action.error,
      };
    case userConstants.DELETE_REQUEST:
      return {
        ...state,
        isDeleting: true,
      };
    case userConstants.DELETE_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        user: null,
      };
    case userConstants.DELETE_FAILURE:
      return {
        ...state,
        isDeleting: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default userReducer;
