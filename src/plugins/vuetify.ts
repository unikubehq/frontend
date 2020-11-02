import '@mdi/font/css/materialdesignicons.css';

import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import HidePassword from '@/components/icons/HidePassword.vue';
import ShowPassword from '@/components/icons/ShowPassword.vue';
import Password from '@/components/icons/Password.vue';
import User from '@/components/icons/User.vue';
import Email from '@/components/icons/Email.vue';
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
      eyeOpen: {
        component: ShowPassword,
      },
      user: {
        component: User,
      },
      email: {
        component: Email,
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
