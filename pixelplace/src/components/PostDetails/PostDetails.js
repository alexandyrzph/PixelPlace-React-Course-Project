import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { getPostById } from "../../api/PostsAPI";
import Dots from "../../assets/26432.svg";
import { HiDotsHorizontal } from "react-icons/hi";
import { useUserAuth } from "../../context/UserAuthContext";
import { Transition } from "@tailwindui/react";
import { db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";

const PostDetails = () => {
    const { user } = useUserAuth();
    const { postId } = useParams();
    const [post, setPost] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownShow, setDropdownShow] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getPostById(postId)
            .then((data) => {
                setPost(data);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, [postId]);

    useEffect(() => {
        if (post) {
            const handleOutsideClick = (event) => {
                if (!menuRef.current.contains(event.target)) {
                    if (!dropdownShow) return;
                    setDropdownShow(false);
                }
            };

            window.addEventListener("click", handleOutsideClick);
            return () => window.removeEventListener("click", handleOutsideClick);
        }
    }, [post, dropdownShow, menuRef]);

    const [comment, setComment] = useState("");
    const [addingComment, setAddingComment] = useState(false);

    const deletePostHandler = () => {
        deleteDoc(doc(db, "Posts", postId)).then(() => {
            navigate("/posts");
        });
    };

    const addComment = () => {
        if (comment) {
            setAddingComment(true);
        }
    };
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-neu-white">
                <BeatLoader size={"5rem"} color={"#1e1e1e"} />
            </div>
        );
    } else {
        return (
            <div>
                <div className="relative flex flex-col max-w-md sm:max-w-md md:max-w-xl mx-auto h-screen mt-16">
                    <div className="mx-auto max-h-[450px] w-full">
                        <img
                            src={post?.image}
                            alt="img"
                            className="border-2 h-full w-full object-cover border-neu-black border-b-none rounded-t-xl rounded-b-none"
                        />
                    </div>
                    <div className="relative border-2 border-t-none rounded-b-lg border-neu-black bg-white p-4">
                        <div className="flex justify-between">
                            <h1 className="text-xl font-neu">{post?.title}</h1>
                            {user && user.uid === post?.ownerId ? (
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
                                                onClick={() => {
                                                    deletePostHandler();
                                                }}
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
                        <div className="text-lg mb-2">{post?.description}</div>

                        <div className="flex justify-between mt-4">
                            <div className="flex justify-center items-center gap-6">
                                <img
                                    className="border-2 border-neu-black cursor-pointer inline-block h-9 w-9 rounded-full ring-2 ring-white"
                                    src={post?.ownerAvatarURL}
                                    alt=""
                                />
                                <p className="border-2 px-4 rounded-full text-gray-300 bg-neu-black">
                                    {post?.category}
                                </p>
                            </div>
                            <p>@{post?.ownerUsername}</p>
                        </div>
                        <p className="text-md mt-2 mb-4">
                            Likes: <span className="font-bold">{post?.likes.length}</span>
                        </p>

                        <h2 className="mt-5 text-lg">Comments:</h2>
                        <div className="max-h-370 overflow-y-auto">
                            <div className="flex gap-2 mt-5 items-center bg-white rounded-lg">
                                {post?.comments?.length === 0 ? (
                                    <p>No comments yet</p>
                                ) : (
                                    post?.comments?.map((comment) => (
                                        <>
                                            <img
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                className="w-10 h-10 rounded-full cursor-pointer"
                                                alt="user-profile"
                                            />
                                            <div className="flex flex-col">
                                                <p className="font-bold">@username</p>
                                                <p>WOW this is a comments</p>
                                            </div>
                                        </>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6 items-center gap-3">
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
                                className="bg-neu-yellow text-neu-black border-2 border-neu-black hover:shadow-[2px_2px_2px] duration-75 rounded-md px-6 py-2 font-semibold text-base outline-none"
                                onClick={addComment}
                            >
                                {addingComment ? "Doing..." : "Done"}
                            </button>
                        </div>
                        <img
                            className="hidden lg:block absolute bottom-5 -right-20 opacity-10 -z-10 w-[200px]"
                            src={Dots}
                            alt="Dots"
                        />
                    </div>
                    <img
                        className="hidden lg:block absolute top-5 -left-20 opacity-10 -z-10 w-[200px]"
                        src={Dots}
                        alt="Dots"
                    />
                </div>
            </div>
        );
    }
};

export default PostDetails;
