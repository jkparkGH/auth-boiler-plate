import "./assets/scss/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage";
import LoginPage from "./components/views/LoginPage";
import RegisterPage from "./components/views/RegisterPage";
import NavBar from "./components/views/NavBar";
import HocAuth from "./components/hoc/auth";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={HocAuth(LandingPage, null, true)} />
          <Route path="/login" component={HocAuth(LoginPage, false)} />
          <Route path="/register" component={HocAuth(RegisterPage, false)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
