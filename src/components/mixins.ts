/* eslint-disable max-classes-per-file */
import { AxiosResponse } from 'axios';
import { Component, Vue } from 'vue-property-decorator';
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

  get listLength(): number {
    return this.$data.allProjects?.totalCount
      ? Math.ceil(this.$data.allProjects?.totalCount / this.limit)
      : 1;
  }
}

Component.registerHooks(['validations']);

@Component
// eslint-disable-next-line import/prefer-default-export
export class validationMixin extends Vue {
   validatorMapping = [
     'email', 'required', 'url',
   ]

   handleErrors(fieldName: string): TranslateResult[] {
     const errors: TranslateResult[] = [];

     this.validatorMapping.forEach((value) => {
       if (!this.$v[fieldName][value] && value in this.$v[fieldName]) {
         errors.push(this.$t(`${value}Error`));
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
