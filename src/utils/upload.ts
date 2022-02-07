// eslint-disable-next-line import/prefer-default-export
import { AxiosError, AxiosResponse } from 'axios';
import { ref } from 'vue';

export default function setupUpload(
  uploadUrl: string,
  successCallback: (res: AxiosResponse) => void,
  errorCallback: (err: AxiosError) => void,
) {
  const previewUrl: string | null = ref(null);

  const handleUpload = (e: {target: HTMLInputElement}): void => {
    if (e && e.target && e.target.files) {
      const file = e.target.files[0];
      previewUrl.value = URL.createObjectURL(file);
      const formData = new FormData();
      formData.append('avatar_image', file);
      this.axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.$store.state.auth.rawRpt}`,
        },
      }).then(successCallback).catch(errorCallback);
    }
  };

  return {
    previewUrl,
    handleUpload,
  };
}
