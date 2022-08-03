import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { Transition } from "@tailwindui/react";
import { useUserAuth } from "../../context/UserAuthContext";

const Navbar = () => {
    const { user, logout } = useUserAuth();
    const [show, setShow] = useState(false);
    const container = useRef(null);
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        if (user) {
            const handleOutsideClick = (event) => {
                if (!container.current.contains(event.target)) {
                    if (!show) return;
                    setShow(false);
                }
            };

            window.addEventListener("click", handleOutsideClick);
            return () => window.removeEventListener("click", handleOutsideClick);
        }
    }, [user, show, container]);

    return (
        <div className="bg-neu-white w-full shadow-md">
            <ul className="flex justify-between items-center max-w-md px-2 md:px-0 md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl mx-auto w-full py-2">
                <li>
                    <Link
                        className="text-2xl font-logo tracking-wider text-[#2e2e2e] hover:text-black duration-200"
                        to="/"
                    >
                        <p>PixelPlace</p>
                    </Link>
                </li>
                <div className="flex justify-center items-center gap-2">
                    {user ? (
                        <>
                            <Link to="posts">
                                <li className="hover:-translate-y-[1px] bg-white text-xl hover:shadow-[2px_2px_0px_black] duration-100 cursor-pointer rounded-md border-black border-2">
                                    <MdOutlineExplore size={"1.8rem"} />
                                </li>
                            </Link>
                            <Link className="" to="post-create">
                                <li className="hover:-translate-y-[1px]  bg-white text-xl hover:shadow-[2px_2px_0px_black] duration-100 cursor-pointer rounded-md border-black border-2">
                                    <AiOutlinePlus size={"1.8rem"} />
                                </li>
                            </Link>
                            <li className="relative z-[1000]">
                                <div ref={container} className="relative">
                                    <button
                                        className="menu focus:outline-none focus:shadow-solid "
                                        onClick={() => setShow(!show)}
                                    >
                                        <img
                                            className="w-[35px] h-[35px] translate-y-[2px] bg-white items-center rounded-md border-2 border-neu-black"
                                            src={
                                                user.photoURL ??
                                                "https://firebasestorage.googleapis.com/v0/b/pixelplace-b8fac.appspot.com/o/1024px-Faenza-avatar-default-symbolic.svg.png?alt=media&token=986532b2-c109-4faf-b607-30ce2a1e1ff8"
                                            }
                                            alt="user"
                                        />
                                    </button>
                                    <Transition
                                        show={show}
                                        enter="transition ease-out duration-100 transform"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="transition ease-in duration-75 transform"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <div className="absolute right-0 max-w-fit mt-1 bg-white rounded hover:shadow-[2px_2px_2px] border-2 border-neu-black duration-150">
                                            <div>
                                                <p className="block px-4 py-2 hover:bg-neu-yellow hover:text-neu-black duration-150 truncate">
                                                    Hello, {user.email}!
                                                </p>
                                                <hr />
                                            </div>
                                            <Link to="/profile">
                                                <p className="block px-4 py-2 hover:bg-neu-yellow hover:text-neu-black duration-150">
                                                    Profile
                                                </p>
                                            </Link>
                                            <hr />
                                            <button
                                                onClick={logoutHandler}
                                                className="text-left w-full"
                                            >
                                                <p className="block px-4 py-2 hover:bg-neu-yellow hover:text-neu-black duration-75">
                                                    Logout
                                                </p>
                                            </button>
                                        </div>
                                    </Transition>
                                </div>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link className="text-neu-black duration-100" to="/login">
                                    Sign In
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="bg-neu-black text-neu-white hover:bg-black duration-150 px-4 py-2 rounded-3xl"
                                    to="/register"
                                >
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    )}
                </div>
            </ul>
        </div>
    );
};

export default Navbar;
