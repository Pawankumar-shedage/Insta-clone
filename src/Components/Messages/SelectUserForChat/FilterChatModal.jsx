import React, { useEffect, useState } from "react";
import "./FilterChat.css";
import { useFirebase } from "../../../FirebaseSetUp/FirebaseContext";

export const FilterChatModal = ({ users }) => {
  const { getProfilePhoto } = useFirebase();

  const [searchInput, setSearchInput] = useState("");
  const [dp, setDp] = useState("");

  //   to get dp of users, whenever this modal is opened.
  useEffect(() => {
    // setUserProfilePhoto();
  }, []);

  const setFilteredUsers = async (users, inputValue) => {
    const filteredUsers = users.filter((user) => {
      console.log(inputValue);
      return (
        user.fullName.toLowerCase().includes(inputValue) ||
        user.username.toLowerCase().includes(inputValue)
      );
    });
    console.log("filteredUsers", filteredUsers);
  };

  const setUserProfilePhoto = async (userId) => {
    const dp = await getProfilePhoto(userId);
    setDp(dp);
  };

  const handleSearchInput = (e) => {
    const inputValue = e.target.value.toLowerCase(); //send input directly to filte() becase setUpdate is async, as filter() is called immediately before latest state on input is updated by setInput().
    setSearchInput(inputValue);
    setFilteredUsers(users, inputValue);
  };

  return (
    <div className="filterchat-container">
      <div className="fcs-header">
        <input
          type="search"
          //   ref={search}
          value={searchInput}
          onChange={handleSearchInput}
        />
      </div>
      <div className="fc-users">
        {users.map((user) => {
          return (
            <div key={user.uid || user.author_uid}>
              <div className="fcuser-profilephoto">
                <img
                  src={dp ? dp : "/assets/Images/User i/user.png"}
                  alt="Dp"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div className="fcuser-fullName">{user.fullName}</div>
              <div className="fcuser-username">{user.username}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
