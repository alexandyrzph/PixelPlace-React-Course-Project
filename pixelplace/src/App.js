import { Routes, Route } from "react-router-dom";
import {
    Navbar,
    Profile,
    PostCreate,
    PostDetails,
    PostEdit,
    SignIn,
    SignUp,
    ProtectedRoute,
    Home,
    Posts,
    NotFound,
} from "./components/index";
import { useUserAuth } from "./context/UserAuthContext";
import { BeatLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const { isLoading } = useUserAuth();

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
                        path="posts/:postId/edit"
                        element={
                            <ProtectedRoute>
                                <PostEdit />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col -mt-10 justify-center items-center h-screen bg-neu-white">
                <h1 className="font-logo text-[50px] md:text-[70px]">
                    Pixel<span className="text-stroke text-neu-white">Place</span>
                </h1>
                <BeatLoader size={"5rem"} color={"#1e1e1e"} />
            </div>
        );
    }
}

export default App;
