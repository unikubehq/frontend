<template>
  <v-container class="pa-8">
    <v-row>
      <v-col cols="12">
        <h2>Organization Roles</h2>
        <p>Control what things you would like to get notified for.</p>
        <v-divider></v-divider>
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col cols="5">
            <h3>Projects</h3>
          </v-col>
          <v-col cols="1">
            <span>In-App</span>
          </v-col>
          <v-col cols="1">
            <span>Email</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5" class="d-flex flex-column justify-center">
            When a new project is added
          </v-col>
          <v-col cols="1">
            <v-switch
              v-model="switch1"
              :ripple="false"
            ></v-switch>
          </v-col>
          <v-col cols="1">
            <v-switch
              v-model="switch2"
              :ripple="false"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5" class="d-flex flex-column justify-center">
            When a project is edited
          </v-col>
          <v-col cols="1">
            <v-switch
              v-model="switch3"
              :ripple="false"
            ></v-switch>
          </v-col>
          <v-col cols="1">
            <v-switch
              v-model="switch4"
              :ripple="false"
            ></v-switch>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
export default {
  name: 'NotificationSettings.vue',

  data() {
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
