import Registration from "./pages/registration";
import {Routes,Route} from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Message from "./pages/message";

function App() {
  return (
    <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/message" element={<Message />} />
    </Routes>
  );
}

export default App;
