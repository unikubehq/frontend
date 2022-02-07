/* eslint-disable max-classes-per-file */
import { AxiosResponse } from 'axios';
import { Vue } from 'vue-class-component';
import VueI18n from 'vue-i18n';
import { Avatar } from '@/typing';
import TranslateResult = VueI18n.TranslateResult;

// eslint-disable-next-line import/prefer-default-export
export class paginationMixin extends Vue {
  offset = 0;

  limit = 3;

  currentPage = 1;

  changeOffset(page: number): void {
    this.offset = page > 1 ? (page - 1) * this.limit : 0;
  }

  // eslint-disable-next-line class-methods-use-this
  get totalObjectCount(): number {
    return 1;
  }

  get listLength(): number {
    return this.totalObjectCount
      ? Math.ceil(this.totalObjectCount / this.limit)
      : 1;
  }
}

// eslint-disable-next-line import/prefer-default-export
export class AvatarMixin extends Vue {
  @Prop() readonly avatarProp!: Avatar;

  get avatar(): Avatar {
    return this.avatarProp;
  }

  get avatarStyles(): {color: string, backgroundColor: string} {
    return { color: this.avatarColor('50%'), backgroundColor: `${this.avatarColor('95%')} !important` };
  }

  avatarColor(lum: string): string {
    const randomHSL = (name: string): string => {
      const number = name.length;
      const firstLetter = name[0].charCodeAt(0);
      const lastLetter = name[name.length - 1].charCodeAt(0);

      const avatarNumber = (number + firstLetter + lastLetter) / 10;

      return `hsla(${Math.floor(360 * avatarNumber)},70%,${lum},1)`;
    };
    return randomHSL(this.avatar.name);
  }
}
