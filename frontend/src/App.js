import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Landingpage from "./screens/LandingPage/Landingpage";
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import UpdateNote from "./screens/UpdateNote/UpdateNote";
import { useState } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main className="App">
        <Route path="/" exact component={Landingpage} />
        <Route path="/register" exact component={RegisterScreen} />
        <Route path="/login" exact component={LoginScreen} />
        <Route path="/createnote" exact component={CreateNote} />
        <Route path="/note/:id" exact component={UpdateNote} />
        <Route
          path="/mynotes"
          exact
          component={() => <MyNotes search={search} />}
        />
        {/* <Landingpage /> */}
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
