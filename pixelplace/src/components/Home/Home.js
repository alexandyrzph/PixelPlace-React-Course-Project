import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import HomeImg from "../../assets/homeImg.svg";
import dots from "../../assets/dots.svg";
const Home = () => {
    const { user } = useUserAuth();
    return (
        <div>
            <div className="flex relative z-20 justify-center 2xl:justify-between w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-3xl xl:max-w-3xl overflow-ellipsis 2xl:max-w-7xl mx-auto h-screen pt-[30%] md:pt-[10%]">
                <div className="relative">
                    <div className="text-center md:text-left mb-12 x-trans">
                        <p className="text-5xl text-center 2xl:text-left md:text-6xl mb-6 font-neu font-light">
                            Wonder where <br /> to share
                            <span className="font-extrabold">
                                {" "}
                                your{" "}
                                <span className="text-neu-white text-stroke bg-neu-yellow">
                                    art?
                                </span>
                            </span>
                        </p>
                        <p className="text-xl mb-10 font-neu tracking-wide">
                            You are at the right place
                        </p>
                    </div>
                    <div className="relative flex lg:flex-col gap-3 justify-center w-full items-center">
                        <Link className="w-full" to="/posts">
                            <button className="relative font-mono flex-grow-1 w-full lg:w-full hover:shadow-neu-shadow hover:-translate-y-1 duration-200 border-2 border-neu-black px-6 py-3 rounded-sm bg-neu-yellow font-bold">
                                Explore Art
                            </button>
                        </Link>
                        {!user ? (
                            <Link className="w-full" to="/register">
                                <button className="relative font-mono flex-grow-1 w-full lg:w-full hover:shadow-neu-shadow hover:-translate-y-1 duration-200 border-2 border-neu-black px-6 py-3 rounded-sm bg-white font-bold">
                                    Get Started
                                </button>
                            </Link>
                        ) : (
                            <Link className="w-full" to="/post-create">
                                <button className="relative font-mono flex-grow-1 w-full lg:w-full hover:shadow-neu-shadow hover:-translate-y-1 duration-200 border-2 border-neu-black px-6 py-3 rounded-sm bg-white font-bold">
                                    Create Post
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
                <img
                    className="hidden 2xl:block absolute right-20 -z-20 w-[600px] xl:w-[600px]"
                    src={HomeImg}
                    alt="homeimg"
                />
                <img
                    className="hidden lg:block absolute mt-80 -left-60  -z-20 w-[250px]"
                    src={dots}
                    alt="homeimg"
                />
                <img
                    className="hidden lg:block absolute mb-80 right-20  -z-20 w-[100px]"
                    src={dots}
                    alt="homeimg"
                />
            </div>
        </div>
    );
};

export default Home;
