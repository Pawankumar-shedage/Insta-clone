/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import { useFirebase } from "../FirebaseSetUp/FirebaseContext";
// style
import "/src/assets/Styles/Login/LoginPage.css";
export const Login = () => {
  return (
    <>
      <div className="top">
        <div className="main">
          <div className="container-parent">
            {/* main login container with fields */}
            <div className="login-div text-center">
              {/* Logo */}
              <div className="logo-div text-center mb-5 ">
                <i className="contained-img" />
              </div>
              {/* Login credentials */}
              <div className="form-div w-100% text-center">
                <form>
                  <div className="form-elements">
                    <div className="form-group  mb-2">
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Email or username"
                      />
                    </div>
                    <div className="form-group  mb-2">
                      <input
                        type="password"
                        className="form-control"
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
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* From Meta */}
            <div className="meta-logo mt-5">
              <span>from</span>
              <div className="">
                <span>icon</span> Meta
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
