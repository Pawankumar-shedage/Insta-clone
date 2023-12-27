/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import { useFirebase } from "../FirebaseSetUp/FirebaseContext";
// style
import "/src/Styles/Login/LoginPage.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Register } from "./Register";
import { Footer } from "../Components/Common/Footer/Footer";
import { GetTheApp } from "../Components/Common/Footer/GetTheApp";

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
  } = useFirebase();

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

        const userData = await getUserData(user.uid);

        if (userData) {
          console.log("User authenticated:", user.uid);
          console.log("User data from Firestore:", userData);
          // Now you have both authentication data and additional user data

          // navigate
          navigate("/");
        } else {
          console.error("User data not found in Firestore");
          // Handle the case where user data is not found
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="top">
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
                        onFocus={() => setPasswordFocus(!isPasswordFocused)}
                        onBlur={() => setPasswordFocus(!isPasswordFocused)}
                        className="form-control small-text"
                        id="exampleInputPassword1"
                        placeholder="Password"
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
                  src="/src/assets/IG_brand_asset_pack_2023/Meta Logo.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* !main */}
        </div>
        <div className="sign-up-shortcut mt-2">
          <span style={{ fontSize: "14px" }}>
            Don't have an account? &nbsp;
          </span>
          <Link to="/register" className="nav-link">
            <span style={{ fontSize: "14px" }}>Sign up</span>
          </Link>
        </div>

        {/* Get the app */}
        <GetTheApp />

        {/* !top */}
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
};
