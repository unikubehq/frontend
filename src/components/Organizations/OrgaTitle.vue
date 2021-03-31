<template>

        <v-col cols="12" sm="8" md="3">
          <h1 class="text-h1">Create New Organization</h1>
          <p class="text--secondary">
            Fill up your organization details below
          </p>
          <v-form class="text-center">
            <v-dialog
              v-model="dialog"
              width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-badge
                  bottom
                  offset-x="20"
                  offset-y="20"
                  content="+"
                >
                  <v-avatar
                    height="96"
                    width="96"
                    class="mt-6"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <img :src="imgSrc">
                  </v-avatar>
              </v-badge>
              </template>
              <v-card>
                <v-card-title>
                  Upload Photo
                </v-card-title>
                <v-card-text class="text-center">
                  <vue2-dropzone
                    ref="dropzoneElement"
                    id="dropzone"
                    :options="dropzoneOptions"
                    @vdropzone-success="handleUpload"
                    :useCustomSlot="true"
                    class="mx-auto"
                  >
                    <div>
                      Drag & Drop files here or <a href="#">Click Here</a> to browse
                    </div>
                  </vue2-dropzone>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-center">
                  <v-btn
                    color="primary"
                    large
                    elevation="0"
                    :ripple="false"
                    @click="dialog = false"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-text-field
                class="mt-6"
                id="organizationName"
                label="Organization Name"
                name="organizationName"
                filled
                outlined
                placeholder="Enter Organization Name"
                v-model="title"
                :error-messages="titleErrors"
                prepend-inner-icon="$vuetify.icons.organization"
                @blur="$v.title.$touch()"
            >
            </v-text-field>
            <v-btn
              block
              color="primary"
              large
              elevation="0"
              :ripple="false"
              @click="handleCreateOrganization"
              :disabled="enableButton"
            >
              Next
            </v-btn>
            <div class="error" v-if="errors && errors.detail">
              {{ errors.detail }}
            </div>
          </v-form>
        </v-col>

</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CreateOrganizationMutation } from '@/generated/graphql';
import { required } from 'vuelidate/lib/validators';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import VueI18n from 'vue-i18n';
import TranslateResult = VueI18n.TranslateResult;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vue2Dropzone = require('vue2-dropzone');

@Component({
  components: {
    vue2Dropzone,
  },
  validations: {
    title: {
      required,
    },
  },
})
export default class OrgaTitle extends Vue {
  title = '';

  dialog = false;

  imgSrc = 'https://cdn.zeplin.io/5f84546964e43c2749571f59/assets/2192D830-FF56-4E41-8DBA-F504CEFA64FC.svg';

  dropzoneOptions = {
    url: 'https://httpbin.org/post',
    thumbnailWidth: 150,
    maxFilesize: 0.5,
    headers: { 'My-Awesome-Header': 'header value' },
  };

  handleUpload(file: {[key: string]: string}):void {
    this.imgSrc = file.dataURL;
  }

  get enableButton(): boolean {
    return this.$v.title.$invalid;
  }

  get titleErrors(): TranslateResult[] {
    const errors = [];
    if (!this.$v.title.required) {
      errors.push(this.$t('requiredError'));
    }
    return this.$v.title.$dirty ? errors : [];
  }

  handleCreateOrganization(): void {
    this.$apollo.mutate({
      mutation: CreateOrganizationMutation,
      variables: {
        title: this.title,
      },
    })
      .then(
        (data) => {
          console.log(data);
          this.$emit(
            'success',
            data.data.upsertOrganization.id,
            data.data.upsertOrganization.title,
          );
        },
      );
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
