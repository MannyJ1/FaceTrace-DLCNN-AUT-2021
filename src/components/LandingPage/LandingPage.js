import background from "../../assets/LandingPageBG.png";
import "./LandingPage.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="App-header"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="facetrace-lbl">Welcome to FaceTrace!</div>
      <Link to="/Upload">
        <AwesomeButton
          onPress={(next) => {
            myFunc();
          }}
          type="primary"
          style={myButtonStyle}
          ripple
        >
          Start Tracing
        </AwesomeButton>
      </Link>

      <Link to="/Detect">
        <AwesomeButton
          onPress={(next) => {
            myFunc();
          }}
          type="secondary"
          style={myButtonStyle}
        >
          Detect Faces
        </AwesomeButton>
      </Link>
    </div>
  );
};

function myFunc() {
  console.log("Hello");
}

const myButtonStyle = {
  width: "25vw",
  height: "5vh",
  fontSize: "100%",
};

export default LandingPage;
