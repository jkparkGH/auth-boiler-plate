import { React } from "react";
import { withRouter } from "react-router-dom";

function LandingPage({ history }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh"
      }}
    >
      <h2
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        LandingPage
      </h2>
    </div>
  );
}

export default withRouter(LandingPage);
