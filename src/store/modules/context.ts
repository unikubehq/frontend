import {
  Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import { TOrganizationMember, TOrganizationNode } from '@/generated/graphql';

@Module({ namespaced: true, name: 'context' })
export default class Context extends VuexModule {
  organization: TOrganizationNode | null = null;

  organizationMember: TOrganizationMember | null = null;

  @Mutation
  setOrganization(organization: TOrganizationNode): void {
    this.organization = organization;
  }

  @Mutation
  setOrganizationMember(member: TOrganizationMember): void {
    this.organizationMember = member;
  }
}
