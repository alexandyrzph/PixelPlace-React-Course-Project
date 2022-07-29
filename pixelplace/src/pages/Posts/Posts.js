import { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { PostItem } from "../../components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Dots from "../../assets/26432.svg";
import { BeatLoader } from "react-spinners";

const Posts = () => {
    const { user } = useUserAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    useState(() => {
        setIsLoading(true);
        getDocs(collection(db, "Posts"))
            .then((snapshot) => {
                let posts = [];
                snapshot.forEach((doc) => {
                    posts.push({ ...doc.data(), postId: doc.id });
                    setIsLoading(false);
                });
                setPosts((prev) => posts);
            })
            .catch((err) => console.log(err.message));
    }, []);

    if (!isLoading) {
        return (
            <div className="relative max-w-md px-1 md:px-0 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl mx-auto w-full h-screen py-16">
                <div className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg">
                    {posts.map((post) => (
                        <PostItem key={post.postId} {...post} user={user} />
                    ))}
                </div>
                <img
                    className="hidden lg:block absolute top-5 -left-20 opacity-10 -z-10 w-[200px]"
                    src={Dots}
                    alt="Dots"
                />
                <img
                    className="hidden lg:block absolute top-100 -right-20 opacity-10 -z-10 w-[200px]"
                    src={Dots}
                    alt="Dots"
                />
            </div>
        );
    } else {
        return (
            <div className="flex justify-center items-center h-screen bg-neu-white">
                <BeatLoader size={"5rem"} color={"#1e1e1e"} />
            </div>
        );
    }
};

export default Posts;
