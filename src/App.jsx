/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useFirebase } from "./FirebaseSetUp/FirebaseContext";

function App() {
  // eslint-disable-next-line no-unused-vars
  // getting firebase properties
  const { addUser, getUser, uploadProfilePhotos } = useFirebase();

  // add fields
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    profileImg: "",
    displayName: "",
    bio: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    console.log(userData);
  };

  const addUserData = (e) => {
    e.preventDefault();
    addUser(userData);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadProfilePhotos(file);
    }
    const url = await uploadProfilePhotos(file);
    console.log("This url", url);
  };

  const getuserData = async () => {
    const data = await getUser();
    Object.entries(data).forEach(([key, value]) => {
      console.log(key, value);
    });
  };

  return (
    <>
      <h1>My Insta clone</h1>
      <form onSubmit={addUserData}>
        <div>
          <label htmlFor="username">User Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="profile-img">Profile Img</label>
          <input
            type="text"
            id="profileImg"
            name="profileImg"
            value={userData.profileImg}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={userData.displayName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <input
            type="text"
            id="bio"
            name="bio"
            value={userData.bio}
            onChange={handleInputChange}
          />
        </div>

        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>

      <button onClick={getuserData}>Get user data</button>
    </>
  );
}

export default App;
