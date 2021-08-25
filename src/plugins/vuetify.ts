import '@mdi/font/css/materialdesignicons.css';

import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import Account from '@/components/icons/Account.vue';
import AddMember from '@/components/icons/AddMember.vue';
import AccountBlue from '@/components/icons/AccountBlue.vue';
import BigSorry from '@/components/icons/BigSorry.vue';
import Description from '@/components/icons/Description.vue';
import DefaultOrganization from '@/components/icons/DefaultOrganization.vue';
import AccessUser from '@/components/icons/AccessUser.vue';
import AccessToken from '@/components/icons/AccessToken.vue';
import Branch from '@/components/icons/Branch.vue';
import Cross from '@/components/icons/Cross.vue';
import ExistingMembers from '@/components/icons/ExistingMembers.vue';
import JoinOrganizationBig from '@/components/icons/JoinOrganizationBig.vue';
import CreateOrganizationBig from '@/components/icons/CreateOrganizationBig.vue';
import DropdownSmallGrey from '@/components/icons/DropdownSmallGrey.vue';
import HidePassword from '@/components/icons/HidePassword.vue';
import ShowPassword from '@/components/icons/ShowPassword.vue';
import Helm from '@/components/icons/Helm.vue';
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
import Notification from '@/components/icons/Notification.vue';
import NotificationBlue from '@/components/icons/NotificationBlue.vue';
import ProjectInput from '@/components/icons/ProjectInput.vue';
import Repository from '@/components/icons/Repository.vue';
import CreateOrganization from '@/components/icons/CreateOrganization.vue';
import JoinOrganization from '@/components/icons/JoinOrganization.vue';
import CheckboxChecked from '@/components/icons/CheckboxChecked.vue';
import CheckboxUnchecked from '@/components/icons/CheckboxUnchecked.vue';
import PersonalInfo from '@/components/icons/PersonalInfo.vue';
import NoProjectsFound from '@/components/icons/NoProjectsFound.vue';
import AddProject from '@/components/icons/AddProject.vue';
import Search from '@/components/icons/Search.vue';
import Project from '@/components/icons/Project.vue';
import Delete from '@/components/icons/Delete.vue';
import Edit from '@/components/icons/Edit.vue';
import Deployments from '@/components/icons/Deployments.vue';
import Organization from '@/components/icons/Organization.vue';
import ArrowRightWhite from '@/components/icons/ArrowRightWhite.vue';
import ArrowRightGrey from '@/components/icons/ArrowRightGrey.vue';
import AddRound from '@/components/icons/AddRound.vue';
import Done from '@/components/icons/Done.vue';
import Copy from '@/components/icons/Copy.vue';
import Warning from '@/components/icons/Warning.vue';
import OrganizationSettings from '@/components/icons/OrganizationSettings.vue';
import OrganizationSettingsBlue from '@/components/icons/OrganizationSettingsBlue.vue';
import OrganizationRoles from '@/components/icons/OrganizationRoles.vue';
import OrganizationRolesBlue from '@/components/icons/OrganizationRolesBlue.vue';
import Payment from '@/components/icons/Payment.vue';
import PaymentBlue from '@/components/icons/PaymentBlue.vue';
import Sync from '@/components/icons/Sync.vue';
import TickWhiteBg from '@/components/icons/TickWhiteBg.vue';
import ErrorWhiteBg from '@/components/icons/ErrorWhiteBg.vue';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#45D093',
        secondary: '#F8FFFC',
        anchor: '#45D093',
        error: '#ff7364',
        neutral: '#C4CCD4',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
    values: {
      account: {
        component: Account,
      },
      accountBlue: {
        component: AccountBlue,
      },
      addMember: {
        component: AddMember,
      },
      description: {
        component: Description,
      },
      accessUser: {
        component: AccessUser,
      },
      accessToken: {
        component: AccessToken,
      },
      bigSorry: {
        component: BigSorry,
      },
      branch: {
        component: Branch,
      },
      createOrganizationBig: {
        component: CreateOrganizationBig,
      },
      existingMembers: {
        component: ExistingMembers,
      },
      defaultOrganization: {
        component: DefaultOrganization,
      },
      joinOrganizationBig: {
        component: JoinOrganizationBig,
      },
      repository: {
        component: Repository,
      },
      projectInput: {
        component: ProjectInput,
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
      cross: {
        component: Cross,
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
      helm: {
        component: Helm,
      },
      notification: {
        component: Notification,
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
      noProjectsFound: {
        component: NoProjectsFound,
      },
      addProject: {
        component: AddProject,
      },
      search: {
        component: Search,
      },
      project: {
        component: Project,
      },
      delete: {
        component: Delete,
      },
      edit: {
        component: Edit,
      },
      deployments: {
        component: Deployments,
      },
      organization: {
        component: Organization,
      },
      arrowRightWhite: {
        component: ArrowRightWhite,
      },
      arrowRightGrey: {
        component: ArrowRightGrey,
      },
      addRound: {
        component: AddRound,
      },
      done: {
        component: Done,
      },
      copy: {
        component: Copy,
      },
      warning: {
        component: Warning,
      },
      organizationSettings: {
        component: OrganizationSettings,
      },
      organizationSettingsBlue: {
        component: OrganizationSettingsBlue,
      },
      organizationRoles: {
        component: OrganizationRoles,
      },
      organizationRolesBlue: {
        component: OrganizationRolesBlue,
      },
      payment: {
        component: Payment,
      },
      paymentBlue: {
        component: PaymentBlue,
      },
      sync: {
        component: Sync,
      },
      tickWhiteBg: {
        component: TickWhiteBg,
      },
      errorWhiteBg: {
        component: ErrorWhiteBg,
      },
    },
  },
});
