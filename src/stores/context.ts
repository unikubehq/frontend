import { defineStore } from 'pinia';
import { SnackbarMessage } from '@/typing';
import { TOrganizationMember, TOrganizationNode } from '@/generated/graphql';

interface State {
  organization: TOrganizationNode | null
  sidebarExpanded: boolean,
  organizationMember: TOrganizationMember | null
  messages: SnackbarMessage[]
}

const useContextStore = defineStore('context', {
  state: (): State => ({
    organization: null,
    sidebarExpanded: false,
    organizationMember: null,
    messages: [],
  }),
  actions: {
    addSnackbarMessage({ message, error }: { message: string, error: boolean}) {
      this.messages.push({
        message, show: true, error, id: new Date().getTime(),
      });
    },
    setOrganization(organization: TOrganizationNode): void {
      this.organization = organization;
      if (organization) {
        localStorage.setItem('contextOrganization', JSON.stringify(organization.id));
      }
    },
    setOrganizationMember(member: TOrganizationMember): void {
      this.organizationMember = member;
    },
    setSidebarExpansion(expanded: boolean): void {
      this.sidebarExpanded = expanded;
      localStorage.setItem('sidebarExpanded', JSON.stringify(expanded));
    },
    initContext(): void {
      if (localStorage.getItem('sidebarExpanded')) {
        this.sidebarExpanded = JSON.parse(localStorage.getItem('sidebarExpanded') || 'true');
      }
    },
  },
});

export default useContextStore;
