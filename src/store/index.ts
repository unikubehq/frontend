import { createStore } from 'vuex';
import UI from '@/store/modules/ui';
import { State as AuthState } from '@/store/modules/auth/state';
import { State as ContextState } from '@/store/modules/context/state';
import { store as auth } from './modules/auth';
import { store as context } from '@/store/modules/context';
import Errors from '@/store/modules/errors';

export type RootState = {
  context: ContextState;
  auth: AuthState;
};

const store = createStore({
  modules: {
    auth,
    context,
    ui: UI,
    errors: Errors,
  },
});

export default store;
