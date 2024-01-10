import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

// GET ALL DATA
export const GetAllData = async () => {
  const temp = [];
  try {
    const querySnap = await getDocs(collection(db, "Posts"));
    querySnap.forEach((doc) => {
      temp.push({ ...doc.data(), id: doc.id });
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
  return temp;
};

export const GetOneData = async (id) => {
  try {
    const docSnap = await getDoc(doc(db, "Posts", id));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return console.log("No such document!");
    }
  } catch (err) {
    console.error(err.message);
  }
};
// POST DATA
export const PostData = async (data) => {
  try {
    const raw = await addDoc(collection(db, "Posts"), data);
    return raw;
  } catch (err) {
    console.error(err);
  }
};
