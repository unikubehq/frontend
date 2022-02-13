import { defineStore } from 'pinia';
import { KeycloakInstance } from 'keycloak-js';
import { Ability, AbilityBuilder, SubjectRawRule } from '@casl/ability';
import { Action as UAction, IPermission, UnikubeAbility } from '@/typing';
import * as Sentry from '@sentry/vue';
import jwtDecode from 'jwt-decode';

interface State {
    client: KeycloakInstance | null,
    rpt: any,
    rawRpt: string,
    uuid: string,
    username: string,
    avatarImage: string,
    email: string,
}

const useAuthStore = defineStore('auth', {
  state: (): State => ({
    client: null,
    rpt: null,
    rawRpt: '',
    uuid: '',
    username: '',
    avatarImage: '',
    email: '',
  }),
  getters: {
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
  },
  actions: {
    setRpt(rpt: string): void {
      this.rawRpt = rpt;
      this.rpt = jwtDecode(rpt);
      this.username = this.rpt.name;
      this.email = this.rpt.email;
      this.uuid = this.rpt.sub;
      Sentry.setUser({ email: this.email });
    },
    setKeycloakClient(keycloak: KeycloakInstance): void {
      this.client = keycloak;
    },
    async refresh(seconds = 30): Promise<boolean> {
      return this.client?.updateToken(seconds).then(async (refreshed: boolean) => {
        if (refreshed) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const authorization = new KeycloakAuthorization(this.client);
          await authorization.ready;
          const rpt = await authorization.entitlement('gateway');
          this.setRpt(rpt);
          this.scheduleRefresh();
        }
        return refreshed;
      }) || new Promise((resolve) => {
        resolve(false);
      });
    },
    logout(): void {
      Sentry.configureScope((scope) => scope.setUser(null));
      this.client?.logout();
    },
    scheduleRefresh(): void {
      const token = this.client?.tokenParsed;
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
          this.refresh();
        }, timeout);
      }
    },
  },
});

export default useAuthStore;
