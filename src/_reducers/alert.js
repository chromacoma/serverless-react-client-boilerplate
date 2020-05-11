import alertConstants from '../_constants/alert';

const initialState = null;

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message,
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message,
      };
    case alertConstants.CLEAR:
      return null;
    default:
      return state;
  }
};

export default alertReducer;
