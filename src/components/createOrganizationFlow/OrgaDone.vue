<template>
  <v-col cols="12" sm="8" md="3" class="text-center">
    <v-icon size="60">$vuetify.icons.done</v-icon>
    <h1>We're all done!</h1>
    <p class="text--secondary">Ta-da! {{ orgaTitle }} has been created successfully.
You can share the organization ID below with the team members you’d like to add in this project</p>
    <v-text-field
      outlined
      readonly
      v-model="orgaId"
      append-icon="$vuetify.icons.copy"
      @click:append="copyId"
    >
    </v-text-field>
    <router-link to="/overview">Go to Dashboard</router-link>
  <v-snackbar
      v-model="snackbar"
      color="primary"
    >
      Copied to Clipboard

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component()
export default class OrgaDone extends Vue {
@Prop() readonly orgaId: string | undefined

@Prop() readonly orgaTitle: string | undefined

  snackbar = false;

  copyId(): void {
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = this.orgaId;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    this.snackbar = true;
  }
}
</script>
