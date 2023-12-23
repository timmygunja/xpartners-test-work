import { Fragment, useEffect, useState } from "react";
import {
  AppBar,
  IconButton,
  Avatar,
  Popover,
  List,
  ListSubheader,
  ListItemButton,
} from "@mui/material";
import OnlineIndicator from "./OnlineIndicator";
import AuthModal from "./AuthModal";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Header(props) {
  const { isLoggedIn, account, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const [popover, setPopover] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [register, setRegister] = useState(false);

  const openPopover = (e) => {
    setPopover(true);
    setAnchorEl(e.currentTarget);
  };

  const closePopover = () => {
    setPopover(false);
    setAnchorEl(null);
  };

  const clickLogin = () => {
    setRegister(false);
    setAuthModal(true);
    closePopover();
  };

  const clickRegister = () => {
    setRegister(true);
    setAuthModal(true);
    closePopover();
  };

  useEffect(() => {
    props.clickLogin !== 0 && clickLogin();
  }, [props.clickLogin]);

  useEffect(() => {
    props.clickRegister !== 0 && clickRegister();
  }, [props.clickRegister]);

  return (
    <AppBar className="header" position="static">
      <a href="/">
        <h1>XPartners</h1>
      </a>

      <div className="header-mainbar">
        <Link to={"/"} className="header-link centered">
          <p>Home</p>
        </Link>
        <Link to={"/people"} className="header-link centered">
          <p>People</p>
        </Link>
        <Link to={"/account"} className="header-link centered">
          <p>Account</p>
        </Link>
      </div>

      <div className="header-popover">
        <IconButton onClick={openPopover}>
          <OnlineIndicator online={isLoggedIn}>
            <Avatar
              src={account?.username || ""}
              alt={account?.username || ""}
            />
          </OnlineIndicator>
        </IconButton>

        <Popover
          anchorEl={anchorEl}
          open={popover}
          onClose={closePopover}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <List style={{ minWidth: "120px" }}>
            <ListSubheader style={{ textAlign: "center" }}>
              Hello, {isLoggedIn ? account.username : "Guest"}
            </ListSubheader>

            {isLoggedIn ? (
              <ListItemButton onClick={logout}>Logout</ListItemButton>
            ) : (
              <Fragment>
                <ListItemButton onClick={clickLogin}>Login</ListItemButton>
                <ListItemButton onClick={clickRegister}>
                  Register
                </ListItemButton>
              </Fragment>
            )}
          </List>
        </Popover>

        <AuthModal
          open={authModal}
          close={() => setAuthModal(false)}
          isRegisterMode={register}
          toggleRegister={() => setRegister((prev) => !prev)}
        />
      </div>
    </AppBar>
  );
}
