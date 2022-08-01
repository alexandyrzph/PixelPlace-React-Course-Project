import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { AiFillLike } from "react-icons/ai";
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase";

const Like = ({ likes, postId }) => {
    const { user } = useUserAuth();

    const likesRef = doc(db, "Posts", postId);

    const onLikeHandler = (e) => {
        if (likes?.includes(user.uid)) {
            updateDoc(likesRef, {
                likes: arrayRemove(user.uid),
            })
                .then()
                .catch((err) => console.log(err));
        } else {
            updateDoc(likesRef, {
                likes: arrayUnion(user.uid),
            })
                .then()
                .catch((err) => console.log(err));
        }
    };

    return (
        <AiFillLike
            size={"1.7rem"}
            onClick={onLikeHandler}
            color={likes?.includes(user.uid) ? "red" : ""}
            className="mb-2 mt-4 cursor-pointer duration-100"
        />
    );
};

export default Like;
