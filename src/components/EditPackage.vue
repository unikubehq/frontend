<template>
  <v-container>
      <h3>Edit {{ clusterLevel.title }}</h3>
          <v-form class="pa-10 white create-form">
            <v-row>
            <v-col>
                <v-text-field
                  :label="$t('Title')"
                  name="projectName"
                  filled
                  outlined
                  type="text"
                  :placeholder="$t('Enter Clusterlevel Title')"
                  v-model="title"
                  @blur="$v.title.$touch()"
                  prepend-inner-icon="$vuetify.icons.user"
                />
                <v-text-field
                  :label="$t('Description')"
                  name="projectName"
                  filled
                  outlined
                  type="text"
                  :placeholder="$t('Enter Clusterlevel Description')"
                  v-model="description"
                  prepend-inner-icon="$vuetify.icons.user"
                />
                <v-select
                  :label="$t('Sops')"
                  name="specType"
                  filled
                  outlined
                  type="text"
                  :placeholder="$t('choose Sops')"
                  v-model="sopsCredentials"
                  :items="sopsProviderChoices"
                  return-object
                  prepend-inner-icon="$vuetify.icons.user"
                />
                <v-select
                    :label="$t('Clusterlevel Type')"
                    name="specType"
                    filled
                    outlined
                    type="text"
                    :placeholder="$t('Enter Clusterlevel Type')"
                    v-model="clusterLevelType"
                    :items="clusterLevelTypeChoices"
                    prepend-inner-icon="$vuetify.icons.user"
                  />
                <v-select
                  :label="$t('Values Path')"
                  name="specType"
                  filled
                  outlined
                  type="text"
                  :placeholder="$t('Enter Values Path')"
                  v-model="valuesPath"
                  :items="valuesPathChoices"
                  return-object
                  prepend-inner-icon="$vuetify.icons.user"
                />
              </v-col>
          </v-row>
          <v-row>
              <v-col cols="10">
                <v-btn
                  plain
                  color="white"
                  elevation="0"
                  @click="$emit('change');"
                >
                  Cancel
                </v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn
                large
                color="primary"
                @click="submit"
              >Save</v-btn>
              </v-col>
            </v-row>
          </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  CreateUpdateClusterLevel, TClusterLevelNode,
  TSopsProviderNode,
} from '@/generated/graphql';

type sopsCredential = {
    text: string,
    value: string
  }

@Component({})
export default class EditPackage extends Vue {
  @Prop() readonly clusterLevel: TClusterLevelNode | undefined

  @Prop() readonly sopsProviders: TSopsProviderNode[] | undefined

  title = this.clusterLevel?.title

  description = this.clusterLevel?.description

  sopsCredentials: sopsCredential = { text: '', value: '' }

  clusterLevelTypeChoices = [{ text: 'Local', value: 'local' }, { text: 'remote', value: 'remote' }]

  clusterLevelType = ''

  valuesPath = ''

  valuesPathChoices = ['/', '/tmp']

  showForm = false;

  submit(): void {
    this.$apollo.mutate({
      mutation: CreateUpdateClusterLevel,
      variables: {
        title: this.title,
        description: this.description,
        type: this.clusterLevelType,
        package: this.clusterLevel?.package?.id,
        sopsCredentials: this.sopsCredentials.value,
        // valuesPath: this.valuesPath,
        id: this.clusterLevel?.id,
      },
    })
      .then((data) => {
        console.log(data);
        if (data.data.createUpdateClusterLevel.errors.length === 0) {
          this.$emit('change');
        }
      })
      .catch((err) => console.log(err));
  }

  get sopsProviderChoices(): { text: string, value: string }[] {
    const choices: sopsCredential[] = [];
    this.sopsProviders?.forEach((provider) => {
      console.log(provider);
      choices.push({ text: provider.title, value: provider.id });
    });
    return choices;
  }
}
</script>

<style scoped lang="scss">
.sops-list-item {
  border-bottom: solid 1px rgb(161, 169, 178);
}
</style>
