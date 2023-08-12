import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Landingpage from "./screens/LandingPage/Landingpage";
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="App">
        <Route path="/" exact component={Landingpage} />
        <Route path="/register" exact component={RegisterScreen} />
        <Route path="/login" exact component={LoginScreen} />
        <Route path="/mynotes" exact component={MyNotes} />
        {/* <Landingpage /> */}
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
