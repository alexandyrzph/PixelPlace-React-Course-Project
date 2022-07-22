import { Routes, Route } from "react-router-dom";
import SignIn from "./components/Forms/SignIn";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="login" element={<SignIn />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
