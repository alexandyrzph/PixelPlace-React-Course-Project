import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase";
import PostItem from "../PostItem/PostItem";

const Profile = () => {
    const { user } = useUserAuth();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const q = query(collection(db, "Posts"), where("ownerId", "==", user.uid));
        onSnapshot(
            q,
            (snapshot) => {
                const posts = snapshot.docs.map((post) => ({ postId: post.id, ...post.data() }));
                setPosts(posts);
            },
            (err) => console.log(err)
        );
    }, [user]);

    return (
        <div>
            <div className="flex flex-col font-mono gap-4 relative z-20 w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-3xl xl:max-w-3xl 2xl:max-w-7xl mx-auto h-screen pt-[0%] md:pt-[3%]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <img
                        className="border-2 border-neu-black cursor-pointer inline-block w-[300px] h-[300px] object-cover object-center rounded-xl hover:shadow-neu-shadow duration-75"
                        src={user.photoURL}
                        alt=""
                    />
                    <div>
                        <h1 className="text-3xl">Username: {user.displayName}</h1>
                        <h2 className="text-2xl mt-1">Email: {user.email}</h2>
                    </div>
                </div>
                <h2 className="text-4xl mb-4 mt-4 font-bold">Your Posts:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <PostItem key={post.postId} {...post} user={user} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
