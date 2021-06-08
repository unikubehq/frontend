/* eslint-disable max-classes-per-file */
import { AxiosResponse } from 'axios';
import { Avatar } from '@/typing';
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueI18n from 'vue-i18n';
import TranslateResult = VueI18n.TranslateResult;

@Component
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

Component.registerHooks(['validations']);

@Component
// eslint-disable-next-line import/prefer-default-export
export class validationMixin extends Vue {
   validatorMapping = [
     'email', 'required', 'url', 'minValue', 'maxValue',
   ]

   handleErrors(fieldName: string): TranslateResult[] {
     const errors: TranslateResult[] = [];

     this.validatorMapping.forEach((value) => {
       if (!this.$v[fieldName][value] && value in this.$v[fieldName]) {
         errors.push(this.$t(`errors.${value}Error`));
       }
     });
     return this.$v[fieldName].$dirty ? errors : [];
   }
}

@Component
// eslint-disable-next-line import/prefer-default-export
export class UploadComponent extends Vue {
  previewUrl: string | null = null

  uploadUrl!: string;

  uploadCallback(res: AxiosResponse): void {
    console.log('Implement this ', this, res);
  }

  uploadErrorCallback(): void {
    console.log('Implement this ', this);
  }

  getUploadUrl(): string {
    return this.uploadUrl;
  }

  handleUpload(e: {target: HTMLInputElement}): void {
    if (e && e.target && e.target.files) {
      const file = e.target.files[0];
      this.previewUrl = URL.createObjectURL(file);
      const formData = new FormData();
      formData.append('avatar_image', file);
      this.axios.post(`${this.getUploadUrl()}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.$store.state.auth.rawRpt}`,
        },
      }).then(this.uploadCallback).catch(this.uploadErrorCallback);
    }
  }
}

@Component
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
