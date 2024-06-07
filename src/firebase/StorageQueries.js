import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "../config/firebase";

// upload file
const UploadImage = async (file) => {
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

const replaceBase64ImagesWithUrls = async (htmlString, base64Images) => {
  let updatedHtmlString = htmlString;
  try {
    for (const base64Image of base64Images) {
      const imageRef = ref(storage, `post_content/${new Date().toISOString()}`);
      await uploadString(imageRef, base64Image, "data_url").then((snap) => {
        console.log(snap);
      });
      let imageUrl = "";
      await getDownloadURL(imageRef).then((url) => {
        return (imageUrl = url);
      });
      updatedHtmlString = updatedHtmlString.replace(base64Image, imageUrl);
    }
  } catch (err) {
    throw new Error(err);
  }

  return updatedHtmlString;
};

export { replaceBase64ImagesWithUrls, UploadImage };
