import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

// upload file
export const UploadImage = async (file) => {
  const storage = getStorage();
  const storageRef = ref(storage, `post_covers/${file.name}`);
  // object for post
  const fileFromStorage = {
    name: null,
    url: null,
  };
  // upload file as base64data_url
  await uploadString(storageRef, file.content, "data_url");
  // get download url
  await getDownloadURL(storageRef).then((url) => {
    fileFromStorage.url = url;
    fileFromStorage.name = file.name;
  });
  return fileFromStorage;
};
