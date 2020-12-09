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
          <h1 class="text-h1">{{ $t('Register') }}</h1>
          <p class="text--secondary">
            {{ $t('Already registered?') }}
            <router-link to="/login">{{ $t('Sign in') }}</router-link></p>
          <v-form>
            <v-text-field
                :label="$t('Full Name')"
                name="fullname"
                filled
                outlined
                type="text"
                :placeholder="$t('Enter Full Name')"
                v-model="fullName"
                :error-messages="fullnameErrors"
                prepend-inner-icon="$vuetify.icons.user"
                @blur="$v.fullName.$touch()"
            />
            <v-text-field
                label="Email Address"
                name="login"
                filled
                outlined
                type="text"
                placeholder="Enter Email Address"
                v-model="username"
                @keyup.enter="register"
                :error-messages="usernameErrors"
                prepend-inner-icon="$vuetify.icons.email"
                @blur="$v.username.$touch()"
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
                @keyup.enter="register"
                :error-messages="passwordErrors"
                prepend-inner-icon="$vuetify.icons.password"
                :append-icon="clearText ? '$vuetify.icons.eyeOpen' : '$vuetify.icons.eye'"
                @blur="$v.password.$touch()"
                @click:append="clearText = !clearText"
            >
            </v-text-field>
            <v-text-field
                id="retypePassword"
                label="Password (again)"
                name="retypePassword"
                filled
                outlined
                :type="clearText ? 'text' : 'password'"
                placeholder="Enter Password"
                v-model="retypePassword"
                @keyup.enter="register"
                :error-messages="retypePasswordErrors"
                prepend-inner-icon="$vuetify.icons.password"
                :append-icon="clearText ? '$vuetify.icons.eyeOpen' : '$vuetify.icons.eye'"
                @blur="$v.retypePassword.$touch()"
                @click:append="clearText = !clearText"
            >
            </v-text-field>
            <v-btn block color="primary" large elevation="0" :ripple="false">Register</v-btn>
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
import {
  required, email, sameAs, minLength,
} from 'vuelidate/lib/validators';
import { TranslateResult } from 'vue-i18n';

  @Component({
    validations: {
      fullName: {
        required,
      },
      username: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      retypePassword: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  })
export default class Home extends Vue {
  fullName = '';

  username = '';

  password = '';

  retypePassword = '';

  remember = false;

  clearText = false;

  errors = [];

  register(): void {
    console.log(this);
  }

  created(): void {
    console.log(this.$vuetify.icons.values.eye);
  }

  get fullnameErrors(): TranslateResult[] {
    const errors = [];
    if (!this.$v.fullName.required) {
      errors.push(this.$t('requiredError'));
    }
    return this.$v.fullName.$dirty ? errors : [];
  }

  get usernameErrors(): TranslateResult[] {
    const errors = [];
    if (!this.$v.username.required) {
      errors.push(this.$t('requiredError'));
    }
    if (!this.$v.username.email) {
      errors.push(this.$t('emailError'));
    }
    return this.$v.username.$dirty ? errors : [];
  }

  get passwordErrors(): TranslateResult[] {
    const errors = [];
    if (!this.$v.password.required) {
      errors.push(this.$t('requiredError'));
    }
    if (!this.$v.password.minLength) {
      errors.push(this.$t('minLengthPassword'));
    }
    return this.$v.password.$dirty ? errors : [];
  }

  get retypePasswordErrors(): TranslateResult[] {
    const errors = [];
    if (!this.$v.retypePassword.required) {
      errors.push(this.$t('requiredError'));
    }
    if (!this.$v.retypePassword.sameAsPassword) {
      errors.push(this.$t('Passwords must match.'));
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
