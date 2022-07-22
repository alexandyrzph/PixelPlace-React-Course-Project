import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const Navbar = () => {
  const user = true;
  return (
    <div className="bg-neu-white">
      <ul className="flex justify-between items-center max-w-md px-6 md:px-0 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl mx-auto w-full py-6 font-bold">
        <li>
          <Link className="text-2xl font-logo tracking-wider text-gray-600 hover:text-black duration-200" to="/">
            <p>PixelPlace</p>
          </Link>
        </li>
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link className="mr-2" to="posts">
                <li className="font-thin hover:font-bold duration-150">Discover</li>
              </Link>
              <Link to="post-create">
                <li className="hover:-translate-y-[1px] text-xl hover:shadow-[2px_2px_0px_black] duration-100 cursor-pointer rounded-md bg-neu-white  border-black border-2">
                  <AiOutlinePlus />
                </li>
              </Link>
              <li>
                <div className="flex -space-x-1 overflow-hidden">
                  <img
                    className="cursor-pointer inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
              </li>
            </>
          ) : (
            <li>
              <Link className="bg-neu-black text-neu-white px-4 py-3 rounded-3xl" to="/register">
                Sign Up
              </Link>
            </li>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
