import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Posts from "./pages/Posts/Posts";

import {
  Navbar,
  Profile,
  PostCreate,
  PostDetails,
  PostEdit,
  SignIn,
  SignUp,
} from "./components/index";

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="posts" element={<Posts />} />
          <Route path="register" element={<SignUp />} />
          <Route path="login" element={<SignIn />} />
          <Route path="profile" element={<Profile />} />
          <Route path="post-create" element={<PostCreate />} />
          <Route path="post/:postId" element={<PostDetails />} />
          <Route path="post-edit/:postId" element={<PostEdit />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
