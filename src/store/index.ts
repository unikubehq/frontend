import Vue from 'vue';
import Vuex from 'vuex';
import Auth from '@/store/modules/auth';
import UI from '@/store/modules/ui';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: Auth,
    ui: UI,
  },
});
