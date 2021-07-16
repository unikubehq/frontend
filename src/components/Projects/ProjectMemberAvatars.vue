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
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import UnikubeAvatar from '@/components/general/Avatar.vue';
import { Maybe, TProjectMember } from '@/generated/graphql';
import Converter from '@/utils/converter';

@Component({
  components: {
    UnikubeAvatar,
  },
})
export default class ProjectMemberAvatars extends Vue {
  @Prop() readonly members!: TProjectMember[];

  @Prop({ default: true }) readonly loading!: boolean;

  get avatars(): Array<{ image: string | null, key: string, initials: string | null }> {
    const result: Array<{ image: string | null, key: string, initials: string | null }> = [];
    this.members?.forEach((member: Maybe<TProjectMember>) => {
      if (member) {
        result.push(Converter.memberToAvatar(member));
      }
    });
    return result;
  }
}
</script>
