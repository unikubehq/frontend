import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import jwtDecode from 'jwt-decode';

@Module({ namespaced: true, name: 'auth' })
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
  initKeycloak(): void {
    this.client.init({
      onLoad: 'login-required',
    }).then((authenticated: boolean) => {
      console.log(authenticated ? 'Authenticated.' : 'Not authenticated.');
      console.log(this.client.token);
    });
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
    this.client.refresh();
  }
}
