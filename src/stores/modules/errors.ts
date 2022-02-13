import { MutationTree } from 'vuex';
import { UnikubeError } from '@/typing/index';

const errorCodeMapping: any = {
  100: 'errors.100',
  101: 'errors.101',
};

class State {
  errors: UnikubeError[] = []
}

const mutations = <MutationTree<State>>{
  /* eslint-disable @typescript-eslint/no-explicit-any */
  setError(state: State, payload: { error: Error, location: string, code: number }): void {
    if (!state.errors.some((el) => el.code === payload.code)) {
      state.errors.push(
        {
          error: payload.error,
          message: errorCodeMapping[payload.code],
          location: payload.location,
          code: payload.code,
        },
      );
    }
    // TODO Send to Sentry
  },
  clearError(state: State): void {
    state.errors.pop();
  },
};

const Errors = {
  namespaced: true,
  state: new State(),
  mutations,
};

export default Errors;
