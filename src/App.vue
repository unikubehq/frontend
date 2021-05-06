<template>
  <v-app>
    <router-view>
    </router-view>
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
import { getModule } from 'vuex-module-decorators';
import UI from '@/store/modules/ui';
import { Component, Watch } from 'vue-property-decorator';
import { UserDetailQuery } from '@/generated/graphql';

@Component({})
export default class App extends Vue {
  get overlay(): boolean {
    const ui = getModule(UI, this.$store);
    return ui.overlay;
  }

  get rawRpt():string {
    return this.$store.state.auth.rawRpt;
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
