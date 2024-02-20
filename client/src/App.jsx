import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landingPage/landingPage";
import Nav from "./components/nav/nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
