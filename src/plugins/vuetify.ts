import '@mdi/font/css/materialdesignicons.css';

import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import HidePassword from '@/components/icons/HidePassword.vue';
import Password from '@/components/icons/Password.vue';
import User from '@/components/icons/User.vue';
import CheckboxChecked from '@/components/icons/CheckboxChecked.vue';
import CheckboxUnchecked from '@/components/icons/CheckboxUnchecked.vue';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#45D093',
        anchor: '#45D093',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
    values: {
      eye: {
        component: HidePassword,
      },
      user: {
        component: User,
      },
      password: {
        component: Password,
      },
      checkboxOn: {
        component: CheckboxChecked,
      },
      checkboxOff: {
        component: CheckboxUnchecked,
      },
    },
  },
});
