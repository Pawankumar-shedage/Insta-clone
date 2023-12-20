/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Link, Navigate, useNavigate } from "react-router-dom";
import "/src/assets/Styles/Register/RegisterPage.css";
import { Footer } from "../Components/Common/Footer/Footer";
import { GetTheApp } from "../Components/Common/Footer/GetTheApp";
import { useEffect, useState } from "react";
import { useFirebase } from "../FirebaseSetUp/FirebaseContext";

export const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  //--- Firebase 🦺
  const { addUser: registerUser } = useFirebase();

  // navigation
  const navigate = useNavigate();

  const [isPasswordFocused, setPasswordFocus] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getPasswordStrengthMessage = () => {
    const length = formData.password.length;
    if (length < 8)
      return {
        color: "red",
        message: "Password must atleast contain 8 characters",
      };
    else if (length <= 10) return { color: "blue", message: "Good Password" };
    else return { color: "green", message: "Strong Password" };
  };
  const { color, message } = getPasswordStrengthMessage();

  // SUbmit data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataSent = await registerUser(formData);

    if (dataSent) {
      navigate("/");
    }
    console.log("data sub", dataSent);
  };

  // Return
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
                <form onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="form-elements">
                    <div className="form-group  mb-2">
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        className="form-control input-field"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                        required
                        // autoComplete=""
                      />
                    </div>

                    {/* Full Name */}
                    <div className="form-group  mb-2">
                      <input
                        type="text"
                        name="fullName"
                        onChange={handleChange}
                        value={formData.fullName}
                        className="form-control input-field"
                        id="exampleInputEmail3"
                        aria-describedby="emailHelp"
                        placeholder="Full Name"
                      />
                    </div>

                    {/* Username */}
                    <div className="form-group  mb-2">
                      <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={formData.username}
                        className="form-control input-field"
                        id="username1"
                        placeholder="Username"
                      />
                    </div>

                    {/* Password */}
                    <div className="form-group  mb-2">
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        onFocus={() => setPasswordFocus(!isPasswordFocused)}
                        onBlur={() => setPasswordFocus(!isPasswordFocused)}
                        className="form-control input-field"
                        id="exampleInputPassword1"
                        placeholder={"Password"}
                        required
                      />

                      {/* conditional render after entering password.. */}

                      <small
                        className=""
                        style={{
                          color: color,
                          float: "left",
                          fontSize: "9px",
                        }}
                      >
                        {isPasswordFocused && message}
                      </small>
                    </div>

                    {/* !form-elements */}
                  </div>

                  <br />
                  {/* Policy Text */}
                  <div className="text-center fw-light">
                    <p className="small-text">
                      People who use our service may have uploaded your contact
                      information to Instagram.
                      <Link
                        to="/"
                        style={{ color: "#254892", textDecoration: "none" }}
                      >
                        {" "}
                        Learn <br /> More
                      </Link>{" "}
                      <br />
                      By signing up, you agree to our Terms , Privacy Policy and
                      Cookies Policy .
                    </p>
                  </div>
                  <div className="text-center d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                      style={{ overflow: "hidden" }}
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* From Meta */}
            <div className="meta-logo mt-5">
              <span className="small-text" style={{ overflow: "hiden" }}>
                from
              </span>
              <div className="meta">
                <img
                  className="contained-meta-img"
                  src="/src/IG_brand_asset_pack_2023/Meta Logo.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sign-up-shortcut mt-2">
          <span className="" style={{ fontSize: "14px" }}>
            Have an account? &nbsp;
          </span>
          <Link to="/login" className="nav-link" style={{ fontSize: "14px" }}>
            Log in
          </Link>
        </div>

        {/* Get the app */}
        <GetTheApp />

        {/* !top */}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};
