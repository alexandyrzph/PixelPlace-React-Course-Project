import { useUserAuth } from "../../context/UserAuthContext";
import { PostItem } from "..";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { BeatLoader } from "react-spinners";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import dots from "../../assets/dots.svg";

const Posts = () => {
    const { user } = useUserAuth();

    const [values, loading] = useCollection(
        query(collection(db, "Posts"), orderBy("timeStamp", "desc")),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    return (
        <div className="relative overflow-x-clip max-w-md px-1 md:px-0 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl mx-auto w-full h-screen py-16">
            {loading && (
                <div className="flex justify-center items-center h-screen bg-neu-white">
                    <BeatLoader size={"5rem"} color={"#1e1e1e"} />
                </div>
            )}
            <div className="masonry sm:masonry-sm md:masonry-md xl:masonry-lg">
                {values &&
                    values.docs.map((post) => (
                        <PostItem key={post.id} {...post.data()} postId={post.id} user={user} />
                    ))}
                {values?.empty && (
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
                src={dots}
                alt="Dots"
            />
            <img
                className="lg:block absolute top-100 -right-20 opacity-10 -z-10 w-[200px]"
                src={dots}
                alt="Dots"
            />
        </div>
    );
};

export default Posts;
