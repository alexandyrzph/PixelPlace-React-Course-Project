import { useUserAuth } from "../../../context/UserAuthContext";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { ToastContainer } from "react-toastify";
import { toastError } from "../../../utils/Toast";
import { db } from "../../../firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import Comment from "../../Comment/Comment";
import { Transition } from "@tailwindui/react";
import { useDocument } from "react-firebase-hooks/firestore";

const PostDetails = () => {
    const { user } = useUserAuth();
    const { postId } = useParams();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [dropdownShow, setDropdownShow] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const [post, loading] = useDocument(doc(db, "Posts", postId), {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    useEffect(() => {
        onSnapshot(
            query(collection(db, "Posts", postId, "comments")),
            orderBy("timeStamp", "desc"),
            (snapshot) => {
                const commentSnap = snapshot.docs.map((comment) => ({
                    ...comment.data(),
                    commentId: comment.id,
                }));
                setComments(commentSnap);
            }
        );
    }, [postId]);

    const deletePostHandler = () => {
        deleteDoc(doc(db, "Posts", postId)).then(() => {
            navigate("/posts");
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.length < 3) {
            toastError("Comment must be at least 3 characters long.");
            return;
        }
        const { photoURL, displayName, uid } = user;
        const commentData = { uid, photoURL, displayName, comment, timeStamp: serverTimestamp() };
        addDoc(collection(db, "Posts", postId, `comments`), commentData)
            .then()
            .catch((err) => toastError(err));
        setComment("");
    };

    return (
        <div>
            <ToastContainer />
            <div className="relative flex flex-col max-w-md sm:max-w-md md:max-w-xl mx-auto h-screen mt-16">
                <div className="mx-auto max-h-[450px] w-full">
                    {!loading && (
                        <img
                            src={post?.data().image}
                            alt="img"
                            className="border-2 border-b-none bg-white h-full w-full object-cover object-center border-neu-black"
                        />
                    )}
                </div>
                <div className="relative border-2 border-t-none border-neu-black bg-white p-4">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-neu">{post?.data().title}</h1>

                        {user && user.uid === post?.data().ownerId ? (
                            <div ref={menuRef} className="relative">
                                <HiDotsHorizontal
                                    cursor={"pointer"}
                                    onClick={() => setDropdownShow(!dropdownShow)}
                                />
                                <Transition
                                    show={dropdownShow}
                                    enter="transition ease-out duration-100 transform"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="transition ease-in duration-75 transform"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <div className="absolute z-[200] right-0 max-w-fit  mt-1 bg-white rounded hover:shadow-[2px_2px_2px] border-2 border-neu-black duration-150">
                                        <Link to="edit">
                                            <p className="block px-4 py-2 hover:bg-neu-yellow hover:text-neu-black duration-150 truncate">
                                                Edit Post
                                            </p>
                                        </Link>
                                        <hr />
                                        <button
                                            onClick={() => deletePostHandler()}
                                            className="text-left w-full"
                                        >
                                            <p className="block px-4 py-2 hover:bg-red-500 hover:text-neu-black duration-75">
                                                Delete
                                            </p>
                                        </button>
                                    </div>
                                </Transition>
                            </div>
                        ) : null}
                    </div>
                    <div className="text-lg mb-2">{post?.data().description}</div>

                    <div className="flex justify-between mt-4">
                        <div className="flex justify-center items-center gap-6">
                            <img
                                className="border-2 border-neu-black  cursor-pointer inline-block h-9 w-9 rounded-full ring-2 ring-white"
                                src={post?.data().ownerAvatarURL}
                                alt="avatarImage"
                            />
                            <p className="border-2 px-4 rounded-full text-gray-300 bg-neu-black">
                                {post?.data().category}
                            </p>
                        </div>
                        <p>@{post?.data().ownerUsername}</p>
                    </div>
                    <p className="text-md mt-2 mb-4">
                        Likes: <span className="font-bold">{post?.data().likes.length}</span>
                    </p>
                    <h2 className="mt-5 text-lg">Comments:</h2>
                    <div className="max-h-370 overflow-y-auto">
                        <div className="flex flex-col gap-2 mt-5 bg-white rounded-lg">
                            {comments.length === 0 ? (
                                <p>No comments yet</p>
                            ) : (
                                comments.map((comment) => (
                                    <Comment
                                        {...comment}
                                        key={uuidv4()}
                                        postId={postId}
                                        currentUserId={user?.uid}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap mt-6 items-center gap-3">
                        {user && (
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-wrap w-full items-center gap-2"
                            >
                                <img
                                    src={user.photoURL}
                                    className="w-9 h-9 items-center object-cover object-center rounded-full"
                                    alt="user-profile"
                                />
                                <input
                                    className="flex-1 bg-gray-100 border-neu-white outline-none border-2 p-2 rounded-md focus:border-gray-500"
                                    type="text"
                                    placeholder="Add a comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="bg-neu-yellow text-neu-black border-2 border-neu-black hover:shadow-[2px_2px_2px] duration-75 px-6 py-2 font-semibold text-base outline-none"
                                    onClick={handleSubmit}
                                >
                                    Send
                                </button>
                            </form>
                        )}
                    </div>
                    <img
                        className="hidden lg:block absolute bottom-5 -right-20 opacity-10 -z-10 w-[200px]"
                        src="https://firebasestorage.googleapis.com/v0/b/pixelplace-b8fac.appspot.com/o/26432.svg?alt=media&token=17971521-81ad-4e86-bd5b-f0051d4c5a13"
                        alt="Dots"
                    />
                </div>
                <img
                    className="hidden lg:block absolute top-5 -left-20 opacity-10 -z-10 w-[200px]"
                    src="https://firebasestorage.googleapis.com/v0/b/pixelplace-b8fac.appspot.com/o/26432.svg?alt=media&token=17971521-81ad-4e86-bd5b-f0051d4c5a13"
                    alt="Dots"
                />
            </div>
        </div>
    );
};

export default PostDetails;
