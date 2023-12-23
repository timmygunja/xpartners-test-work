import { Button, CircularProgress, TextField } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import "../styles/userProfile.css";
import ImageUpload from "./ImageUpload";
import { useState } from "react";
import { BACKEND_URL } from "../constants";

const UserProfile = (props) => {
  const { account, edit } = useAuth();
  let {
    username,
    password,
    password_unsafe,
    email,
    dateOfBirth,
    gender,
    image,
  } = account;

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const textFieldSx = { mx: 4, my: 0.5 };

  const [formData, setFormData] = useState({
    username: username,
    password: password,
    image: image,
    newUsername: username,
    newPassword: password_unsafe,
    // newImage: image,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clickSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      await edit(formData);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  const fileUploadHandler = (pickedFile) => {
    image = pickedFile;
    setFormData((prev) => ({ ...prev, ["newImage"]: image }));
  };

  return (
    <div className="profile-container centered">
      <div className="profile-card">
        <h3 className="profile-card-title">Profile Info</h3>
        <div className="profile-card-head">
          <ImageUpload
            id="newImage"
            name="newImage"
            value={
              formData["newImage"] || BACKEND_URL + "/uploads/images/" + image
            }
            center
            onInput={fileUploadHandler}
            required
          />
        </div>
        <div className="profile-card-body">
          <div className="centered">
            <TextField
              label="Username"
              name="newUsername"
              type="text"
              value={formData["newUsername"]}
              onChange={handleChange}
              sx={textFieldSx}
              required
            />
          </div>
          <div className="centered">
            <TextField
              label="Password"
              name="newPassword"
              type="text"
              value={formData["newPassword"]}
              onChange={handleChange}
              sx={textFieldSx}
              required
            />
          </div>
          <div className="centered">
            <TextField
              label="Email"
              name="email"
              type="email"
              value={email}
              sx={textFieldSx}
              inputProps={{ readOnly: true }}
              disabled
            />
          </div>
          <div className="centered">
            <TextField
              label="Age"
              name="DateOfBirth"
              type="text"
              value={getAge(dateOfBirth)}
              sx={textFieldSx}
              inputProps={{ readOnly: true }}
              disabled
            />
          </div>
          <div className="centered">
            <TextField
              label="Gender"
              name="gender"
              type="text"
              value={gender}
              sx={textFieldSx}
              inputProps={{ readOnly: true }}
              disabled
            />
          </div>
          <div className="centered">
            {error && <span className="error">{error}</span>}
          </div>
        </div>

        <h3 className="profile-card-submit centered">
          {loading ? (
            <center>
              <CircularProgress color="inherit" />
            </center>
          ) : (
            <Button onClick={clickSubmit} type={"submit"} variant="outlined">
              Сохранить изменения
            </Button>
          )}
        </h3>
      </div>
    </div>
  );
};

export default UserProfile;
