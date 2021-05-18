<template>
  <v-col cols="12" sm="8" md="6">
   <v-row>
     <v-col cols="6">
       <v-card elevation="0" outlined class="pa-6">
         <v-card-title>
           <h1 class="text-h1">Create Organization</h1>
         </v-card-title>
         <v-card-text>
           <p>
             Create a new organization, add members and start managing your projects/apps.
           </p>
           <v-btn
            class="mt-3"
            color="primary"
            block
            large>Create New Organization</v-btn>
         </v-card-text>
       </v-card>
     </v-col>
     <v-col cols="6">
       <v-card elevation="0" outlined class="pa-6">
         <v-card-title>
           <h1 class="text-h1">Join Organization</h1>
         </v-card-title>
         <v-list>
         </v-list>
       </v-card>
     </v-col>
   </v-row>
  </v-col>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { CreateOrganizationMutation } from '@/generated/graphql';
import { validationMixin } from '@/components/mixins';
import { required } from 'vuelidate/lib/validators';
import VueI18n from 'vue-i18n';
import TranslateResult = VueI18n.TranslateResult;

@Component({
  validations: {
    title: {
      required,
    },
  },
})
export default class OrganizationTitle extends validationMixin {
  title = '';

  errors: TranslateResult[] = [];

  get enableButton(): boolean {
    return this.$v.title.$invalid;
  }

  get titleErrors(): TranslateResult[] {
    return this.handleErrors('title');
  }

  handleCreateOrganization(): void {
    this.$apollo.mutate({
      mutation: CreateOrganizationMutation,
      variables: {
        title: this.title,
      },
    }).then(({ data }) => {
      this.$store.dispatch('auth/refresh', -1);
      this.$emit(
        'success',
        data.createUpdateOrganization?.organization,
      );
    });
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

.dropzone {
  border: dashed 1px #e5e5e5;
  width: 400px;
  height: 225px;
}

</style>
