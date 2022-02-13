<template>

        <v-col cols="12" sm="8" md="3">
          <h1 class="text-h1">{{ $t('organization.createNewHead') }}</h1>
          <p class="text--secondary">{{ $t('organization.haveLogo') }}</p>
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
                      <img :src="imgSrc" alt="Company Logo Preview">
                    </v-avatar>
                </v-badge>
                  </div>
              </template>
              <v-card>
                <v-card-title>{{ $t('organization.uploadLogo') }}</v-card-title>
                <v-card-text class="text-center">
                  <vue2-dropzone
                    ref="dropzoneElement"
                    id="dropzone"
                    :options="dropzoneOptions"
                    :useCustomSlot="true"
                    class="mx-auto"
                  >
                    <div>{{ $t('organization.dragDrop') }}
                      <a href="#">{{ $t('general.clickHere') }}</a>
                      {{ $t('organization.toBrowse') }}
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
                    :loading="loading"
                  >{{ $t('general.save') }}</v-btn>
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
import { defineComponent } from 'vue';
import VueI18n from 'vue-i18n';
import { required } from '@vuelidate/validators';
import { OrganizationQuery } from '@/generated/graphql';
import { Dropzone } from '@/typing/';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import TranslateResult = VueI18n.TranslateResult;
import useAuthStore from '@/stores/auth';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vue2Dropzone = require('vue2-dropzone');

export default defineComponent({
  components: {
    vue2Dropzone,
  },
  validations: {
    title: {
      required,
    },
  },
  props: {
    organizationId: {
      type: String,
      required: true,
    },
  },
  setup() {
    const auth = useAuthStore();
    return {
      auth,
    };
  },
  data() {
    return {
      dialog: false,
      loading: false,
      imgSrc: 'https://cdn.zeplin.io/5f84546964e43c2749571f59/assets/2192D830-FF56-4E41-8DBA-F504CEFA64FC.svg',
      fileSet: false,
      dropzoneOptions: {
        url: 'http://unikube.app',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        autoQueue: false,
      },
    };
  },
  methods: {
    handleUpload(): void {
      // TODO this is not really good code.
      this.loading = true;
      const file = (this.$refs.dropzoneElement as unknown as Dropzone).getAcceptedFiles()[0];
      this.fileSet = true;
      const formData = new FormData();
      formData.append('avatar_image', file);
      this.axios.post(`/orgas-http/upload-avatar/${this.organizationId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.auth.rawRpt}`,
        },
      }).then(() => {
        this.loading = false;
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
    },
    next(): void {
      this.$emit('success');
    },
  },
  computed: {
    buttonText(): TranslateResult {
      return this.fileSet ? this.$t('general.next') : this.$t('general.skip');
    },
  },
});
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
