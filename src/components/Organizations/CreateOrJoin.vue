<template>
  <v-col cols="12" sm="8" md="6">
   <v-row>
     <v-col cols="6">
       <v-card elevation="0" outlined class="pa-6">
         <v-card-title>
           <create-organization-big />
           <v-spacer />
         </v-card-title>
         <v-card-text>
           <h1 class="text-h1 text--primary">{{ $t('organization.createOrganization') }}</h1>
           <p class="text-lg-body-1">{{ $t('organization.createIntro') }}</p>
           <v-btn
            class="mt-7 text-lg-body-1"
            color="primary"
            block
            large
            @click="$emit('success')"
           >{{ $t('organization.createButton') }}</v-btn>
         </v-card-text>
       </v-card>
     </v-col>
     <v-col cols="6">
       <v-card elevation="0" outlined class="pa-6 fill-height">
         <v-card-title>
           <join-organization-big />
           <v-spacer />
         </v-card-title>
         <v-card-text>
           <h1 class="text-h1 text--primary">{{ $t('organization.joinOrganization') }}</h1>
           <p v-if="userInvitations && userInvitations.results"
               class="text-lg-body-1">
             {{ $tc('organization.joinIntro', userInvitations.results.length) }}
           </p>
           <v-list
               v-if="userInvitations && userInvitations.results && userInvitations.results.length">
             <v-list-item v-for="invite in userInvitations.results" :key="invite.id"
              class="pl-0 invites__list" two-line>
               <v-list-item-content class="invites__list-item">
               {{ invite.organization.title }}
                 </v-list-item-content>
               <v-list-item-action class="flex-row">
                 <v-btn
                  color="primary"
                 :ripple="false"
                  @click="acceptInvite(invite.id)"
                 :loading="loading[invite.id]"
                   class="mr-3"
                   elevation="0"
                 >{{ $t('organization.joinButton') }}</v-btn>
                 <v-btn
                  color="error"
                 :ripple="false"
                  @click="declineInvite(invite.id)"
                 :loading="loading[invite.id]"
                   elevation="0"
                 >{{ $t('organization.declineButton') }}</v-btn>
                 </v-list-item-action>
             </v-list-item>
           </v-list>
         </v-card-text>
       </v-card>
     </v-col>
   </v-row>
   <v-row>
     <v-col>
       <router-link
          class="link--secondary"
          tag="a"
          :to="{name: 'overview'}"
        >
          <v-icon
              style="transform: rotate(180deg)"
              class="mr-1"
              small
          >$arrowRightGrey</v-icon>
         {{ $t('organization.backToOverview') }}
       </router-link>
     </v-col>
   </v-row>
  </v-col>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { AnswerInvitation, UserInvitationsQuery } from '@/generated/graphql';
import CreateOrganizationBig from '@/components/icons/CreateOrganizationBig.vue';
import JoinOrganizationBig from '@/components/icons/JoinOrganizationBig.vue';

export default defineComponent({
  components: { CreateOrganizationBig, JoinOrganizationBig },
  apollo: {
    userInvitations: {
      query: UserInvitationsQuery,
    },
  },
  data() {
    return {
      loading: {} as {[key: string]: boolean},
    };
  },
  methods: {
    answerInvite(id: string, accepted: boolean): void {
      this.loading.id = true;
      this.$apollo.mutate({
        mutation: AnswerInvitation,
        variables: {
          invitationId: id,
          accepted,
        },
      }).then(() => {
        this.loading.id = accepted;
        this.$apollo.queries.userInvitations.refetch();
      });
    },
    acceptInvite(inviteId: string): void {
      this.answerInvite(inviteId, true);
    },
    declineInvite(inviteId: string): void {
      this.answerInvite(inviteId, false);
    },
  },
});
</script>

<style lang="scss" scoped>
.logo--bottom {
  position: absolute;
  bottom: -13%;
  right: -60px;
  opacity: 0.1;
}

.dropzone {
  border: dashed 1px #e5e5e5;
  width: 400px;
  height: 225px;
}

</style>
