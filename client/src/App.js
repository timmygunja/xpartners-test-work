import { useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";
import { Button } from "@mui/material";
import "./styles/app.css";
import { useState } from "react";

export default function App() {
  const { isLoggedIn } = useAuth();
  const [clickRegister, setClickRegister] = useState(0);
  const [clickLogin, setClickLogin] = useState(0);

  const PrivateRoute = () => {
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    // return auth ? <Outlet /> : <Navigate to="/login" />;
    return isLoggedIn ? (
      <Outlet />
    ) : (
      <Content
        setClickLogin={setClickLogin}
        setClickRegister={setClickRegister}
      />
    );
  };

  return (
    <div className="App">
      <Header clickRegister={clickRegister} clickLogin={clickLogin} />

      <div className="App-content centered">
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<LoggedInText />} />
            <Route exact path="/account" element={<UserProfile />} />
            <Route exact path="/people" element={<UserList />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

const LoggedInText = () => {
  const { account } = useAuth();

  return (
    <div className="centered">
      Hey, {account.username}! I'm happy to let you know: you are authenticated!
    </div>
  );
};

const Content = (props) => (
  <div className="App-buttons">
    <button
      className="main-button"
      onClick={() => props.setClickRegister((prev) => prev + 1)}
    >
      Register
    </button>
    <button
      className="main-button"
      onClick={() => props.setClickLogin((prev) => prev + 1)}
    >
      Sign in
    </button>
  </div>
);
