<template>
  <v-container>
    <h2>{{ $t('package.edit.title', { package: package.title }) }}</h2>
    <h3>{{ $t('package.edit.clusterLevels.title') }}</h3>
    <v-divider class="mb-5"></v-divider>
      <h4>{{ $t('package.edit.clusterLevels.edit', { clusterLevel: clusterLevel.title}) }}</h4>
          <v-form class="white create-form mt-5">
            <v-row>
            <v-col cols="6" class="py-0">
                <v-text-field
                  :label="$t('package.edit.clusterLevels.formTitle')"
                  name="clusterLevelName"
                  filled
                  outlined
                  type="text"
                  :placeholder="$t('package.edit.clusterLevels.enterTitle')"
                  v-model="title"
                  @blur="$v.title.$touch()"
                  :error-messages="titleErrors"
                  prepend-inner-icon="$vuetify.icons.user"
                    persistent-placeholder
                />
            </v-col>
            <v-col cols="6" class="py-0">
              <v-text-field
                :label="$t('package.edit.clusterLevels.description')"
                name="description"
                filled
                outlined
                type="text"
                :placeholder="$t('package.edit.clusterLevels.enterDescription')"
                v-model="description"
                prepend-inner-icon="$vuetify.icons.user"
                  persistent-placeholder
              />
            </v-col>
            <v-col cols="6" class="py-0">
              <v-select
                :label="$t('package.edit.clusterLevels.sops')"
                name="sops"
                filled
                outlined
                type="text"
                :placeholder="$t('package.edit.clusterLevels.chooseSops')"
                v-model="sopsCredentials"
                :items="sopsProviderChoices"
                return-object
                prepend-inner-icon="$vuetify.icons.user"
                persistent-placeholder
              />
              </v-col>
              <v-col cols="6" class="py-0">
                <v-select
                    :label="$t('package.edit.clusterLevels.type')"
                    name="type"
                    filled
                    outlined
                    type="text"
                    :placeholder="$t('package.edit.clusterLevels.enterType')"
                    v-model="clusterLevelType"
                    :items="clusterLevelTypeChoices"
                    prepend-inner-icon="$vuetify.icons.user"
                    persistent-placeholder
                  />
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-select
                    :label="$t('package.edit.clusterLevels.valuesPath')"
                    name="valuesPath"
                    filled
                    outlined
                    type="text"
                    :placeholder="$t('package.edit.clusterLevels.enterValuesPath')"
                    v-model="valuesPath"
                    :items="valuesPathChoices"
                    return-object
                    prepend-inner-icon="$vuetify.icons.user"
                      persistent-placeholder
                  >
                  <template v-slot:item="data">
                    <v-icon class="mr-2" v-if="data.item.encrypted">
                      $vuetify.icons.accessToken
                    </v-icon>
                    <span v-else class="mr-8"></span>
                    {{ data.item.text }}
                  </template>
                </v-select>
              </v-col>
          </v-row>
          <v-row>
              <v-col cols="9">
               <a
                  class="link--secondary"
                  @click="$emit('change')"
                >
                  <v-icon
                      style="transform: rotate(180deg)"
                      class="mr-2"
                      small
                  >
                    $vuetify.icons.arrowRightGrey
                  </v-icon>{{ $t('general.cancel') }}
               </a>
              </v-col>
              <v-col cols="3">
                <v-btn
                large
                block
                color="primary"
                @click="submit"
                :disabled="$v.$invalid"
              >{{ $t('general.save') }}</v-btn>
              </v-col>
            </v-row>
          </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import {
  CreateUpdateClusterLevel,
  TClusterLevelNode,
  TClusterLevelType,
  TFileInformationNode,
  TPackageNode,
  TSopsProviderNode,
} from '@/generated/graphql';
import { required } from 'vuelidate/lib/validators';
import VueI18n from 'vue-i18n';
import { validationMixin } from '@/components/mixins';
import TranslateResult = VueI18n.TranslateResult;

type sopsCredential = {
    text: string,
    value: string
  }

@Component({
  validations: {
    title: {
      required,
    },
  },
})
export default class EditPackage extends validationMixin {
  @Prop() readonly clusterLevel: TClusterLevelNode | undefined

  @Prop() readonly sopsProviders: TSopsProviderNode[] | undefined

  @Prop() readonly package!: TPackageNode

  title = this.clusterLevel?.title

  description = this.clusterLevel?.description

  sopsCredentials: sopsCredential = this.clusterLevel?.sopsCredentials ? { text: this.clusterLevel?.sopsCredentials?.title, value: this.clusterLevel?.sopsCredentials?.id } : { text: '', value: '' }

  clusterLevelTypeChoices = [{ text: 'Local', value: TClusterLevelType.Local }, { text: 'Remote', value: TClusterLevelType.Remote }]

  clusterLevelType: TClusterLevelType = this.clusterLevel?.type || TClusterLevelType.Local

  valuesPath = this.clusterLevel?.valuesPath ? { text: this.clusterLevel?.valuesPath, value: this.clusterLevel?.valuesPath } : { text: '', value: '' }

  showForm = false;

  submit(): void {
    this.$apollo.mutate({
      mutation: CreateUpdateClusterLevel,
      variables: {
        title: this.title,
        description: this.description,
        type: this.clusterLevelType.toLowerCase(),
        package: this.clusterLevel?.package?.id,
        sopsCredentials: this.sopsCredentials.value,
        valuesPath: this.valuesPath?.value,
        id: this.clusterLevel?.id,
      },
    })
      .then((data) => {
        if (data.data.createUpdateClusterLevel.errors.length === 0) {
          this.$emit('change');
        }
      })
      .catch((err) => console.log(err));
  }

  get valuesPathChoices(): { text: string, value: string, encrypted: boolean }[] {
    if (this.package?.fileInformation?.length) {
      return this.package.fileInformation.map(
        (fileInfo: TFileInformationNode | null) => ({
          text: fileInfo?.path || '',
          value: fileInfo?.path || '',
          encrypted: fileInfo?.encrypted || false,
        }),
      );
    }
    return [];
  }

  get sopsProviderChoices(): { text: string, value: string }[] {
    const choices: sopsCredential[] = [];
    this.sopsProviders?.forEach((provider) => {
      choices.push({ text: provider.title, value: provider.id });
    });
    return choices;
  }

  get titleErrors(): TranslateResult[] {
    return this.handleErrors('title');
  }
}
</script>

<style scoped lang="scss">
.sops-list-item {
  border-bottom: solid 1px rgb(161, 169, 178);
}
</style>
