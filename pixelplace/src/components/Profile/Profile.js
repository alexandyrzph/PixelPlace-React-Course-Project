import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { BeatLoader } from "react-spinners";
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase";
import PostItem from "../Posts/PostItem/PostItem";

const Profile = () => {
    const { user } = useUserAuth();
    const [values, loading] = useCollection(
        query(collection(db, "Posts"), where("ownerId", "==", user.uid)),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    return (
        <div>
            <div className="flex flex-col font-mono gap-4 relative z-20 w-full max-w-xs md:max-w-xl lg:max-w-3xl xl:max-w-3xl 2xl:max-w-7xl mx-auto h-screen pt-4 md:pt-[3%]">
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
                <h2 className="text-4xl mb-2 mt-6 font-bold">Your Posts:</h2>
                <div className="masonry sm:masonry-sm md:masonry-md xl:masonry-lg">
                    {values &&
                        values.docs.map((post) => (
                            <PostItem key={post.id} {...post.data()} postId={post.id} user={user} />
                        ))}
                    {loading && (
                        <div className="flex justify-center items-center h-screen bg-neu-white">
                            <BeatLoader size={"5rem"} color={"#1e1e1e"} />
                        </div>
                    )}
                    {values?.empty && <p className="text-2xl">You don't have any posts yet</p>}
                </div>
            </div>
        </div>
    );
};

export default Profile;
