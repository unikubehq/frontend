<template>
  <v-main>
  <v-container class="fill-height" fluid >
    <v-row align="center" justify="center">
      <v-col cols="12" align="center">
        <v-img src="@/assets/img/Unikube-Logo-H.svg" max-width="150"></v-img>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <h1>Sign In</h1>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Login"
                name="login"
                prepend-icon="person"
                type="text"
                v-model="username"
                @keyup.enter="login"
                :error-messages="errors.username"
              />

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="lock"
                type="password"
                v-model="password"
                @keyup.enter="login"
                :error-messages="errors.password"
              />
              <div class="error" v-if="errors && errors.detail">
                {{ errors.detail }}
              </div>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  username = ''

  password = ''

  errors = []

  login(): void {
    console.log(this);
  }
}
</script>

<style scoped>

</style>
