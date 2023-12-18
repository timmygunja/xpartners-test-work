import { useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";

export default function App() {
  const { isLoggedIn } = useAuth();

  const PrivateRoute = () => {
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    // return auth ? <Outlet /> : <Navigate to="/login" />;

    return isLoggedIn ? <LoggedInText /> : <LoggedOutText />;
  };

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route exact path="/" element={<PrivateRoute />}></Route>
        <Route exact path="/people" element={<UserList />} />
      </Routes>
    </div>
  );
}

const LoggedInText = () => {
  const { account } = useAuth();

  return (
    <p>
      Hey, {account.username}! I'm happy to let you know: you are authenticated!
    </p>
  );
};

const LoggedOutText = () => (
  <p>Don't forget to start your backend server, then authenticate yourself.</p>
);
