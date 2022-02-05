import {
  Module,
} from 'vuex';

import { RootState } from '@/store';
import { State, state } from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export const store: Module<State, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
