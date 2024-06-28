import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";

// POST DATA
export const PostData = async (data) => {
  try {
    const raw = await addDoc(collection(db, "Posts"), data);
    return raw;
  } catch (err) {
    console.error(err);
  }
};

export const UpdateData = async (id, data) => {
  try {
    if (id) {
      const updatePostRef = doc(db, "Posts", id);
      await updateDoc(updatePostRef, data);
      const updatedDoc = await getDoc(updatePostRef);
      return { ...updatedDoc.data(), id: updatedDoc.id };
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const DeleteData = async (id) => {
  try {
    if (id) {
      const deleteRef = doc(db, "Posts", id);
      await deleteDoc(deleteRef);
      return { message: "Document deleted" };
    }
  } catch (err) {
    throw new Error(err);
  }
};
