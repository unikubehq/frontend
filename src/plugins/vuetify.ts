import '@mdi/font/css/materialdesignicons.css';

import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import AccountBlue from '@/components/icons/AccountBlue.vue';
import DropdownSmallGrey from '@/components/icons/DropdownSmallGrey.vue';
import HidePassword from '@/components/icons/HidePassword.vue';
import ShowPassword from '@/components/icons/ShowPassword.vue';
import Password from '@/components/icons/Password.vue';
import Burger from '@/components/icons/Menu.vue';
import User from '@/components/icons/User.vue';
import Overview from '@/components/icons/Overview.vue';
import Permission from '@/components/icons/Permission.vue';
import Activity from '@/components/icons/Activity.vue';
import Help from '@/components/icons/Help.vue';
import Settings from '@/components/icons/Settings.vue';
import ArrowDownWhite from '@/components/icons/ArrowDownWhite.vue';
import Email from '@/components/icons/Email.vue';
import Logout from '@/components/icons/Logout.vue';
import NotificationBlue from '@/components/icons/NotificationBlue.vue';
import CreateOrganization from '@/components/icons/CreateOrganization.vue';
import JoinOrganization from '@/components/icons/JoinOrganization.vue';
import CheckboxChecked from '@/components/icons/CheckboxChecked.vue';
import CheckboxUnchecked from '@/components/icons/CheckboxUnchecked.vue';
import PersonalInfo from '@/components/icons/PersonalInfo.vue';

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
      accountBlue: {
        component: AccountBlue,
      },
      eye: {
        component: HidePassword,
      },
      eyeOpen: {
        component: ShowPassword,
      },
      burger: {
        component: Burger,
      },
      dropdown: {
        component: DropdownSmallGrey,
      },
      user: {
        component: User,
      },
      email: {
        component: Email,
      },
      logout: {
        component: Logout,
      },
      notificationBlue: {
        component: NotificationBlue,
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
      permission: {
        component: Permission,
      },
      overview: {
        component: Overview,
      },
      activity: {
        component: Activity,
      },
      help: {
        component: Help,
      },
      settings: {
        component: Settings,
      },
      joinOrganization: {
        component: JoinOrganization,
      },
      createOrganization: {
        component: CreateOrganization,
      },
      arrowDownWhite: {
        component: ArrowDownWhite,
      },
      personalInfo: {
        component: PersonalInfo,
      },
    },
  },
});
