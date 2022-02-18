<template>
  <drawer
      :title="`Override ${specType} Values`"
      :intro="`Override helm values for ${environment.title}.`"
      @hide="$emit('hide')"
  >
    <br><br>
    <v-row>
      <v-col cols="12">
        <editor :schemas="schemas" v-model="editorContent" @error="setError"/>
      </v-col>
    </v-row>
    <template v-slot:actions>
      <v-container fluid class="py-0">
        <v-row>
          <v-col cols="6" class="py-0">
            <v-btn
              outlined
              block
              :ripple="false"
              @click="$emit('hide')"
              elevation="0">
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-btn block color="primary" @click="save" :ripple="false"
                :disabled="error">Save</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Editor from '@/components/general/Editor.vue';
import Drawer from '@/components/general/Drawer.vue';
import {
  CreateUpdateHelmOverridesMutation,
  TCreateUpdateHelmOverridesMutationVariables,
  TEnvironmentNode,
} from '@/generated/graphql';

@Component({
  components: {
    Drawer,
    Editor,
  },
})
export default class HelmOverrides extends Vue {
  @Prop() readonly environment!: TEnvironmentNode;

  @Prop() readonly specType!: string;

  editorContent = '';

  error = false;

  setError(errorState: number): void {
    console.log(errorState);
    this.error = errorState !== 0;
  }

  save(): void {
    // Mutation to update helm overrides
    const variables: TCreateUpdateHelmOverridesMutationVariables = {
      overrides: this.editorContent,
      environmentId: this.environment.id,
    };
    this.$apollo.mutate({
      mutation: CreateUpdateHelmOverridesMutation,
      variables,
    }).then(() => {
      this.$emit('hide');
    }).catch(() => {
      this.$store.commit('context/addSnackbarMessage', {
        message: 'An error occurred storing the helm overrides.',
        error: 2000,
      });
    });
  }

  get schemas() {
    if (this.environment && this.environment.valueSchema) {
      return [JSON.parse(this.environment.valueSchema)];
    }
    return [];
  }

  created(): void {
    this.editorContent = this.environment.helmOverrides?.overrides || '';
  }
}
</script>
