import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { ToastContainer } from "react-toastify";
import { toastError } from "../../utils/Toast";
import { HiX } from "react-icons/hi";

const Comment = ({ photoURL, displayName, comment, commentId, uid, postId }) => {
    const deleteCommentHandler = (e) => {
        deleteDoc(doc(db, "Posts", postId, "comments", commentId))
            .then()
            .catch((err) => toastError(err));
    };

    return (
        <div className="flex bg-slate-200 rounded-full rounded-r-xl gap-2 mb-2 items-center">
            <ToastContainer />
            <img
                src={photoURL}
                className="w-10 h-10 object-cover object-center rounded-full cursor-pointer"
                alt="user-profile"
            />
            <div className="flex flex-1 flex-col">
                <p className="w-full font-bold">@{displayName}</p>
                <p className="w-full">{comment}</p>
            </div>
            <HiX
                cursor={"pointer"}
                onClick={deleteCommentHandler}
                className="hover:bg-slate-300 text-lg text-gray-500 hover:text-black rounded-full duration-100"
            />
        </div>
    );
};

export default Comment;
