import { AbilityBuilder, Ability, SubjectRawRule } from '@casl/ability';
import jwtDecode from 'jwt-decode';
import {
  Action as UAction, IPermission, UnikubeAbility,
} from '@/typing';
import Vue from 'vue';
import { ActionTree, MutationTree } from 'vuex';

class State {
  // eslint-disable-next-line
  client: any;

  // eslint-disable-next-line
  rpt: any;

  rawRpt = '';

  uuid = '';

  username = '';

  avatarImage = '';

  email = '';
}

const mutations = <MutationTree<State>>{
  setRpt(state, rpt: string): void {
    state.rawRpt = rpt;
    Vue.set(
      state,
      'rpt',
      jwtDecode(rpt),
    );
    state.username = state.rpt.name;
    state.email = state.rpt.email;
    state.uuid = state.rpt.sub;
  },
  setAvatar(state, avatarUrl: string): void {
    state.avatarImage = avatarUrl;
  },
  // eslint-disable-next-line
  setKeycloakClient(state, keycloak: any): void {
    console.log('set client wgaaat');
    state.client = keycloak;
  },
};

const actions = <ActionTree<State, any>>{
  async refresh(context, seconds = 30): Promise<boolean> {
    console.log('Updating Token123');
    console.log(context.state.client);
    return context.state.client.updateToken(seconds).then(async (refreshed: boolean) => {
      if (refreshed) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const authorization = new KeycloakAuthorization(context.state.client);
        await authorization.ready;
        const rpt = await authorization.entitlement('gateway');
        context.commit('setRpt', rpt);
        context.dispatch('scheduleRefresh');
      }
      return refreshed;
    });
  },
  logout(context): void {
    context.state.client.logout();
  },
  scheduleRefresh(context): void {
    const token = context.state.client.tokenParsed;
    if (token && token.exp) {
      const now = new Date();
      const expiryDate = new Date(token.exp * 1000);
      let timeout: number;
      timeout = expiryDate.getTime() - now.getTime(); // 30s offset
      if (timeout < 0) {
        timeout = 0;
      }
      console.debug(`Scheduling refresh JWT token in ${timeout / 1000}s`);

      setTimeout(() => {
        context.dispatch('refresh');
      }, timeout);
    }
  },
};

const getters = {
  // eslint-disable-next-line
  caslRules(state: State): SubjectRawRule<any, any, any>[] {
    const { can, rules } = new AbilityBuilder<UnikubeAbility>(Ability);
    state.rpt.authorization.permissions.forEach((permission: IPermission) => {
      const type = permission.rsname.split(' ')[0];
      const nameMap: {[key: string]: string} = {
        project: 'ProjectNode',
        organization: 'OrganizationNode',
      };
      if (!Object.keys(nameMap).includes(type)) return;
      permission.scopes.forEach((scope) => {
        const verb: UAction = scope.substring(scope.indexOf(':') + 1) as UAction;
        can(verb, nameMap[type], { id: permission.rsid });
      });
    });
    return rules;
  },
};

const Auth = {
  namespaced: true,
  state: new State(),
  mutations,
  actions,
  getters,
};

export default Auth;
