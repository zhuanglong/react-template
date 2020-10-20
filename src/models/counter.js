export default {
  namespace: 'counter',

  state: {
    count: 0
  },

  reducers: {
    increment(state) {
      return {
        ...state,
        count: state.count + 1
      };
    },
    decrement(state) {
      return {
        ...state,
        count: state.count - 1
      };
    },
    reset(state) {
      return {
        ...state,
        count: 0
      };
    }
  }
};
