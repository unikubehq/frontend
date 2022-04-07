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
        <v-icon class="mr-2" @click="$emit('hide')">$cross</v-icon>
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SideDrawer',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    intro: {
      type: String,
      required: false,
    },
  },
});
</script>
