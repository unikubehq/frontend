<template>
    <v-menu top :nudge-top="40" :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
            <v-icon size="24"
                v-bind="attrs"
                v-on="on"
            >
                $cli
            </v-icon>
        </template>
          <table>
            <caption class="d-none">{{ $t('cli.hint.caption') }}</caption>
            <thead class="d-none">
              <tr>
                <th scope="col"></th>
                <th scope="col">{{ $t('cli.table.command') }}</th>
                <th scope="col">{{ $t('cli.table.actions') }}</th>
              </tr>
            </thead>
            <tbody>
            <tr
              class="command-row"
              v-for="command in commands"
              :key="command.hint"
            >
              <td>$</td>
              <td>
                <code>
                   {{ command.command }}
                </code>
              </td>
              <td>
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        size=28
                        v-bind="attrs"
                        v-on="on"
                        class="ml-auto mr-2 tooltip-icon"
                      >
                        $smallBulb
                      </v-icon>
                    </template>
                    <span>
                      {{ command.hint }}
                    </span>
                  </v-tooltip>
                <v-icon
                  size=28
                  class="tooltip-icon"
                  @click="copyToClipboard(command.command)"
                  >
                    $copy
                </v-icon>
              </td>
            </tr>
            </tbody>
          </table>
    </v-menu>
</template>

<script lang="ts">
import { CliHintMessage } from '@/typing/index';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    commands: {
      type: Array as PropType<CliHintMessage[]>,
      required: true,
    },
  },
  copyToClipboard(command: string): void {
    navigator.clipboard.writeText(command).then(() => {
      this.$store.commit('context/addSnackbarMessage', {
        message: this.$t('cli.util.copySuccessful').toString(),
        error: false,
      });
    });
  },
});
</script>

<style lang="scss" scoped>
.v-menu__content {
  background: rgba(97, 97, 97, 0.9);
  color: #fff;
  padding: .25em;
}
.command-row td {
  padding: .2rem;
  &:first-child {
    padding-left: .5rem;
  }
  &:last-child {
    padding-right: .5rem;
  }
}
.tooltip-icon {
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  padding: 4px;
  cursor: pointer;
}
</style>
