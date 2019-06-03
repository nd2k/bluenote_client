export const state = () => ({
  list: []
});

export const mutation = {
  add(state, plat) {
    state.list.push(plat);
  },
  emptyList(state) {
    state.list = [];
  }
};

export const getters = {
  list: state => {
    return state.list;
  }
};
