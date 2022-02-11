<template>
  <div>
    <span v-if="loading">
      <v-skeleton-loader
          v-for="i in (Math.floor(Math.random() * 3) + 1)"
          type="avatar"
          :key="i"
          class="d-inline-block ml-n2"/>
    </span>
    <span v-else>
      <unikube-avatar :avatar-prop="avatar" v-for="avatar in avatars.slice(0, 3)"
          :key="avatar.name"/>
      <span class="ml-2 font-weight-medium"
          v-if="avatars.length > 3" v-text="'+ ' + (avatars.length - 3)"/>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import UnikubeAvatar from '@/components/general/Avatar.vue';
import { Maybe, TProjectMember } from '@/generated/graphql';
import Converter from '@/utils/converter';

export default defineComponent({
  components: {
    UnikubeAvatar,
  },
  props: {
    members: {
      type: Object as PropType<TProjectMember[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    avatars(): Array<{ image: string | null, key: string, initials: string | null }> {
      const result: Array<{ image: string | null, key: string, initials: string | null }> = [];
      this.members?.forEach((member: Maybe<TProjectMember>) => {
        if (member) {
          result.push(Converter.memberToAvatar(member));
        }
      });
      return result;
    },
  },
});
</script>
