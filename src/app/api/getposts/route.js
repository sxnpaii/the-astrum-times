import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
export const revalidate = 0
const GET = async (req) => {
  const temp = [];
  try {
    const querySnap = await getDocs(collection(db, "Posts"));
    querySnap.forEach((doc) => {
      temp.push({ ...doc.data(), id: doc.id });
    });
    return Response.json([...temp]);
  } catch (error) {
    return new Response({ ErrorGettingPosts: error.message });
  }
};

export { GET };
