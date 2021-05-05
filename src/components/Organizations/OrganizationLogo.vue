<template>

        <v-col cols="12" sm="8" md="3">
          <h1 class="text-h1">Create New Organization</h1>
          <p class="text--secondary">
            Do you have a logo?
          </p>
          <v-form class="text-center">
            <v-dialog
              v-model="dialog"
              width="500"
              class="pb-10"
            >
              <template v-slot:activator="{ on, attrs }">
                <div class="mb-10">
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
                  </div>
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
                    @click="handleUpload"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn
              block
              color="primary"
              large
              elevation="0"
              :ripple="false"
              @click="next"
            >
              {{ buttonText }}
            </v-btn>
          </v-form>
        </v-col>

</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { OrganizationQuery } from '@/generated/graphql';
import { required } from 'vuelidate/lib/validators';
import { Dropzone } from '@/typing/';
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
export default class OrganizationLogo extends Vue {
  @Prop() readonly organizationId!: string;

  dialog = false;

  imgSrc = 'https://cdn.zeplin.io/5f84546964e43c2749571f59/assets/2192D830-FF56-4E41-8DBA-F504CEFA64FC.svg';

  fileSet = false;

  dropzoneOptions = {
    url: 'http://unikube.app',
    thumbnailWidth: 150,
    maxFilesize: 0.5,
    autoQueue: false,
  };

  handleUpload(): void {
    // TODO this is not really good code.
    const file = (this.$refs.dropzoneElement as unknown as Dropzone).getAcceptedFiles()[0];
    this.fileSet = true;
    const formData = new FormData();
    formData.append('avatar_image', file);
    this.axios.post(`/orgas-http/upload-avatar/${this.organizationId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${this.$store.state.auth.rawRpt}`,
      },
    }).then(() => {
      this.$apollo.query({
        query: OrganizationQuery,
        variables: {
          id: this.organizationId,
        },
      }).then((result) => {
        this.imgSrc = result.data.organization.avatarImage;
      });
      this.dialog = false;
    });
  }

  next(): void {
    this.$emit('success');
  }

  get buttonText(): TranslateResult {
    return this.fileSet ? this.$t('general.next') : this.$t('general.skip');
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
::v-deep .dz-progress {
  display: none;
}

</style>
