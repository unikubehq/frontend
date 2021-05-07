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
      <unikube-avatar :avatar="avatar" v-for="avatar in avatars" :key="avatar.name"/>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import UnikubeAvatar from '@/components/general/Avatar.vue';
import { Maybe, TProjectMember } from '@/generated/graphql';

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
      const res = {
        key: member?.user?.id || '',
        image: member?.user?.avatarImage || null,
        initials: `${member?.user?.givenName?.[0]}${member?.user?.familyName?.[0]}`,
        name: `${member?.user?.givenName} ${member?.user?.familyName}` || null,
        email: `${member?.user?.email}` || null,
        role: `${member?.role}` || null,
      };
      result.push(res);
    });
    return result;
  }
}
</script>

<style scoped>
</style>
