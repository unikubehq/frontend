// eslint-disable-next-line import/prefer-default-export
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default function setupUpload(
  uploadUrl: string,
  successCallback: (res: AxiosResponse) => void,
  errorCallback: (err: AxiosError) => void,
) {
  const previewUrl = ref('');
  const store = useStore();

  const handleUpload = (e: {target: HTMLInputElement}): void => {
    if (e && e.target && e.target.files) {
      const file = e.target.files[0];
      previewUrl.value = URL.createObjectURL(file);
      const formData = new FormData();
      formData.append('avatar_image', file);
      axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${store.state.auth.rawRpt}`,
        },
      }).then(successCallback).catch(errorCallback);
    }
  };

  return {
    previewUrl,
    handleUpload,
  };
}
