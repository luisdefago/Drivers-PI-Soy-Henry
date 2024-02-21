import { Link } from "react-router-dom";
import "./landingPage.css";

const Landing = () => {
  return (
    <div className="pageLanding">
      <div className="conteinerLanding">
        <img src="./assets/flecha.png" className="imgLanding" />
        <Link to="/home">
          <button className="buttonLanding">Haz click aquí</button>
        </Link>
      </div>
      <img src="./assets/Hamilton.png" alt="" className="imgHamilton" />
    </div>
  );
};

export default Landing;
