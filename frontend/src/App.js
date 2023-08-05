import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Landingpage from "./screens/LandingPage/Landingpage";
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="App">
        <Route path="/" exact component={Landingpage} />
        <Route path="/mynotes" exact component={() => <MyNotes />} />
        {/* <Landingpage /> */}
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
