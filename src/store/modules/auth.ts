import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import jwtDecode from 'jwt-decode';

@Module({ namespaced: true })
export default class Auth extends VuexModule {
  accessToken = '';

  refreshToken: string | null = localStorage.getItem('refreshToken') || null;

  expiryDate: string | null = localStorage.getItem('exp') || null;

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

  @Mutation
  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  @Mutation
  setRefreshToken(refreshToken: string): void {
    localStorage.setItem('refreshToken', refreshToken);
    this.refreshToken = refreshToken;
  }

  @Mutation
  resetRefreshToken(): void {
    localStorage.removeItem('refreshToken');
    this.refreshToken = null;
  }

  @Mutation
  setExpiry(expiryDate: string): void {
    localStorage.setItem('exp', expiryDate);
    this.expiryDate = expiryDate;
  }

  @Mutation
  resetExpiry(): void {
    localStorage.removeItem('exp');
    this.expiryDate = null;
  }

  @Action
  logout(): void {
    this.context.commit('resetExpiry');
    this.context.commit('resetRefreshToken');
    this.context.commit('resetAccessToken');
  }

  @Action
  updateToken(res: TokenResponse): void {
    this.context.commit('setAccessToken', res.access);
    if (res.refresh) {
      this.context.commit('setRefreshToken', res.refresh);
    }
    this.context.commit('setExpiry', res.exp);
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
