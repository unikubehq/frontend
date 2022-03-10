// import { createStore } from 'vuex';
// import UI from '@/store/modules/ui';
// import { State as AuthState } from '@/store/modules/auth/state';
// import { State as ContextState } from '@/store/modules/context/state';
// import { store as auth } from '@/store/modules/auth';
// import { store as context } from '@/store/modules/context';
// import Errors from '@/store/modules/errors';
//
// export type RootState = {
//   context: ContextState;
//   auth: AuthState;
// };
//
// const store = createStore({
//   modules: {
//     auth,
//     context,
//     ui: UI,
//     errors: Errors,
//   },
// });
//
// export default store;

import { createPinia, Pinia, setActivePinia } from 'pinia';

let piniaStore;
if (process.env.NODE_ENV === 'e2e') {
  // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  piniaStore = window.__pinia_store__ as Pinia;
  setActivePinia(piniaStore);
} else {
  piniaStore = createPinia();
}
const pinia = piniaStore;

export default pinia as Pinia;
