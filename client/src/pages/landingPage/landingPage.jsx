import { Link } from "react-router-dom";
import "./landingPage.css";

const Landing = () => {
  return (
    <div className="pageLanding">
      <div className="conteinerLanding">
        <img src="./assets/flecha.png" className="imgLanding" />
        <Link to="/home">
          <button className="buttonLanding">Click here!</button>
        </Link>
      </div>
      <img src="./assets/Hamilton.png" alt="" className="imgHamilton" />
    </div>
  );
};

export default Landing;
