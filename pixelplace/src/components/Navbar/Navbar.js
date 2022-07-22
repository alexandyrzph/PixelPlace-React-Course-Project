import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-neu-white">
      <ul className="flex justify-between">
        <li>
          <Link to="/">PixelPlace</Link>
        </li>
        <div className="flex gap-4">
          <li>
            <Link to="/register">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
