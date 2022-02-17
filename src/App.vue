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
import { TUserDetailQueryResult, TUserDetailQueryVariables, UserDetailQuery } from '@/generated/graphql';
import { SnackbarMessage } from '@/typing';
import useAuthStore from '@/stores/auth';
import useContextStore from '@/stores/context';
import { useQuery, UseQueryReturn } from '@vue/apollo-composable';

export default defineComponent({
  setup() {
    const auth = useAuthStore();
    const context = useContextStore();
    const variables = {
      id: auth.uuid,
    };
    const { result, error } = useQuery(
      UserDetailQuery,
      variables,
    ) as UseQueryReturn<TUserDetailQueryResult, TUserDetailQueryVariables>;

    if (result) {
      auth.avatarImage = result?.value?.user?.avatarImage || '';
    }
    if (error) {
      console.warn('Could not fetch user avatar');
    }

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
});
</script>

<style lang="scss">
@import "vuetify/dist/vuetify.min.css";
@import "styles/main";

</style>
