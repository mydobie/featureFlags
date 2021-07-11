import { actionType } from './index';

const initialState = { data: ['foo'], loading: false, error: null };

const Reducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    // EXAMPLE: Reducer case
    default:
      return state;
  }
};

export default Reducer;
