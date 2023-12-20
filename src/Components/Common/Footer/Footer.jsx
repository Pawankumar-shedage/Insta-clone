import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer role="content-info" className="mt-5">
        <div className="footer-content-frame">
          {/* Tags */}
          <div className="footer-tags small-text">
            <div className="meta me-1">
              <div>
                <Link className="nav-link" to="/">
                  Meta
                </Link>
              </div>
            </div>
            <div className="meta me-1">
              <Link className="nav-link" to="/">
                About
              </Link>
            </div>
            <div className="meta me-1">
              <Link className="nav-link" to="/">
                Blogs
              </Link>
            </div>
            <div className="meta me-1">
              <Link className="nav-link" to="/">
                Job
              </Link>
            </div>
            <div className="meta me-1">
              <Link className="nav-link" to="/">
                Help
              </Link>
            </div>
            <div className="meta me-1">
              <Link className="nav-link" to="/">
                API
              </Link>
            </div>
            <div className="meta me-1">
              <Link className="nav-link" to="/">
                Privacy
              </Link>
            </div>
            <div className="meta me-1 d-flex">
              <Link className="nav-link" to="/">
                <span>Cookie Settings</span>
              </Link>
            </div>
            <div className="meta  me-3">
              <Link className="nav-link" to="/">
                Terms
              </Link>
            </div>
            <div className="meta me-1">
              <Link className="nav-link" to="/">
                Locations
              </Link>
            </div>
            <div className="meta me-1">
              <Link className="nav-link" to="/">
                Instagram Lite
              </Link>
            </div>
            <div className="meta me-1">
              <Link className="nav-link" to="/">
                Threads
              </Link>
            </div>
            <div className="meta me-1">
              <Link className="nav-link" to="/">
                Contact Uploading & Non-Users
              </Link>
            </div>
            <div className="meta me-1">
              <Link className="nav-link" to="/">
                Meta Verified
              </Link>
            </div>

            {/* !------- */}
          </div>

          {/* Language, to make a component */}
          <div className="lang-copywrite mt-3">
            <div>
              <select className="form-select " name="lang" id="lang-select">
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
