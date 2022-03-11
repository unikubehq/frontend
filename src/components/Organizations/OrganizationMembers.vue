<template>
  <v-col cols="12" sm="8" md="3">
    <h1 class="text-h1">{{ $t('organization.addTeamMember') }}</h1>
          <p class="text--secondary">{{ $t('orginzation.memberAdd') }}</p>
    <v-form @submit.prevent="">
      <div v-for="(v, index) in $v.members.$each.$iter" :key="index">
        <v-text-field
            id="emailAddress"
            label="Email Address"
            name="email"
            filled
            outlined
            placeholder="Enter Email Address"
            v-model="v.email.$model"
            :error-messages="emailErrors(v.email)"
            prepend-inner-icon="$vuetify.icons.email"
            :append-inner-icon="v.invited ? $vuetify.icons.email : ''"
            @blur="v.email.$touch"
            @keydown.enter="addMember"
            persistent-placeholder
        ></v-text-field>
        </div>
      <v-btn :ripple="false" elevation="0" @click="addMember">
        <v-icon size="24" class="mr-2">
          $vuetify.icons.addRound
        </v-icon>{{ $t('organization.addAnother') }}</v-btn>
      <v-btn
        class="mt-3"
        color="primary"
        block
        large
        @click="inviteEmails"
      >{{ $t('general.finish') }}</v-btn>
    </v-form>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { email, required } from 'vuelidate/lib/validators';
import VueI18n from 'vue-i18n';
import { InviteToOrganization } from '@/generated/graphql';
import TranslateResult = VueI18n.TranslateResult;

@Component({
  validations: {
    members: {
      $each: {
        email: {
          email,
          required,
        },
      },
    },
  },
})
export default class OrganizationMembers extends Vue {
  email = '';

  members = [{ email: null, invited: false }];

  addMember(): void {
    this.members.push({ email: null, invited: false });
  }

  inviteEmails(): void {
    this.members.forEach((member, idx) => {
      if (member.email) {
        this.$apollo.mutate({
          mutation: InviteToOrganization,
          variables: {
            email: member.email,
            organization: this.$store.state.context.organization.id,
          },
        }).then(() => {
          const invitedMember = member;
          invitedMember.invited = true;
          Vue.set(
            this.members,
            idx,
            invitedMember,
          );
        });
      }
    });
    this.$emit('success');
  }

  // eslint-disable-next-line class-methods-use-this
  get emailErrors() {
    return (x: any): TranslateResult[] => {
      const result = [];
      if (x.$invalid && x.$dirty) {
        if (!x.email) {
          result.push(this.$t('errors.emailError'));
        }
        if (!x.required) {
          result.push(this.$t('errors.requiredError'));
        }
      }
      return result;
    };
  }
}
</script>
