/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import "/src/assets/Styles/Register/RegisterPage.css";

export const Register = () => {
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
                <form>
                  {/* Email */}
                  <div className="form-elements">
                    <div className="form-group  mb-2">
                      <input
                        type="email"
                        className="form-control input-field"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                        required
                      />
                    </div>

                    {/* Full Name */}
                    <div className="form-group  mb-2">
                      <input
                        type="text"
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
                        className="form-control input-field"
                        id="exampleInputPassword1"
                        placeholder="Username"
                      />
                    </div>

                    {/* Password */}
                    <div className="form-group  mb-2">
                      <input
                        type="password"
                        className="form-control input-field"
                        id="exampleInputPassword1"
                        placeholder={"Password"}
                        required
                      />

                      {/* conditional render after entering password.. */}
                      <small
                        className=""
                        style={{
                          color: "blue",
                          float: "left",
                          fontSize: "9px",
                        }}
                      >
                        <span className="">
                          Must be of atleast 8 characters
                        </span>
                      </small>
                    </div>
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
                      role="button"
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
          <span>Have an account? &nbsp;</span>
          <Link to="/login" className="nav-link">
            Log in
          </Link>
        </div>

        {/* Get the app */}
        <div className="get-the-app mt-4 mb-2">
          <p className="text-center small-text">Get the app</p>
          <div className="center-elements">
            {/* google play store */}
            <Link to="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3D0C826C21-17C3-444A-ABB7-EBABD37214D7%26utm_campaign%3DsignupPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge%26original_referrer%3Dhttps%253A%252F%252Fwww.instagram.com%252Fdirect%252Finbox%252F">
              <img
                alt="Get it on Google Play"
                className=""
                src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
                style={{ height: "40px" }}
              />
            </Link>

            {/* go to microsoft store */}
            <Link to="ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=7%2C10%2C1921%2C913&next=https%3A%2F%2Fwww.instagram.com%2Fdirect%2Ft%2F117111423003923%2F%3F__coig_login%3D1">
              <img
                alt="Get it from Microsoft"
                className="_aa5q"
                src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
                style={{ height: "40px" }}
              ></img>
            </Link>
          </div>
        </div>

        {/* !top */}
      </div>

      {/* Footer */}
      <footer role="content-info" className="mt-5">
        <div className="footer-content-frame">
          {/* Tags */}
          <div className="footer-tags small-text">
            <div className="meta me-3">
              <div>
                <Link className="nav-link" to="/">
                  Meta
                </Link>
              </div>
            </div>
            <div className="meta me-3">
              <Link className="nav-link" to="/">
                About
              </Link>
            </div>
            <div className="meta me-3">
              <Link className="nav-link" to="/">
                Blogs
              </Link>
            </div>
            <div className="meta me-3">
              <Link className="nav-link" to="/">
                Job
              </Link>
            </div>
            <div className="meta me-3">
              <Link className="nav-link" to="/">
                Help
              </Link>
            </div>
            <div className="meta me-3">
              <Link className="nav-link" to="/">
                API
              </Link>
            </div>
            <div className="meta me-3">
              <Link className="nav-link" to="/">
                Privacy
              </Link>
            </div>
            <div className="meta me-3 d-flex">
              <Link className="nav-link" to="/">
                <span>Cookie Settings</span>
              </Link>
            </div>
            <div className="meta  me-3">
              <Link className="nav-link" to="/">
                Terms
              </Link>
            </div>
            <div className="meta me-3">
              <Link className="nav-link" to="/">
                Locations
              </Link>
            </div>
            <div className="meta me-3">
              <Link className="nav-link" to="/">
                Instagram Lite
              </Link>
            </div>
            <div className="meta me-3">
              <Link className="nav-link" to="/">
                Threads
              </Link>
            </div>
            <div className="meta me-3">
              <Link className="nav-link" to="/">
                Threads
              </Link>
            </div>
            <div className="meta me-3">
              <Link className="nav-link" to="/">
                Threads
              </Link>
            </div>

            {/* !------- */}
          </div>

          {/* Language */}
          <div className="lang-copywrite mt-3">
            <div>
              <select className="form-select" name="lang" id="lang-select">
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Marathi">Marathi</option>
              </select>
            </div>
            &nbsp;
            <div className="copyright">
              <span className="small-text">
                &#169; 2023 Instagram from Meta
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
