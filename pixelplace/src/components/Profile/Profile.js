import { useUserAuth } from "../../context/UserAuthContext";

const Profile = () => {
    const { user } = useUserAuth();
    const likes = 4;
    return (
        <div>
            <div className="flex flex-col font-mono gap-4 relative z-20 w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-3xl xl:max-w-3xl 2xl:max-w-7xl mx-auto h-screen pt-[0%] md:pt-[5%]">
                <div className="flex gap-4">
                    <img
                        className="border-2 border-neu-black cursor-pointer inline-block w-[300px] h-[300px] object-cover object-center rounded-xl hover:shadow-neu-shadow duration-75"
                        src={user.photoURL}
                        alt=""
                    />
                    <div>
                        <h1 className="text-3xl">Username: {user.displayName}</h1>
                        <h2 className="text-2xl mt-1">Email: {user.email}</h2>
                        <p className="text-xl mt-4">Total likes: {likes}</p>
                    </div>
                </div>
                <div className="w-1/2">
                    <h2 className="text-4xl font-bold">Your Posts:</h2>
                    
                </div>
            </div>
        </div>
    );
};

export default Profile;
