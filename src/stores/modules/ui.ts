import { MutationTree } from 'vuex';

class State {
  overlay = false
}

const mutations = <MutationTree<State>>{
  setOverlay(state: State, overlay: boolean): void {
    state.overlay = overlay;
  },
};

const UI = {
  namespaced: true,
  state: new State(),
  mutations,
};

export default UI;
