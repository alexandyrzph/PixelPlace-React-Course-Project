import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getPostById = async (postId) => {
    const ref = doc(db, "Posts", postId);
    const post = await getDoc(ref);
    return post.data();
};
