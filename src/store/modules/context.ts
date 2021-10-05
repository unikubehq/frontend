import { MutationTree } from 'vuex';
import { TOrganizationMember, TOrganizationNode } from '@/generated/graphql';
import { SnackbarMessage } from '@/typing';

class State {
  organization: TOrganizationNode | null = null;

  organizationMember: TOrganizationMember | null = null;

  sidebarExpanded = true;

  messages: SnackbarMessage[] = [];
}

const mutations = <MutationTree<State>>{
  addSnackbarMessage(state: State, { message, error }) {
    state.messages.push({
      message, show: true, error, id: new Date().getTime(),
    });
  },

  setOrganization(state: State, organization: TOrganizationNode): void {
    state.organization = organization;
    if (organization) {
      localStorage.setItem('contextOrganization', JSON.stringify(organization.id));
    }
  },

  setOrganizationMember(state: State, member: TOrganizationMember): void {
    state.organizationMember = member;
  },

  setSidebarExpansion(state: State, expanded: boolean): void {
    state.sidebarExpanded = expanded;
    localStorage.setItem('sidebarExpanded', JSON.stringify(expanded));
  },

  initContext(state: State): void {
    if (localStorage.getItem('sidebarExpanded')) {
      state.sidebarExpanded = JSON.parse(localStorage.getItem('sidebarExpanded') || 'true');
    }
  },
};

const Context = {
  namespaced: true,
  state: new State(),
  mutations,
};

export default Context;
