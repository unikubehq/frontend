<template>
  <div class="py-5">
      <h2>{{ $t('settings.notifications.title') }}</h2>
      <p>{{ $t('settings.notifications.intro') }}</p>
      <v-divider></v-divider>
    <v-row>
      <v-col cols="10">
        <v-row>
          <v-col cols="5">
            <h3>{{ $t('settings.notifications.projects') }}</h3>
          </v-col>
          <v-col cols="1">
            <span>{{ $t('settings.notifications.inApp') }}</span>
          </v-col>
          <v-col cols="1">
            <span>{{ $t('settings.notifications.email') }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5" class="d-flex flex-column justify-center">
            {{ $t('settings.notifications.newProject') }}
          </v-col>
          <v-col cols="1">
            <v-switch
              v-model="switch1"
              inset
              color="primary"
              :ripple="false"
            ></v-switch>
          </v-col>
          <v-col cols="1">
            <v-switch
              v-model="switch2"
              inset
              color="primary"
              :ripple="false"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5" class="d-flex flex-column justify-center">
            {{ $t('settings.notifications.projectEdit') }}
          </v-col>
          <v-col cols="1">
            <v-switch
              v-model="switch3"
              :ripple="false"
              color="primary"
              inset
            ></v-switch>
          </v-col>
          <v-col cols="1">
            <v-switch
              v-model="switch4"
              :ripple="false"
              color="primary"
              inset
            ></v-switch>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>

</template>

<script lang="ts">
export default {
  name: 'NotificationSettings.vue',

  data(): {
    switch1: boolean
    switch2: boolean
    switch3: boolean
    switch4: boolean
    } {
    return {
      switch1: true,
      switch2: false,
      switch3: false,
      switch4: true,
    };
  },
};
</script>

<style scoped>

</style>
