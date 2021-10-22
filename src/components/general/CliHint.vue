<template>
    <v-menu top :nudge-top="40" :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
            <v-icon size="24"
                v-bind="attrs"
                v-on="on"
            >
                $vuetify.icons.cli
            </v-icon>
        </template>
            <div
              class="command-row"
              v-for="command in commands"
              :key="command.hint"
            >
                <code>
                  $ {{ command.command }}
                </code>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        size=28
                        v-bind="attrs"
                        v-on="on"
                        class="ml-auto mr-2"
                      >
                        $vuetify.icons.smallBulb
                      </v-icon>
                    </template>
                    <span>
                      {{ command.hint }}
                    </span>
                  </v-tooltip>
                <v-icon
                  size=28
                  @click="copyToClipboard(command.command)"
                  >
                    $vuetify.icons.copy
                </v-icon>
            </div>
    </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CliHintMessage } from '@/typing/index';

@Component
export default class CliHint extends Vue {
      @Prop() readonly commands?: CliHintMessage[]

      copyToClipboard(command: string): void {
        navigator.clipboard.writeText(command).then(() => {
          this.$store.commit('context/addSnackbarMessage', {
            message: this.$t('cli.util.copySuccessful').toString(),
            error: false,
          });
        });
      }
}
</script>

<style lang="scss" scoped>
.v-menu__content {
  background: rgba(97, 97, 97, 0.9);
  color: #fff;
  padding: .25em;
}
.command-row {
  margin: .5em 0;
  padding-right: 1em;
  display: flex;
  align-items: center;
}
.v-icon {
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  padding: 4px;
}
</style>
