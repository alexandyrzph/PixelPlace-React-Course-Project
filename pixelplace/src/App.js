import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Posts from "./pages/Posts/Posts";
import "react-toastify/dist/ReactToastify.css";

import {
    Navbar,
    Profile,
    PostCreate,
    PostDetails,
    PostEdit,
    SignIn,
    SignUp,
    ProtectedRoute,
} from "./components/index";
import { useUserAuth } from "./context/UserAuthContext";
import { BeatLoader } from "react-spinners";

function App() {
    const { isLoading } = useUserAuth();
    console.log(isLoading);
    if (!isLoading) {
        return (
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="posts" element={<Posts />} />
                    <Route path="register" element={<SignUp />} />
                    <Route path="login" element={<SignIn />} />
                    <Route
                        path="profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="post-create"
                        element={
                            <ProtectedRoute>
                                <PostCreate />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="posts/:postId" element={<PostDetails />} />
                    <Route
                        path="post-edit/:postId"
                        element={
                            <ProtectedRoute>
                                <PostEdit />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        );
    } else {
        return (
            <div className="flex justify-center items-center h-screen bg-neu-white">
                <BeatLoader size={"5rem"} color={"#1e1e1e"} />
            </div>
        );
    }
}

export default App;
