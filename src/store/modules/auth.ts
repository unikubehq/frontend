import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import jwtDecode from 'jwt-decode';

@Module({ namespaced: true })
export default class Auth extends VuexModule {
  client: any;

  rpt: any;

  rawRpt = '';

  username = '';

  @Mutation
  setRpt(rpt: string): void {
    this.rawRpt = rpt;
    this.rpt = jwtDecode(rpt);
    this.username = this.rpt.name;
  }

  @Action
  scheduleRefresh() {
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
  setKeycloakClient(keycloak: any): void {
    this.client = keycloak;
  }

  @Action
  logout(): void {
    this.client.logout();
  }

  @Action
  refresh() {
    this.client.updateToken(30).then((refreshed: boolean) => {
      if (refreshed) {
        this.context.dispatch('scheduleRefresh');
      }
    });
  }
}
