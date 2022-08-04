import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { Transition } from "@tailwindui/react";
import Like from "../Like/Like";

const PostItem = ({
    ownerUsername,
    image,
    title,
    description,
    user,
    ownerAvatarURL,
    postId,
    likes,
    ownerId,
}) => {
    const [dropdownShow, setDropdownShow] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownShow) {
                if (!menuRef.current.contains(event.target)) {
                    if (!dropdownShow) return;
                    setDropdownShow(false);
                }
            }
        };

        window.addEventListener("click", handleOutsideClick);
        return () => window.removeEventListener("click", handleOutsideClick);
    }, [postId, dropdownShow, menuRef]);

    const deletePostHandler = () => {
        deleteDoc(doc(db, "Posts", postId)).then(() => {
            navigate("/posts");
        });
    };

    return (
        <div className="break-inside mb-4 lg:hover:-translate-y-[1px] duration-300">
            <div className="bg-white rounded-lg border-2 border-neu-black">
                <div className="flex justify-between items-center">
                    <div className="flex p-2 items-center">
                        <img
                            className="w-8 h-8 object-cover object-center rounded-full mr-3"
                            src={ownerAvatarURL}
                            alt=""
                        />
                        <p>{ownerUsername}</p>
                    </div>
                    {user && user.uid === ownerId ? (
                        <div ref={menuRef} className="relative">
                            <HiDotsHorizontal
                                className="mr-2 hover:bg-slate-200 rounded-full text-2xl"
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
                                    <Link to={`/posts/${postId}/edit`}>
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
                <Link to={`/posts/${postId}`}>
                    <img src={image} alt="" />
                </Link>
                <div className="p-5">
                    <Link to={`/posts/${postId}`}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                            {title}
                        </h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 truncate">{description}</p>
                    {user && (
                        <div className="flex items-center gap-1 mb-4 mt-6">
                            <p>{likes.length}</p>
                            <Like postId={postId} likes={likes} />
                        </div>
                    )}

                    <div className="inline-flex items-center">
                        <Link to={`/posts/${postId}`}>
                            <button className="relative flex-grow-1 w-full lg:w-full hover:shadow-neu-shadow hover:-translate-y-1 duration-200 border-2 outline-none border-neu-black px-6 py-3 rounded-lg bg-neu-yellow font-bold">
                                Read More
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
