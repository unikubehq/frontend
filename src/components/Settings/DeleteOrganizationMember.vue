<template>
  <v-dialog
      v-model="dialog"
      persistent
      width="550"
    >
      <v-card v-if="dialog" class="py-8 px-7">
        <v-card-title class="headline">
          Remove {{ memberName }}
        </v-card-title>
        <v-card-text>
          <div>
            Would you like to remove {{ memberName }} as an organization member?
            <br><br>
          </div>
        </v-card-text>
        <v-card-actions class="py-0">
          <v-container fluid class="py-0">
            <v-row>
          <v-col class="py-0"><v-btn
            large
            block
            :ripple="false"
            text
            @click="$emit('hide')"
          >{{ $t('general.disagree') }}</v-btn>
            </v-col>
          <v-col class="py-0"><v-btn
            large
            block
            :ripple="false"
            color="error"
            @click="deleteMember"
          >{{ $t('settings.roles.remove') }}</v-btn>
            </v-col>
          </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    show: {
      type: Boolean,
    },
    memberName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    deleteMember(): void {
      this.$emit('delete');
    },
  },
  watch: {
    show(newVal) {
      this.dialog = newVal;
    },
  },
});
</script>

<style lang="scss" scoped>
.project-card{
  &__wrapper {
    box-shadow: 0 2px 40px 0 rgba(183, 183, 183, 0.15);
  }
  &__detail {
    transform: rotate(-90deg);
  }
}
hr {
  height: 42px;
  align-self: center;
}
</style>
