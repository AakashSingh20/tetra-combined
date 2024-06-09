import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import Chats from "./Pages/Chats";
import { Login } from "./Components/Authentication/Login";
import Test from "./Components/Test";

function App() {
  if (!localStorage.getItem("userInfo")) {
    return <Home />;
  }
  return (
    <>
      {/* <BrowserRouter> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="chats" element={<Chats />} />
        <Route exact path="/test" element={<Test />} />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
