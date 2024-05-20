/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useFirebase } from "../FirebaseSetUp/FirebaseContext";
// style
import "/src/Styles/Login/LoginPage.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Register } from "./Register";
import { Footer } from "../Components/Common/Footer/Footer";
import { GetTheApp } from "../Components/Common/Footer/GetTheApp";
import { useAuth } from "../AuthContext/AuthProvider";
import { LoadingScreen } from "../Components/Common/Loading-Splash Screen/LoadingScreen";
import {
  browserSessionPersistence,
  setPersistence,
  signOut,
} from "firebase/auth";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isPasswordFocused, setPasswordFocus] = useState(false);

  // Firebase 🦺
  const {
    logInUser,
    getUser: getUserData,
    updateUserInFirestore,
    auth,
  } = useFirebase();

  // auth provider
  const { handleAuthStateChange } = useAuth();

  // redirect
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // **Main

  let loginTime = null;

  let logoutTimer;

  const startLogoutTimer = () => {
    const logoutTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    console.log("Time", logoutTime);

    logoutTimer = setTimeout(() => {
      signOut(auth)
        .then(() => {
          console.log("User automatically logged out after 24 hours.");
        })
        .catch((error) => {
          console.error("Error logging out:", error);
        });
    }, logoutTime);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const user = await logInUser(formData.email, formData.password);
      if (user) {
        // User is authenticated, fetch additional data from Firestore
        console.log(user);

        // Updating "user uid" in users collection
        const userId = user.uid;
        updateUserInFirestore(userId);

        const userData = await getUserData();

        if (userData) {
          console.log("User authenticated:", user.uid);
          // console.log("User data from Firestore:", userData);
          // Now you have both authentication data and additional user data

          // Providing user for all components.
          handleAuthStateChange(user);
          // navigate
          navigate("/home");
        } else {
          console.error("User data not found in Firestore");
          // Handle the case where user data is not found
        }
      }

      // Setting login window ()
      if (logoutTimer) {
        // If the timer is already set, clear it
        clearTimeout(logoutTimer);
      }
      // Start the timer again
      startLogoutTimer();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    clearTimeout(logoutTimer);
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        loginTime = null;
      })
      .catch((error) => console.log("Error occurred while logging out", error));
  };

  // Theme
  const light = "light";

  // -------------------------------------------------------------------

  return (
    <>
      <div className="login-mount">
        <div className="main">
          <div className="container-parent">
            {/* main login container with fields */}
            <div className="login-div text-center">
              {/* insta-Logo-words */}
              <div className="logo-div text-center mb-5 ">
                <i className="contained-img" />
              </div>

              {/* Login credentials */}
              <div className="form-div w-100% text-center">
                <form onSubmit={handleLogIn}>
                  <div className="form-elements">
                    <div className="form-group  mb-2">
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        className="form-control small-text"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Email or username"
                      />
                    </div>
                    <div className="form-group  mb-2">
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        className="form-control small-text"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        required
                      />
                    </div>
                  </div>

                  <div className="text-center d-grid">
                    <button
                      type="submit"
                      role="button"
                      className="btn btn-primary mt-3"
                      style={{ overflow: "hidden", color: "white" }}
                    >
                      <span
                        className="small-text text-center"
                        style={{ color: "white" }}
                      >
                        Log In
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* From Meta */}
            <div className="meta-logo mt-5">
              <span className="small-text" style={{ overflow: "hidden" }}>
                from
              </span>
              <div className="meta me-1">
                <img
                  className="contained-meta-img"
                  src="src/assets/Meta logos/Meta_Company Lockup/1 Positive Primary/RGB/Meta_lockup_positive primary_RGB.png"
                  width="75px"
                  height="182px"
                  alt="Meta logo, back to home"
                />
              </div>
            </div>
          </div>

          {/* !main */}
        </div>

        <div className="sign-up-shortcut mt-2">
          <span style={{ fontSize: "14px" }}>
            Don't have an account ? &nbsp;
          </span>
          <Link to="/register" className="nav-link">
            <span style={{ fontSize: "14px" }}>Sign up</span>
          </Link>
        </div>

        <GetTheApp />

        <Footer theme={light} />

        {/* !login-mount */}
      </div>
    </>
  );
};
