import { ActionTree } from 'vuex';
import * as Sentry from '@sentry/vue';
import { State } from './state';

const actions = <ActionTree<State, any>>{
  async refresh(context, seconds = 30): Promise<boolean> {
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
    Sentry.configureScope((scope) => scope.setUser(null));
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

export default actions;
