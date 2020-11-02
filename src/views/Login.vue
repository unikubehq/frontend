<template>
  <v-main>
    <v-container fluid fill-height class="container--login">
      <v-img src="@/assets/img/Unikube-Logo-Icon.svg" class="logo--bottom"
             height="40%" width="30%" contain position="bottom right"/>
      <v-row justify="center">
        <v-col cols="10" class="text-center">
          <v-img class="d-inline-block" src="@/assets/img/Unikube-Logo-H.svg"
                 max-width="150"/>
        </v-col>
        <v-col cols="12" sm="8" md="3">
          <h1 class="text-h1">{{ $i18n.login }}</h1>
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
                prepend-inner-icon="$vuetify.icons.email"
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
                :append-icon="clearText ? '$vuetify.icons.eyeOpen' : '$vuetify.icons.eye'"
                @click:append="clearText = !clearText"
            >
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
        <v-col cols="12" class="text-center mt-1" align-self="center">
          <span class="text--secondary">
            Or continue with
          </span>
          <div class="d-flex justify-center my-4">
            <!-- todo add links for sso / sso logic -->
            <a href="">
              <v-img max-width="32" max-height="32"
                     class="mx-3" src="@/assets/img/gsuite.svg"/>
            </a>
            <a href="">
              <v-img max-width="32" max-height="32"
                     class="mx-3" src="@/assets/img/github.svg"/>
            </a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  username = '';

  password = '';

  remember = false;

  clearText = false;

  errors = [];

  login(): void {
    console.log(this);
  }

  created(): void {
    console.log(this.$vuetify.icons.values.eye);
  }
}
</script>

<style scoped>
.logo--bottom {
  position: absolute;
  bottom: -13%;
  right: -60px;
  opacity: 0.1;
}

.container--login {
  position: relative;
  overflow: hidden;
}
</style>
