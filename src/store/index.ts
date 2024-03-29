import Vue from 'vue';
import Vuex from 'vuex';
import Auth from '@/store/modules/auth';
import UI from '@/store/modules/ui';
import Context from '@/store/modules/context';
import Errors from '@/store/modules/errors';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: Auth,
    ui: UI,
    context: Context,
    errors: Errors,
  },
});
