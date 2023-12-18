import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "../utils/axios";
import UserCard from "./UserCard";
import "../styles/userList.css";

const UserList = () => {
  // const { isLoggedIn, account, logout } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("/people", {});

        setUsers(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  return (
    <>
      {users.length === 0 ? (
        <h3>No users found in database</h3>
      ) : (
        <div className="user-list">
          {users.map((user) => {
            return (
              <UserCard
                key={user.id}
                name={user.username}
                email={user.email}
                dateOfBirth={user.dateOfBirth}
                image={user.image}
              />
            );
          })}
        </div>
      )}
      <div></div>
    </>
  );
};

export default UserList;
