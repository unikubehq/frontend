<template>
  <v-menu open-on-hover top offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-avatar v-on="on" size="46"
          class="initials-avatar avatar-list-item avatar__unikube" color="primary"
          :style="avatarStyles">
            <img v-if="avatar.image" :src="avatar.image" alt="User Avatar">
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
            <img v-if="avatar.image" :src="avatar.image" alt="User Avatar">
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
import Component from 'vue-class-component';
import { AvatarMixin } from '@/components/mixins';

@Component
export default class UnikubeAvatar extends AvatarMixin {
}
</script>

<style scoped>
</style>
