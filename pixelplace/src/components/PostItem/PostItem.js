import { Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { useState } from "react";

const PostItem = ({ image, title, description, user }) => {
    const [liked, setLiked] = useState(false);
    const onLikeHandler = () => {
        setLiked((liked) => !liked);
    };

    return (
        <div className="break-inside mb-4">
            <div className=" bg-white rounded-lg border-2 border-neu-black">
                <div className="p-2 flex items-center">
                    <img
                        className="w-10 rounded-full mr-4"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                    <p>Alehando Alehandrov</p>
                </div>
                <Link to="#">
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
                        <AiFillLike
                            size={"1.8rem"}
                            onClick={onLikeHandler}
                            color={liked ? "red" : ""}
                            className="mb-2 mt-4 cursor-pointer duration-100"
                        />
                    )}

                    <div className="inline-flex items-center">
                        <Link to={`/post/wdad32q4ad`}>
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
