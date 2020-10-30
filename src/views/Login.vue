<template>
  <v-main>
  <v-container class="fill-height" fluid >
    <v-row align="center" justify="center">
      <v-col cols="12" align="center">
        <v-img src="@/assets/img/Unikube-Logo-H.svg" max-width="150"></v-img>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="3">
        <h1 class="text-h1">Sign In</h1>
        <p class="text--secondary">New to Unikube? <a href="/register">Register</a></p>
        <v-form>
          <v-text-field
            label="Email Address"
            name="login"
            filled
            outlined
            type="text"
            placeholder="Enter Email Address"
            v-model="username"
            @keyup.enter="login"
            :error-messages="errors.username"
            prepend-inner-icon="$vuetify.icons.user"
          />

          <v-text-field
            id="password"
            label="Password"
            name="password"
            filled
            outlined
            :type="clearText ? 'text' : 'password'"
            placeholder="Enter Password"
            v-model="password"
            @keyup.enter="login"
            :error-messages="errors.password"
            prepend-inner-icon="$vuetify.icons.password"
          >
            <template v-slot:append>
              <v-icon @click="clearText = !clearText"
                      :class="{'v-textfield--show-password': clearText}">$vuetify.icons.eye</v-icon>
            </template>
          </v-text-field>
            <div class="d-flex justify-space-between align-center">
                  <v-checkbox v-model="remember" :ripple="false">
              <template v-slot:label>
                <div class="v-label--secondary">
                  Remember this device
                </div>
              </template>
            </v-checkbox>
            <a href="" class="link--secondary">Forgot Password?</a>
            </div>
          <v-btn block color="primary" large elevation="0" :ripple="false">Sign In</v-btn>
              <div class="error" v-if="errors && errors.detail">
                {{ errors.detail }}
              </div>
            </v-form>
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

  remember = false

  clearText = false

  errors = []

  login(): void {
    console.log(this);
  }

  created() {
    console.log(this.$vuetify.icons.values.eye);
  }
}
</script>

<style scoped>

</style>
