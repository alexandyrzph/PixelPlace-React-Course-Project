import { PostItem } from "../../components";
import Dots from "../../assets/26432.svg";

import imageOne from "../../assets/postImages/1.jpg";
import imageTwo from "../../assets/postImages/2.jpg";
import imageThree from "../../assets/postImages/3.jpg";
import imageFour from "../../assets/postImages/4.jpg";
import imageFive from "../../assets/postImages/5.jpg";
const Posts = () => {
  const items = [
    {
      title: "Art gallery",
      description: "Art pic from unsplash",
      image: imageOne,
    },
    {
      title: "Art gallery",
      description: "Art pic from unsplash",
      image: imageTwo,
    },
    {
      title: "Art gallery",
      description: "Art pic from unsplash",
      image: imageThree,
    },
    {
      title: "Art gallery",
      description: "Art pic from unsplash",
      image: imageFour,
    },
    {
      title: "Art gallery",
      description: "Art pic from unsplash",
      image: imageFive,
    },
  ];
  return (
    <div className="relative max-w-md px-1 md:px-0 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl mx-auto w-full py-16">
      <div className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg">
        {items.map((item) => (
          <PostItem {...item} />
        ))}
      </div>
      <img
        className="hidden lg:block absolute top-5 -left-20 opacity-10 -z-10 w-[200px]"
        src={Dots}
        alt="Dots"
      />
      <img
        className="hidden lg:block absolute bottom-5 -right-20 opacity-10 -z-10 w-[200px]"
        src={Dots}
        alt="Dots"
      />
    </div>
  );
};

export default Posts;
