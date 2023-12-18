import { BACKEND_URL } from "../constants";
import "../styles/userCard.css";

const UserCard = (props) => {
  const { name, email, dateOfBirth, image } = props;

  return (
    <>
      <div className="user-card">
        <div className="user-card-head">
          <div className="user-card-img">
            <img src={BACKEND_URL + "/uploads/images/" + image} alt="user" />
          </div>
        </div>

        <div className="user-card-body">
          <div className="user-card-title">
            <span>{name}</span>
            <span className="user-card-caption">{email}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
