import {
  Module,
} from 'vuex';

import { RootState } from '@/store';
import { State, state } from './state';
import mutations from './mutations';

export const store: Module<State, RootState> = {
  namespaced: true,
  state,
  mutations
}
