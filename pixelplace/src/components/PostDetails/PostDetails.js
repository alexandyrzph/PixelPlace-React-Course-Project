import { useState } from "react";
import { Link } from "react-router-dom";
import imageOne from "../../assets/postImages/1.jpg";
import Dots from "../../assets/26432.svg";
const PostDetails = () => {
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);
    }
  };

  return (
    <div>
      <div className="relative flex flex-col max-w-md sm:max-w-md md:max-w-xl mx-auto h-screen mt-16">
        <div className="mx-auto">
          <img
            src={imageOne}
            alt="img"
            className="border-2 border-neu-black border-b-none rounded-t-xl rounded-b-none"
          />
        </div>
        <div className="relative border-2 border-t-none rounded-b-lg border-neu-black bg-white p-4">
          <div className="flex justify-between mt-2">
            <img
              className="border-2 border-neu-black cursor-pointer inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <Link to={`/profile/idofuser`}>
              <p>@username</p>
            </Link>
          </div>
          <p className="text-md mt-2 mb-4">Likes 3</p>

          <h1 className="text-xl font-neu">Article title of post</h1>
          <div className="text-lg mb-2">Art pic from unsplash 'desc'</div>
          <h2 className="mt-5 text-lg">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
            <div className="flex gap-2 mt-5 items-center bg-white rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="w-10 h-10 rounded-full cursor-pointer"
                alt="user-profile"
              />
              <div className="flex flex-col">
                <p className="font-bold">@username</p>
                <p>WOW this is a comments</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`/user-profile/idOfUser`}>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="w-10 h-10 rounded-full cursor-pointer"
                alt="user-profile"
              />
            </Link>
            <input
              className=" flex-1 border-neu-white outline-none border-2 p-2 rounded-md focus:border-neu-black"
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
};

export default PostDetails;
