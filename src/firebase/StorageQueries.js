import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "../config/firebase";
import { v4 } from "uuid";

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
  const fallbackValues = {
    updatedHtmlString: htmlString,
    imageRefPaths: [],
  };
  try {
    const FolderID = v4();
    for (const base64Image of base64Images) {
      const imageRef = ref(
        storage,
        `post_content/${FolderID}/${new Date().toISOString()}`
      );
      await uploadString(imageRef, base64Image, "data_url").then((snap) => {
        fallbackValues.imageRefPaths.push(snap.ref._location.path);
      });
      let imageUrl = "";
      await getDownloadURL(imageRef).then((url) => {
        return (imageUrl = url);
      });
      fallbackValues.updatedHtmlString =
        fallbackValues.updatedHtmlString.replace(base64Image, imageUrl);
    }
  } catch (err) {
    throw new Error(err);
  }

  return fallbackValues;
};

export { replaceBase64ImagesWithUrls, UploadImage };
