import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { MdOutlineExplore } from "react-icons/md";

const Navbar = () => {
  const user = true;
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
                  <AiOutlinePlus size={"1.5rem"}/>
                </li>
              </Link>
              <li>
                <div className="relative flex-col -space-x-1 overflow-hidden">
                  <img
                    className="border-2 border-neu-black cursor-pointer inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="avatar"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
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
