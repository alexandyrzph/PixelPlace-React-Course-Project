import { Routes, Route } from "react-router-dom";
import PostEditForm from "./components/Forms/PostEditForm";
import SignIn from "./components/Forms/SignIn";
import SignUp from "./components/Forms/SignUp";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Posts from "./pages/Posts/Posts";

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
          <Route path="post-create" element={<SignIn />} />
          <Route path="post/:postId" element={<SignIn />} />
          <Route path="post-edit/:postId" element={<PostEditForm />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
