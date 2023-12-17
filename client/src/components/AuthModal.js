import { Fragment, useState } from "react";
import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import ImageUpload from "./ImageUpload";
import "../styles/index.css";

const textFieldSx = { mx: 2, my: 0.5 };

export default function AuthModal({
  open,
  close,
  isRegisterMode,
  toggleRegister,
}) {
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clickSubmit = async () => {
    setLoading(true);
    setError("");

    console.log(formData);

    try {
      isRegisterMode ? await register(formData) : await login(formData);
      close();
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  const disabledLoginButton = !formData["username"] || !formData["password"];
  const disabledRegisterButton = !formData["username"] || !formData["password"];

  return (
    <Dialog open={open} onClose={close}>
      {isRegisterMode ? (
        <RegisterForm
          formData={formData}
          handleChange={handleChange}
          setFormData={setFormData}
        />
      ) : (
        <LoginForm formData={formData} handleChange={handleChange} />
      )}

      {error && <span className="error">{error}</span>}

      {loading ? (
        <center>
          <CircularProgress color="inherit" />
        </center>
      ) : (
        <Button
          onClick={clickSubmit}
          disabled={
            isRegisterMode ? disabledRegisterButton : disabledLoginButton
          }
        >
          {isRegisterMode ? "Register" : "Login"}
        </Button>
      )}

      <Button onClick={toggleRegister}>
        {isRegisterMode
          ? "I already have an account"
          : "I don't have an account"}
      </Button>
    </Dialog>
  );
}

function LoginForm({ formData, handleChange }) {
  return (
    <Fragment>
      <DialogTitle>Login to your account</DialogTitle>

      <TextField
        label="Username"
        name="username"
        type="text"
        value={formData["username"] || ""}
        onChange={handleChange}
        variant="filled"
        sx={textFieldSx}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData["password"] || ""}
        onChange={handleChange}
        variant="filled"
        sx={textFieldSx}
        required
      />
    </Fragment>
  );
}

function RegisterForm({ formData, handleChange, setFormData }) {
  let image;

  const fileUploadHandler = (pickedFile) => {
    image = pickedFile;
    setFormData((prev) => ({ ...prev, ["image"]: image }));
  };

  return (
    <Fragment>
      <DialogTitle>Create a new account</DialogTitle>

      <TextField
        label="Username"
        name="username"
        type="text"
        value={formData["username"] || ""}
        onChange={handleChange}
        variant="filled"
        sx={textFieldSx}
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData["email"] || ""}
        onChange={handleChange}
        variant="filled"
        sx={textFieldSx}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData["password"] || ""}
        onChange={handleChange}
        variant="filled"
        sx={textFieldSx}
        required
      />
      {/* <DatePicker
        label="Date of Birth"
        name="dateOfBirth"
        value={formData["dateOfBirth"] || ""}
        onChange={handleChange}
        required
      /> */}
      <input
        type="date"
        label="Date of Birth"
        name="dateOfBirth"
        value={formData["dateOfBirth"] || ""}
        onChange={handleChange}
        required
      />
      <ImageUpload
        id="image"
        name="image"
        value={formData["image"] || ""}
        center
        onInput={fileUploadHandler}
        // onChange={handleChange}
        required
      />
    </Fragment>
  );
}
