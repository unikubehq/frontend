<template>
  <v-main>
    <v-container fluid fill-height class="container--login">
      <v-img src="@/assets/img/Unikube-Logo-Icon.svg" class="logo--bottom" alt="Unikube Logo"
             height="40%" width="30%" contain position="bottom right"/>
      <v-row justify="center">
        <v-col cols="10" class="text-center">
          <v-img class="d-inline-block" src="@/assets/img/Unikube-Logo-H.svg"
                 alt="Unikube Logo" max-width="150"/>
        </v-col>
        <create-or-join v-if="step === 0" @success="nextStep" />
        <organization-title v-if="step === 1" @success="orgaCreation"></organization-title>
        <organization-logo v-if="step === 2" @success="logoCreation"
            :organization-id="organizationId" />
        <organization-members v-if="step === 4" @success="nextStep"/>
        <orga-done v-if="step === 5" :orgaId="organizationId" :orgaTitle="organizationTitle" />
      </v-row>
    </v-container>
  </v-main>

</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreateOrJoin from '@/components/Organizations/CreateOrJoin.vue';
import OrganizationTitle from '@/components/Organizations/OrganizationTitle.vue';
import OrganizationLogo from '@/components/Organizations/OrganizationLogo.vue';
import OrganizationMembers from '@/components/Organizations/OrganizationMembers.vue';
import OrgaDone from '@/components/Organizations/OrgaDone.vue';
import { TOrganizationNode } from '@/generated/graphql';

@Component({
  components: {
    CreateOrJoin,
    OrganizationTitle,
    OrganizationLogo,
    OrganizationMembers,
    OrgaDone,
  },
})
export default class CreateOrganization extends Vue {
  step = 0;

  organizationId = '';

  organizationTitle = '';

  nextStep(): void {
    this.step += 1;
  }

  orgaCreation(organization: TOrganizationNode): void {
    this.organizationId = organization.id;
    this.organizationTitle = organization.title;
    this.$store.commit('context/setOrganization', organization);
    this.step = 2;
  }

  logoCreation(): void {
    this.step = 4;
  }
}
</script>

<style lang="scss" scoped>
.logo--bottom {
  position: absolute;
  bottom: -13%;
  right: -60px;
  opacity: 0.1;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */
{
  transform: translateX(10px);
  opacity: 0;
}
</style>
