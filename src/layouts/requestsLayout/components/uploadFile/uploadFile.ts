import axios from 'axios';

export default async function uploadFile(file) {

  const formData = new FormData();
  formData.append('file', file);

  axios({
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
  })
  .then((resp) => { return resp.data })
  .catch((err) => console.error(err));
}
