import { MutationTree } from 'vuex';
import jwtDecode from 'jwt-decode';
import * as Sentry from '@sentry/vue';
import { State } from './state';

const mutations = <MutationTree<State>>{
  setRpt(state, rpt: string): void {
    state.rawRpt = rpt;
    state.rpt = jwtDecode(rpt);
    state.username = state.rpt.name;
    state.email = state.rpt.email;
    state.uuid = state.rpt.sub;
    Sentry.setUser({ email: state.email });
  },
  setAvatar(state, avatarUrl: string): void {
    state.avatarImage = avatarUrl;
  },
  // eslint-disable-next-line
  setKeycloakClient(state, keycloak: any): void {
    state.client = keycloak;
  },
};

export default mutations;
