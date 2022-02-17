import { VuetifyOptions } from 'vuetify';

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
import Cli from '@/components/icons/Cli.vue';
import SmallBulb from '@/components/icons/SmallBulb.vue';
import { IconProps, IconSet } from 'vuetify/dist/vuetify';
import { h } from 'vue';

const aliases = {
  account: Account,
  accountBlue: AccountBlue,
  addMember: AddMember,
  description: Description,
  accessUser: AccessUser,
  accessToken: AccessToken,
  bigSorry: BigSorry,
  branch: Branch,
  createOrganizationBig: CreateOrganizationBig,
  existingMembers: ExistingMembers,
  defaultOrganization: DefaultOrganization,
  joinOrganizationBig: JoinOrganizationBig,
  repository: Repository,
  projectInput: ProjectInput,
  eye: HidePassword,
  eyeOpen: ShowPassword,
  burger: Burger,
  cli: Cli,
  smallBulb: SmallBulb,
  cross: Cross,
  dropdown: DropdownSmallGrey,
  user: User,
  email: Email,
  logout: Logout,
  helm: Helm,
  notification: Notification,
  notificationBlue: NotificationBlue,
  password: Password,
  checkboxOn: CheckboxChecked,
  checkboxOff: CheckboxUnchecked,
  permission: Permission,
  overview: Overview,
  activity: Activity,
  help: Help,
  settings: Settings,
  joinOrganization: JoinOrganization,
  createOrganization: CreateOrganization,
  arrowDownWhite: ArrowDownWhite,
  personalInfo: PersonalInfo,
  noProjectsFound: NoProjectsFound,
  addProject: AddProject,
  search: Search,
  project: Project,
  delete: Delete,
  edit: Edit,
  deployments: Deployments,
  organization: Organization,
  arrowRightWhite: ArrowRightWhite,
  arrowRightGrey: ArrowRightGrey,
  addRound: AddRound,
  done: Done,
  copy: Copy,
  warning: Warning,
  organizationSettings: OrganizationSettings,
  organizationSettingsBlue: OrganizationSettingsBlue,
  organizationRoles: OrganizationRoles,
  organizationRolesBlue: OrganizationRolesBlue,
  payment: Payment,
  paymentBlue: PaymentBlue,
  sync: Sync,
  tickWhiteBg: TickWhiteBg,
  errorWhiteBg: ErrorWhiteBg,
};

const custom: IconSet = {
  component: (props: IconProps) => h(`<component :is="${props.icon}">`),
};

const vuetifyOptions: VuetifyOptions = {
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        variables: {},
        colors: {
          primary: '#45D093',
          secondary: '#F8FFFC',
          anchor: '#45D093',
          error: '#ff7364',
          neutral: '#C4CCD4',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          background: '#FFFFFF',
          surface: '#FFFFFF',
        },
      },
    },
  },
  icons: {
    defaultSet: 'custom',
    aliases,
    sets: {
      custom,
    },
  },
  defaults: {
    global: {
      ripple: false,
      elevation: 0,
    },
  },
};

export default vuetifyOptions;
