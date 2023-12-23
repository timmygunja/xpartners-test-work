import { useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";

export default function App() {
  const { isLoggedIn } = useAuth();

  const PrivateRoute = () => {
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    // return auth ? <Outlet /> : <Navigate to="/login" />;

    return isLoggedIn ? <Outlet /> : <LoggedOutText />;
  };

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/account" element={<UserProfile />} />
        </Route>
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
