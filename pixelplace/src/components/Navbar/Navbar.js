import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

import { MdOutlineExplore } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { Transition } from "@tailwindui/react";

const Navbar = () => {
    const user = true;
    const [show, setShow] = useState(false);
    const container = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!container.current.contains(event.target)) {
                if (!show) return;
                setShow(false);
            }
        };

        window.addEventListener("click", handleOutsideClick);
        return () => window.removeEventListener("click", handleOutsideClick);
    }, [show, container]);

    return (
        <div className="bg-neu-white">
            <ul className="flex justify-between items-center max-w-md px-6 md:px-0 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl mx-auto w-full py-6">
                <li>
                    <Link
                        className="text-2xl font-logo tracking-wider text-[#2e2e2e] hover:text-black duration-200"
                        to="/"
                    >
                        <p>PixelPlace</p>
                    </Link>
                </li>
                <div className="flex items-center gap-2">
                    {user ? (
                        <>
                            <Link to="posts">
                                <li className="hover:-translate-y-[1px] bg-white text-xl hover:shadow-[2px_2px_0px_black] duration-100 cursor-pointer rounded-md border-black border-2">
                                    <MdOutlineExplore size={"1.5rem"} />
                                </li>
                            </Link>
                            <Link className="mr-4" to="post-create">
                                <li className="hover:-translate-y-[1px] bg-white text-xl hover:shadow-[2px_2px_0px_black] duration-100 cursor-pointer rounded-md border-black border-2">
                                    <AiOutlinePlus size={"1.5rem"} />
                                </li>
                            </Link>
                            <li>
                                <div ref={container} className="relative">
                                    <button
                                        className="menu focus:outline-none focus:shadow-solid "
                                        onClick={() => setShow(!show)}
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="https://play-lh.googleusercontent.com/8ID9RW2dLGPxai5r5W_c-JESdD2a_lyAfX0hncKq0bqLuFcC-qfstgTPfmtynR9jYg"
                                            alt="image"
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
                                        <div className="absolute z-[500] right-0 w-48 mt-1 bg-white rounded hover:shadow-[2px_2px_2px] border-2 border-neu-black duration-150">
                                            <Link to="/profile">
                                                <p className="block px-4 py-2 hover:bg-neu-yellow hover:text-neu-black duration-150">
                                                    Profile
                                                </p>
                                            </Link>
                                            <hr />
                                            <Link to="/api/logout">
                                                <p className="block px-4 py-2 hover:bg-neu-yellow hover:text-neu-black duration-75">
                                                    Logout
                                                </p>
                                            </Link>
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
                                    className="bg-neu-black text-neu-white hover:bg-black duration-150 px-4 py-3 rounded-3xl"
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
