<template>
  <v-menu open-on-hover top offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-avatar v-on="on" size="46"
          class="initials-avatar avatar-list-item avatar__unikube" color="primary"
          :style="avatarStyles">
            <img v-if="avatar.image" :src="avatar.image">
            <span v-else class="avatar-initials">{{ avatar.initials }}</span>
      </v-avatar>
    </template>
    <div class="pa-1 white">
      <v-list>
        <v-list-item two-line>
         <v-list-item-avatar>
          <v-avatar
            size="46"
            class="avatar__unikube"
            :style="avatarStyles">
            <img v-if="avatar.image" :src="avatar.image">
            <span v-else>{{ avatar.initials }}</span>
          </v-avatar>
         </v-list-item-avatar>
          <v-list-item-content style="max-width: 160px;">
            <v-list-item-title>{{ avatar.name }}</v-list-item-title>
            <v-list-item-subtitle v-if="avatar.email">
              {{ avatar.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list class="mt-n5">
        <v-list-item two-line v-if="avatar.role">
          <v-list-item-content>
            <v-list-item-title style="text-transform: capitalize;">
              {{ avatar.role }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $t('user.role') }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Avatar } from '@/typing';

@Component
export default class UnikubeAvatar extends Vue {
  @Prop() readonly avatar!: Avatar;

  get avatarStyles(): {color: string, backgroundColor: string} {
    return { color: this.avatarColor('50%'), backgroundColor: `${this.avatarColor('95%')} !important` };
  }

  avatarColor(lum: number): string {
    const randomHSL = (name: string): string => {
      const number = name.length;
      const firstLetter = name[0].charCodeAt(0);
      const lastLetter = name[name.length - 1].charCodeAt(0);

      const avatarNumber = (number + firstLetter + lastLetter) / 10;

      return `hsla(${Math.floor(360 * avatarNumber)},70%,${lum},1)`;
    };
    return randomHSL(this.avatar.name);
  }
}
</script>

<style scoped>
</style>
