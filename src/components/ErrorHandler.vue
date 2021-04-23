<template>
 <v-dialog
  v-model="showErrorDialog"
  width="50%"
 >
   <v-card
     v-for="error in errors"
     v-bind:key="error.message"
     class="py-8 px-7 mb-2"
   >
        <v-card-title class="headline">
          Oops... Error {{ error.code }}
        </v-card-title>
        <v-card-text>
          <div>
            <p>
              <v-icon x-large>
                $vuetify.icons.bigSorry
              </v-icon>
              {{ $t(error.message) }}
            </p>
            {{ error.error }}
          </div>
        </v-card-text>
        <v-card-actions class="py-0">
          <v-container fluid class="py-0">
            <v-row>
          <v-col class="py-0">
            <v-btn
              large
              block
              :ripple="false"
              text
              @click="handleAcknowledge"
              color="primary"
            >
            Okay
            </v-btn>
          </v-col>
          </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
 </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UnikubeError } from '@/typing';

@Component({})
export default class ErrorHandler extends Vue {
  get errors(): UnikubeError {
    return this.$store.state.errors.errors;
  }

  get showErrorDialog(): boolean {
    return this.$store.state.errors.errors.length > 0;
  }

  handleAcknowledge(): void {
    this.$store.commit('errors/clearError');
  }
}
</script>

<style>

</style>
