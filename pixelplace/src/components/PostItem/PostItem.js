import { Link } from "react-router-dom";
import Like from "../Like/Like";
import { HiDotsHorizontal } from "react-icons/hi";

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
    return (
        <div className="break-inside mb-4 shadow-md rounded-lg shadow-gray-300">
            <div className=" bg-white rounded-lg border-2 border-neu-black">
                <div className="p-2 flex justify-between items-center">
                    <div className="flex items-center">
                        <img
                            className="w-10 h-10 object-cover object-center rounded-full mr-4"
                            src={ownerAvatarURL}
                            alt=""
                        />
                        <p>{ownerUsername}</p>
                    </div>
                    {user && user.uid === ownerId ? <HiDotsHorizontal cursor={"pointer"} /> : null}
                </div>
                <Link to={postId}>
                    <img src={image} alt="" />
                </Link>
                <div className="p-5">
                    <Link to="#">
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
                        <Link to={postId}>
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
