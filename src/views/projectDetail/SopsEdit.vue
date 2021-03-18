<template>
  <v-container>
    <h3>Sops</h3>
    <v-card
        v-for="sops in project.sops"
        v-bind:key="sops.title"
        tile
      >
      <v-list max-width="800" class="sops-list">
        <v-list-item two-line>
          <v-list-item-content class="sops-list-item">
            <v-list-item-title>
              {{ sops.title }}
              <v-btn
                  outlined
                  plain
                  color="#a1a9b2"
                  width="144"
                  right
                  absolute
                  @click="handleSetEditSops(sops)"
                >
                  <v-icon size="24">
                    $vuetify.icons.edit
                  </v-icon>
                  Edit Sops
                </v-btn>
            </v-list-item-title>
            <v-list-item-subtitle> {{ sops.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        </v-list>
    </v-card>
    <v-btn
      v-if="!showForm"
      large
      color="primary"
      @click="handleShowForm(true)"
    >Add Sops</v-btn>
    <v-form class="pa-10 white create-form" v-if="showForm">
      <v-row>
      <v-col>
          <v-select
            :label="$t('Sops Type')"
            name="specType"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Sops Type')"
            v-model="sopsType"
            :items="sopsTypeChoices"
            prepend-inner-icon="$vuetify.icons.user"
          />
      <v-text-field
            :label="$t('Title')"
            name="projectName"
            filled
            outlined
            type="text"
            :error-messages="titleErrors"
            :placeholder="$t('Enter Sops Title')"
            v-model="title"
            @blur="$v.title.$touch()"
            prepend-inner-icon="$vuetify.icons.user"
          />
      <v-text-field
            :label="$t('Description')"
            name="description"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter sops Description')"
            v-model="description"
            prepend-inner-icon="$vuetify.icons.user"
          />
      <v-text-field
            :label="$t('Secret 1')"
            name="secret1"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Secret 1')"
            v-model="secret1"
            prepend-inner-icon="$vuetify.icons.user"
          />
        <v-text-field
            v-if="sopsType === 'aws'"
            :label="$t('Secret 2')"
            name="secret2"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Secret 2')"
            v-model="secret2"
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
            @click="handleShowForm(false)"
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
import { CreateUpdateSops, TSopsProviderNode, TProjectNode } from '@/generated/graphql';
import { required, url } from 'vuelidate/lib/validators';
import VueI18n from 'vue-i18n';
import TranslateResult = VueI18n.TranslateResult;

@Component({

})
export default class SopsEdit extends Vue {
  @Prop() readonly project: TProjectNode | undefined

  @Prop() readonly sops: TSopsProviderNode | undefined

  @Prop() edit: boolean

  title = ''

  description = ''

  projectId = this.project.id

  secret1 = ''

  secret2 = ''

  secret3 = ''

  sopsType = ''

  sopsTypeChoices = ['aws', 'pgp']

  showForm = false;

  submit(): boolean {
    this.$apollo.mutate({
      mutation: CreateUpdateSops,
      variables: {
        title: this.title,
        description: this.description,
        project: this.project.id,
        secret1: this.secret1,
        secret2: this.secret2 ? this.secret2 : null,
        sopsType: this.sopsType,
      },
    })
      .then((data) => {
        console.log(data);
        if (data.data.createUpdateSops.ok) {
          this.resetValues();
          this.handleShowForm(false);
        }
        console.log(this.$apollo.queries);
        this.$parent.$emit('sops-created');
      })
      .catch((err) => console.log(err));
  }

  handleShowForm(show): void {
    this.showForm = show;
    if (!show) {
      this.resetValues();
    }
  }

  handleEditSops(): void {
    if (this.sops) {
      this.title = this.sops.title;
      this.description = this.sops.description;

      this.sopsType = this.sops.sopsType;
    }
  }

  resetValues(): void {
    this.title = '';
    this.description = '';
    this.secret1 = '';
    this.secret2 = '';
    this.sopsType = '';
  }

  handleSetEditSops(sops): void {
    this.showForm = true;
    this.title = sops.title;
    this.description = sops.description;
    // TODO set sops type & id
  }

  mounted(): void {
    this.handleEditSops();
  }
}
</script>

<style scoped lang="scss">
.sops-list-item {
  border-bottom: solid 1px rgb(161, 169, 178);
}
</style>
