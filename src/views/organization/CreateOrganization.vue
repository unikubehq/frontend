<template>
  <v-main>
    <v-container fluid fill-height class="container--login">
      <v-img src="@/assets/img/Unikube-Logo-Icon.svg" class="logo--bottom"
             height="40%" width="30%" contain position="bottom right"/>
      <v-row justify="center">
        <v-col cols="10" class="text-center">
          <v-img class="d-inline-block" src="@/assets/img/Unikube-Logo-H.svg"
                 max-width="150"/>
        </v-col>
        <orga-title v-if="step === 0" v-on:success="orgaCreation"></orga-title>
        <create-organization-project
          v-if="step === 1"
          v-on:success="nextStep"
        ></create-organization-project>
        <orga-members v-if="step === 2" v-on:success="nextStep()"></orga-members>
        <orga-done v-if="step === 3" :orgaId="organizationId" :orgaTitle="organizationTitle">
        </orga-done>
      </v-row>
    </v-container>
  </v-main>

</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import OrgaTitle from '@/components/createOrganizationFlow/OrgaTitle.vue';
import CreateOrganizationProject
  from '@/components/createOrganizationFlow/CreateOrganizationProject.vue';
import OrgaMembers from '@/components/createOrganizationFlow/OrgaMembers.vue';
import OrgaDone from '@/components/createOrganizationFlow/OrgaDone.vue';

@Component({
  components: {
    OrgaTitle,
    CreateOrganizationProject,
    OrgaMembers,
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

  orgaCreation(id: string, title: string): void {
    this.organizationId = id;
    this.organizationTitle = title;
    this.step += 1;
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
