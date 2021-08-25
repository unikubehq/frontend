<template>
  <v-card elevation="0" tile>
    <v-img src="@/assets/img/drawer_background.svg"
        alt="Drawer Background"
        height="80"
        width="100%"
        contain
        position="center right"
        class="v-navigation-drawer__headline align-center"
        dark
    >
      <v-card-title>
        <v-icon class="mr-2" @click="$emit('hide')">$vuetify.icons.cross</v-icon>
        {{ title }}
      </v-card-title>
    </v-img>
    <v-card-subtitle v-text="subtitle"/>
    <v-card-text>
      {{ intro }}
      <slot></slot>
    </v-card-text>
    <v-card-actions class="py-0">
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelmOverrides extends Vue {
  @Prop() readonly title!: string;

  @Prop() readonly subtitle: string | undefined;

  @Prop() readonly intro: string | undefined;
}
</script>
