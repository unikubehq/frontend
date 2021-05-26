<template>
  <v-container>
    <h2>{{ $t('deck.edit.title', { deck: deck.title }) }}</h2>
    <h3>{{ $t('deck.edit.environments.title') }}</h3>
    <v-divider class="mb-5"></v-divider>
      <h4>{{ $t('deck.edit.environments.edit', { environment: environment.title}) }}</h4>
          <v-form class="white create-form mt-5">
            <v-row>
            <v-col cols="6" class="py-0">
                <v-text-field
                  :label="$t('deck.edit.environments.formTitle')"
                  name="environmentName"
                  filled
                  outlined
                  type="text"
                  :placeholder="$t('deck.edit.environments.enterTitle')"
                  v-model="title"
                  @blur="$v.title.$touch()"
                  :error-messages="titleErrors"
                  prepend-inner-icon="$vuetify.icons.user"
                    persistent-placeholder
                />
            </v-col>
            <v-col cols="6" class="py-0">
              <v-text-field
                :label="$t('deck.edit.environments.description')"
                name="description"
                filled
                outlined
                type="text"
                :placeholder="$t('deck.edit.environments.enterDescription')"
                v-model="description"
                prepend-inner-icon="$vuetify.icons.user"
                  persistent-placeholder
              />
            </v-col>
            <v-col cols="6" class="py-0">
              <v-select
                :label="$t('deck.edit.environments.sops')"
                name="sops"
                filled
                outlined
                type="text"
                :placeholder="$t('deck.edit.environments.chooseSops')"
                v-model="sopsCredentials"
                :items="sopsProviderChoices"
                return-object
                prepend-inner-icon="$vuetify.icons.user"
                persistent-placeholder
              />
              </v-col>
              <v-col cols="6" class="py-0">
                <v-select
                    :label="$t('deck.edit.environments.type')"
                    name="type"
                    filled
                    outlined
                    type="text"
                    :placeholder="$t('deck.edit.environments.enterType')"
                    v-model="environmentsType"
                    :items="environmentsTypeChoices"
                    prepend-inner-icon="$vuetify.icons.user"
                    persistent-placeholder
                  />
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-select
                    :label="$t('deck.edit.environments.valuesPath')"
                    name="valuesPath"
                    filled
                    outlined
                    type="text"
                    :placeholder="$t('deck.edit.environments.enterValuesPath')"
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
  CreateUpdateEnvironment,
  TEnvironmentNode,
  TEnvironmentType,
  TFileInformationNode,
  TDeckNode,
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
export default class EditDeck extends validationMixin {
  @Prop() readonly environment: TEnvironmentNode | undefined

  @Prop() readonly sopsProviders: TSopsProviderNode[] | undefined

  @Prop() readonly deck!: TDeckNode

  title = this.environment?.title

  description = this.environment?.description

  sopsCredentials: sopsCredential = this.environment?.sopsCredentials ? { text: this.environment?.sopsCredentials?.title, value: this.environment?.sopsCredentials?.id } : { text: '', value: '' }

  environmentTypeChoices = [{ text: 'Local', value: TEnvironmentType.Local }, { text: 'Remote', value: TEnvironmentType.Remote }]

  environmentType: TEnvironmentType = this.environment?.type || TEnvironmentType.Local

  valuesPath = this.environment?.valuesPath ? { text: this.environment?.valuesPath, value: this.environment?.valuesPath } : { text: '', value: '' }

  showForm = false;

  submit(): void {
    this.$apollo.mutate({
      mutation: CreateUpdateEnvironment,
      variables: {
        title: this.title,
        description: this.description,
        type: this.environmentType.toLowerCase(),
        deck: this.environment?.deck?.id,
        sopsCredentials: this.sopsCredentials.value,
        valuesPath: this.valuesPath?.value,
        id: this.environment?.id,
      },
    })
      .then((data) => {
        if (data.data.createUpdateEnvironment.errors.length === 0) {
          this.$emit('change');
        }
      })
      .catch((err) => console.log(err));
  }

  get valuesPathChoices(): { text: string, value: string, encrypted: boolean }[] {
    if (this.deck?.fileInformation?.length) {
      return this.deck.fileInformation.map(
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