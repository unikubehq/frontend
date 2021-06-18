import {
  Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import { TOrganizationMember, TOrganizationNode } from '@/generated/graphql';

@Module({ namespaced: true, name: 'context' })
export default class Context extends VuexModule {
  organization: TOrganizationNode | null = null;

  organizationMember: TOrganizationMember | null = null;

  sidebarExpanded = true;

  @Mutation
  setOrganization(organization: TOrganizationNode): void {
    this.organization = organization;
    if (organization) {
      localStorage.setItem('contextOrganization', JSON.stringify(organization.id));
    }
  }

  @Mutation
  setOrganizationMember(member: TOrganizationMember): void {
    this.organizationMember = member;
  }

  @Mutation
  setSidebarExpansion(expanded: boolean): void {
    this.sidebarExpanded = expanded;
    localStorage.setItem('sidebarExpanded', JSON.stringify(expanded));
  }

  @Mutation
  initContext(): void {
    if (localStorage.getItem('sidebarExpanded')) {
      this.sidebarExpanded = JSON.parse(localStorage.getItem('sidebarExpanded') || 'true');
    }
  }
}
