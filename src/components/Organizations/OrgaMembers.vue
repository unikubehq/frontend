<template>
  <v-col cols="12" sm="8" md="3">
    <h1 class="text-h1">Add Team Members</h1>
          <p class="text--secondary">
            Add team members by entering their email addresses they used while registering
            on Unikube. You can also set member role from ‘Permissions’ later.
          </p>
    <v-form>
      <v-text-field
          v-for="index in memberCount" :key="index"
          id="emailAddress"
          label="Email Address"
          name="email"
          filled
          outlined
          placeholder="Enter Email Address"
          v-model="members[index-1]"
          :error-messages="emailErrors"
          prepend-inner-icon="$vuetify.icons.organization"
          @blur="$v.email.$touch()"
      ></v-text-field>
      <v-btn :ripple="false" plain elevation="0" @click="memberCount += 1" color="rgb(252,252,253)">
        <v-icon size="24" class="mr-2">
          $vuetify.icons.addRound
        </v-icon>
        Add another
      </v-btn>
      <v-btn
        class="mt-3"
        color="primary"
        block
        large
        @click="$emit('success')"
      >Finish</v-btn>
      <small class="text-center">
        Or
        <a href="#" @click="$emit('success')">Skip</a>
        this for now
      </small>
    </v-form>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { email, required } from 'vuelidate/lib/validators';

@Component({
  validations: {
    email: {
      email,
      required,
    },
  },
})
export default class OrgaMembers extends Vue {
  memberCount = 1;

  email = '';

  members = [];
}
</script>
