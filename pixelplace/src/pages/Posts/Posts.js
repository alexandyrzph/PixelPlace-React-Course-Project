import { PostItem } from "../../components";
import Dots from "../../assets/26432.svg";
import { useUserAuth } from "../../context/UserAuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";

const Posts = () => {
    const { user } = useUserAuth();
    const [posts, setPosts ] = useState([]);
    useState(() => {
    console.log(posts);
        getDocs(collection(db, "Posts"))
            .then((snapshot) => {
                let posts = [];
                snapshot.forEach((doc) => posts.push(doc.data()));
                setPosts(prev => posts);
            })
            .catch((err) => console.log(err.message));
    }, []); 
    console.log(posts);

    return (
        <div className="relative max-w-md px-1 md:px-0 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl mx-auto w-full h-screen py-16">
            <div className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg">
                {posts.map((post) => (
                    <PostItem key={post.uid} {...post} user={user} />
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
};

export default Posts;
