export const state = () => ({
  list: []
});

export const mutations = {
  add(state, menu) {
    state.list.push(menu);
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
