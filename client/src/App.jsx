import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/landingPage/landingPage";
import Nav from "./components/nav/nav";
import Home from "./pages/home/home";
import Detail from "./pages/detail/detail";
import CreateDriverForm from "./pages/createDriver/createDriver";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      {pathname !== "/" && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<CreateDriverForm />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
