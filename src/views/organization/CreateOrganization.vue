<template>
  <v-main>
    <v-container fluid fill-height class="container--login">
      <v-img src="@/assets/img/Unikube-Logo-Icon.svg" class="logo--bottom"
             height="40%" width="30%" contain position="bottom right"/>
      <v-row justify="center">
        <v-col cols="10" class="text-center">
          <v-img class="d-inline-block" src="@/assets/img/Unikube-Logo-H.svg"
                 max-width="150"/>
        </v-col>
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
                    ref="myVueDropzone"
                    id="dropzone"
                    :options="dropzoneOptions"
                    @vdropzone-success="handleUpload"
                  >
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
                prepend-inner-icon="$vuetify.icons.organization"
            >
            </v-text-field>
            <v-btn block color="primary" large elevation="0" :ripple="false"
                   class="">
              Next
              <v-icon size="20px">
                $vuetify.icons.arrowRightWhite
              </v-icon>
            </v-btn>
            <div class="error" v-if="errors && errors.detail">
              {{ errors.detail }}
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

@Component({
  components: {
    vue2Dropzone,
  },
})
export default class CreateOrganization extends Vue {
  title = '';

  dialog = false;

  imgSrc = 'https://cdn.zeplin.io/5f84546964e43c2749571f59/assets/2192D830-FF56-4E41-8DBA-F504CEFA64FC.svg';

  dropzoneOptions = {
    url: 'https://httpbin.org/post',
    thumbnailWidth: 150,
    maxFilesize: 0.5,
    headers: { 'My-Awesome-Header': 'header value' },
  };

  handleUpload(e: never):void {
    console.log(e.previewTemplate);
    // eslint-disable-next-line prefer-destructuring
    this.imgSrc = e.payload[0].dataURL;
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
