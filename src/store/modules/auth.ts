import AuthClient from '@/auth';
import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';

@Module({ namespaced: true, name: 'auth' })
export default class Auth extends VuexModule {
  client: AuthClient = new AuthClient(process.env.VUE_APP_AUTH_URL || 'http://localhost:8880');

  accessToken: string | null = localStorage.getItem('accessToken') || null;

  refreshToken: string | null = localStorage.getItem('refreshToken') || null;

  expiryDate: string | null = localStorage.getItem('exp') || null;

  @Mutation
  setAccessToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    this.accessToken = accessToken;
  }

  @Mutation
  resetAccessToken(): void {
    localStorage.removeItem('accessToken');
    this.accessToken = null;
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
  async authenticate(credentials: LoginCredentials): Promise<boolean> {
    return this.client?.authenticate(credentials).then((res) => {
      this.context.dispatch('updateToken', res).then(() => {
        this.context.dispatch('scheduleRefresh');
      });
      return true;
    }).catch(() => false);
  }

  @Action
  refresh(): void {
    /*
     * Retrieve a fresh JWT token.
     * If everything went good, update token and exp time in localstorage.
     * If it does not work return to login.
     */
    if (this.refreshToken) {
      this.client?.refresh(this.refreshToken).then((res) => {
        this.context.dispatch('updateToken', res);
        this.context.dispatch('scheduleRefresh');
      }).catch((err) => {
        console.error(err);
        this.context.dispatch('logout');
      });
    }
  }

  @Action
  scheduleRefresh(): void {
    /*
     * Retrieve expire time from state. When available schedule function call to refresh the auth
     * token.
     */
    if (this.expiryDate) {
      console.log(this.expiryDate);
      const now = new Date();
      const expiryDate = new Date(parseInt(this.expiryDate, 10) * 1000);
      let timeout: number;
      timeout = expiryDate.getTime() - now.getTime() - (30 * 1000); // 30s offset
      if (timeout < 0) {
        timeout = 0;
      }
      console.debug(`Scheduling refresh JWT token in ${timeout / 1000}s`);
      setTimeout(() => {
        this.context.dispatch('refresh');
      }, timeout);
    }
  }

  @Action
  logout(): void {
    // this.context.commit('context/resetCurrentOrganization', null, { root: true });
    // this.context.dispatch('resetAbilities');
    this.context.commit('resetExpiry');
    this.context.commit('resetRefreshToken');
    this.context.commit('resetAccessToken');
  }

  // @Action
  // resetAbilities() {
  //   this.context.getters.ability.update([]);
  // }

  // @Action
  // updatePermissions() {
  //   axios.get('/api/permissions/', {
  //     headers: {
  //       Authorization: `Bearer ${this.accessToken}`,
  //     },
  //   }).then((res) => {
  //     this.context.getters.ability.update(res.data.abilities);
  //     commit('setAbilities', res.data.abilities)
  // });
  // }

  @Action
  updateToken(res: TokenResponse): void {
    this.context.commit('setAccessToken', res.access);
    if (res.refresh) {
      this.context.commit('setRefreshToken', res.refresh);
    }
    this.context.commit('setExpiry', res.exp);
    // this.context.dispatch('updatePermissions');
  }
}
