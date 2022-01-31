import { TOrganizationMember, TOrganizationNode } from '@/generated/graphql';
import { SnackbarMessage } from '@/typing';

export type State = {
  organization: TOrganizationNode | null
  sidebarExpanded: boolean,
  organizationMember: TOrganizationMember | null
  messages: SnackbarMessage[]
}

export const state: State = {
  organization: null,
  organizationMember: null,
  sidebarExpanded: true,
  messages: [],
};
