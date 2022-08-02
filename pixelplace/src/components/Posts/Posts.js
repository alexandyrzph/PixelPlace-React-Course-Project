import { useEffect, useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { PostItem } from "..";
import { BeatLoader } from "react-spinners";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const Posts = () => {
    const { user } = useUserAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const q = query(collection(db, "Posts"), orderBy("timeStamp", "desc"));
        onSnapshot(
            q,
            (snapshot) => {
                const posts = snapshot.docs.map((post) => ({ postId: post.id, ...post.data() }));
                setPosts(posts);
            },
            (err) => console.log(err),
            () => setIsLoading(false)
        );
    }, []);

    if (!isLoading) {
        return (
            <div className="relative max-w-md px-1 md:px-0 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl mx-auto w-full h-screen py-16">
                <div className="masonry sm:masonry-sm md:masonry-md xl:masonry-lg">
                    {posts && posts.length > 0 ? (
                        posts.map((post) => <PostItem key={post.postId} {...post} user={user} />)
                    ) : (
                        <div>
                            <h2 className="text-[40px] text-center font-neu absolute top-[20%] left-0 right-0">
                                No posts found
                            </h2>
                            <Link to="/post-create">
                                <button className="absolute font-mono top-[30%] left-[10%] right-[10%] sm:left-[30%] sm:right-[30%] hover:shadow-neu-shadow hover:-translate-y-1 duration-200 border-2 border-neu-black px-6 py-3 rounded-lg bg-neu-yellow font-bold">
                                    Create Post
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
                <img
                    className="lg:block absolute top-5 -left-20 opacity-10 -z-10 w-[200px]"
                    src="https://firebasestorage.googleapis.com/v0/b/pixelplace-b8fac.appspot.com/o/26432.svg?alt=media&token=17971521-81ad-4e86-bd5b-f0051d4c5a13"
                    alt="Dots"
                />
                <img
                    className="lg:block absolute top-100 -right-20 opacity-10 -z-10 w-[200px]"
                    src="https://firebasestorage.googleapis.com/v0/b/pixelplace-b8fac.appspot.com/o/26432.svg?alt=media&token=17971521-81ad-4e86-bd5b-f0051d4c5a13"
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
