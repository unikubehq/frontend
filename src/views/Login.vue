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
          <h1 class="text-h1">Login</h1>
          <p class="text--secondary">
            {{ $t('New to Unikube?') }}
            <router-link to="/register">{{ $t('Register')}}</router-link>
          </p>
          <v-form>
            <v-text-field
                :label="$t('Email Address')"
                name="login"
                filled
                outlined
                type="text"
                :placeholder="$t('Enter Email Address')"
                v-model="email"
                @keyup.enter="login"
                :error-messages="emailErrors"
                prepend-inner-icon="$vuetify.icons.email"
                @blur="$v.email.$touch()"
            />

            <v-text-field
                id="password"
                :label="$t('Password')"
                name="password"
                filled
                outlined
                :type="clearText ? 'text' : 'password'"
                :placeholder="$t('Enter Password')"
                v-model="password"
                @keyup.enter="login"
                :error-messages="passwordErrors"
                prepend-inner-icon="$vuetify.icons.password"
                :append-icon="clearText ? '$vuetify.icons.eyeOpen' : '$vuetify.icons.eye'"
                @click:append="clearText = !clearText"
                @blur="$v.password.$touch()"
            >
            </v-text-field>
            <v-alert dense outlined type="error" v-for="error in errors" :key="error">
              {{ error }}
            </v-alert>
            <div class="d-flex justify-space-between align-center">
              <v-checkbox v-model="remember" :ripple="false">
                <template v-slot:label>
                  <div class="v-label--secondary">
                    {{ $t('Remember this device')}}
                  </div>
                </template>
              </v-checkbox>
              <router-link class="link--secondary" to="/forgot-password">
                {{ $t('Forgot password?') }}
              </router-link>
            </div>
            <v-btn block color="primary" large elevation="0" :ripple="false" @click="login">
              {{ $t('Sign In') }}
            </v-btn>
          </v-form>
        </v-col>
        <v-col cols="12" class="text-center mt-1" align-self="center">
          <span class="text--secondary">
            {{ $t('Or continue with') }}
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
import { required, email } from 'vuelidate/lib/validators';
import { TranslateResult } from 'vue-i18n';
import { getModule } from 'vuex-module-decorators';
import Auth from '@/store/modules/auth';
import UI from '@/store/modules/ui';

@Component({
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
})
export default class Login extends Vue {
  email = '';

  password = '';

  remember = false;

  clearText = false;

  errors: TranslateResult[] = [];

  login(): void {
    this.errors = [];
    this.$v.$touch();
    if (!this.$v.$invalid) {
      const ui = getModule(UI, this.$store);
      const auth = getModule(Auth, this.$store);
      ui.setOverlay(true);
      // eslint-disable-next-line no-undef
      const credentials: LoginCredentials = {
        email: this.email,
        password: this.password,
      };
      auth.authenticate(credentials).then((result) => {
        ui.setOverlay(false);
        if (result) {
          this.$router.push({
            name: 'overview',
          });
        } else {
          this.errors.push(
            this.$t('loginFailedError'),
          );
        }
      });
    }
  }

  created(): void {
    console.log(this.$vuetify.icons.values.eye);
  }

  get emailErrors(): TranslateResult[] {
    const errors = [];
    if (!this.$v.email.required) {
      errors.push(this.$t('requiredError'));
    }
    if (!this.$v.email.email) {
      errors.push(this.$t('emailError'));
    }
    return this.$v.email.$dirty ? errors : [];
  }

  get passwordErrors(): TranslateResult[] {
    const errors = [];
    if (!this.$v.password.required) {
      errors.push(this.$t('requiredError'));
    }
    return this.$v.password.$dirty ? errors : [];
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
