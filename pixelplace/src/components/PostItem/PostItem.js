import { Link } from "react-router-dom";
import ButtonYellow from "../buttons/ButtonYellow";

const PostItem = ({ image, title, description }) => {
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
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{title}</h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 ">{description}</p>
          <ButtonYellow>Read more</ButtonYellow>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
