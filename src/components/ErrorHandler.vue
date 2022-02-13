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
                $bigSorry
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
import { defineComponent } from 'vue';
import { UnikubeError } from '@/typing';
import useErrorStore from '@/stores/errors';

export default defineComponent({
  setup() {
    const errorStore = useErrorStore();
    return {
      errorStore,
    };
  },
  computed: {
    errors(): UnikubeError[] {
      return this.errorStore.errors;
    },
    showErrorDialog(): boolean {
      return this.errorStore.errors.length > 0;
    },
  },
  methods: {
    handleAcknowledge(): void {
      this.errorStore.clearError();
    },
  },
});
</script>

<style>

</style>
