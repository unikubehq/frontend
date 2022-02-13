<template>
  <v-app>
    <router-view>
    </router-view>
    <v-snackbar v-model="message.show" :key="message.id" :style="{'margin-top': (idx * 80) + 'px'}"
        :color="message.error ? 'error' : 'primary'" top right v-for="(message, idx) in messages">
        <v-icon size="40" v-if="message.error">
          $vuetify.icons.errorWhiteBg
        </v-icon>
        <v-icon size="40" v-else>
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
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UserDetailQuery } from '@/generated/graphql';
import { SnackbarMessage } from '@/typing';
import useAuthStore from '@/stores/auth';
import useContextStore from '@/stores/context';

export default defineComponent({
  setup() {
    const auth = useAuthStore();
    const context = useContextStore();
    return {
      auth,
      context,
    };
  },
  computed: {
    rawRpt():string {
      return this.auth.rawRpt;
    },
    messages(): SnackbarMessage[] {
      return this.context.messages.filter((message: SnackbarMessage) => message.show);
    },
  },
  watch: {
    rawRpt: {
      immediate: true,
      handler(): void {
        this.$ability.update(this.auth.caslRules);
      },
    },
  },
  created(): void {
    this.$apollo.query({
      query: UserDetailQuery,
      variables: {
        id: this.auth.uuid,
      },
    }).then((res) => {
      this.auth.avatarImage = res.data.user.avatarImage;
    });
  },
});
</script>

<style lang="scss">
@import "styles/main";

</style>
