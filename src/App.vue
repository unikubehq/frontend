<template>
  <v-app>
    <router-view>
    </router-view>
    <v-snackbar v-model="message.show" :key="message.id" :style="{'margin-top': (idx * 80) + 'px'}"
        color="primary" top right v-for="(message, idx) in messages">
        <v-icon size="40">
          $vuetify.icons.tickWhiteBg
        </v-icon>
        <span class="font-weight-medium">
          {{ message.message }}
        </span>
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="message.show = false">
          {{ $t('general.close') }}
        </v-btn>
      </template>
    </v-snackbar>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
        color="#CEFFE9"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { UserDetailQuery } from '@/generated/graphql';
import { SnackbarMessage } from '@/typing';

@Component({})
export default class App extends Vue {
  get overlay(): boolean {
    return this.$store.state.ui.overlay;
  }

  get rawRpt():string {
    return this.$store.state.auth.rawRpt;
  }

  get messages(): SnackbarMessage[] {
    return this.$store.state.context.messages.filter((message: SnackbarMessage) => message.show);
  }

  @Watch('rawRpt', { immediate: true })
  rawRptChanged(): void {
    this.$ability.update(this.$store.getters['auth/caslRules']);
  }

  created(): void {
    this.$apollo.query({
      query: UserDetailQuery,
      variables: {
        id: this.$store.state.auth.uuid,
      },
    }).then((res) => {
      this.$store.commit('auth/setAvatar', res.data.user.avatarImage);
    });
  }
}
</script>

<style lang="scss">
@import "styles/main";

</style>
