<template>
<div class="notification">
<v-card-text class="notification__text">
  {{ $t('organization.inviteNotification') }} <strong>{{ invite.organization.title }}</strong>
</v-card-text>
<v-card-actions
  class="notification__actions"
>
  <v-btn
    color="primary"
    :ripple="false"
    @click="answerInvite(invite.id, true)"
    :loading="loading[invite.id]"
    class="mr-3"
    elevation="0"
    height="24"
    width="72"
  >{{ $t('organization.joinButton') }}</v-btn>
  <v-btn
    color="#a1a9b2"
    variant="outlined"
    :ripple="false"
    @click="answerInvite(invite.id, false)"
    :loading="loading[invite.id]"
    elevation="0"
    height="24"
    width="72"
   >{{ $t('organization.declineButton') }}</v-btn>
</v-card-actions>
<v-divider class="notification__divider"></v-divider>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { AnswerInvitation } from '@/generated/graphql';

export default defineComponent({
  props: {
    invite: {
      type: Object as PropType<{id: string, organization: {title: string}}>,
      required: false,
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
        this.loading.id = false;
        this.$emit('answer-invitation');
      }).catch((err) => {
        this.$store.commit('context/addSnackbarMessage', {
          message: err,
          error: true,
        });
      });
    },
  },
});
</script>

<style lang="scss" scoped>
  .notification {
    &__text{
      padding: 8px 16px;
    }
    &__actions {
      padding: 0 16px 8px;
    }
  }
</style>
