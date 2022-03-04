<template>
  <div>
    <v-row v-if="!deckEdit">
      <v-col cols="6" v-for="pkg in project.decks" :key="pkg.id">
        <v-card variant="outlined" class="projectDeck"
          v-if="!pkg.disabled || $can('edit', project)">
          <v-card-title>
            <v-row>
              <v-col cols="8">
                  {{ pkg.title }}
              </v-col>
              <v-col cols="4" class="text-right">
                <cli-hint :commands="deckCliHintMessage"/>
                <v-divider style="height: 24px" class="mx-4 mb-n1" vertical></v-divider>
                <v-icon size="24"
                  class="mr-2 projectDeck-edit"
                  @click="setDeckEdit(pkg)">
                  $vuetify.icons.edit
                </v-icon>
              </v-col>
              <v-divider></v-divider>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-divider class="mb-2"></v-divider>
            <v-col cols="12">
              <v-icon>$vuetify.icons.deployments</v-icon>
              {{ $tc('deployment.Deployment', pkg.deployments.length) }}
            </v-col>
            <v-col cols="12" class="d-flex flex-wrap">
              <span
                v-for="deployment in pkg.deployments"
                :key="deployment.id"
                class="deployment-badge mr-3 px-4 py-2"
              >
                {{ deployment.title }}
              </span>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <edit-deck
        v-for="environment in deckToBeEdited.environment"
        v-bind:key="environment.id"
        :deck="deckToBeEdited"
        :environment="environment"
        :sopsProviders="project.sops"
        :specType="project.specType"
        @change="deckEdit = false; $emit('update')"
      ></edit-deck>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
  TDeckNode,
  TProjectNode,
} from '@/generated/graphql';
import EditDeck from '@/components/Projects/EditDeck.vue';
import { CliHintMessage } from '@/typing';
import CliHint from '@/components/general/CliHint.vue';

export default defineComponent({
  components: {
    EditDeck,
    CliHint,
  },
  props: {
    project: {
      type: Object as PropType<TProjectNode>,
    },
  },
  data() {
    return {
      deckEdit: false,
      deckToBeEdited: undefined as TDeckNode | undefined,
      memberDrawer: false,
      deckCliHintMessage: [
        {
          command: 'unikube deck install',
          hint: this.$t('cli.deck.install').toString(),
        },
        {
          command: 'unikube deck ingress',
          hint: this.$t('cli.deck.ingress').toString(),
        },
      ] as CliHintMessage[],
    };
  },
  methods: {
    setEdit(): void {
      this.$router.push({ query: { edit: 'true' } });
    },
    setDeckEdit(pkg: TDeckNode): void {
      this.deckToBeEdited = pkg;
      this.deckEdit = true;
    },
  },
});
</script>

<style lang="scss" scoped>
.deployment-badge {
  font-weight: 500;
  background-color: #f3f4f9;
  color: #9eaed7;
  white-space: nowrap;
  flex: 0 0 auto;
  margin-bottom: 10px;
}

th:first-child {
  border-top-left-radius: 6px;
}

th:last-child {
  border-top-right-radius: 6px;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  color: white;
}
</style>
