import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import { AbilityBuilder, Ability, SubjectRawRule } from '@casl/ability';
import jwtDecode from 'jwt-decode';
import {
  Action as UAction, IPermission, UnikubeAbility,
} from '@/typing';
import Vue from 'vue';

@Module({ namespaced: true, name: 'auth' })
export default class Auth extends VuexModule {
  // eslint-disable-next-line
  client: any;

  // eslint-disable-next-line
  rpt: any;

  rawRpt = '';

  username = '';

  get caslRules(): SubjectRawRule<any, any, any>[] {
    const { can, rules } = new AbilityBuilder<UnikubeAbility>(Ability);
    this.rpt.authorization.permissions.forEach((permission: IPermission) => {
      console.log(permission);
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
  }

  @Mutation
  setRpt(rpt: string): void {
    this.rawRpt = rpt;
    Vue.set(
      this,
      'rpt',
      jwtDecode(rpt),
    );
    this.username = this.rpt.name;
  }

  @Action
  scheduleRefresh(): void {
    const token = this.client.tokenParsed;
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
        this.context.dispatch('refresh');
      }, timeout);
    }
  }

  @Mutation
  // eslint-disable-next-line
  setKeycloakClient(keycloak: any): void {
    this.client = keycloak;
  }

  @Action
  logout(): void {
    this.client.logout();
  }

  @Action
  refresh(seconds = 30): void {
    this.client.updateToken(seconds).then((refreshed: boolean) => {
      if (refreshed) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const authorization = new KeycloakAuthorization(this.client);
        authorization.ready.then(() => {
          authorization.entitlement('gateway').then((rpt: string) => {
            this.context.commit('setRpt', rpt);
          });
        });
        this.context.dispatch('scheduleRefresh');
      }
    });
  }
}
