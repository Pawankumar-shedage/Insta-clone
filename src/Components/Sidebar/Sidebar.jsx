import { Link } from "react-router-dom";
import "./sidebarStyle.css";
import "/src/index.css";
// icons
import { AiFillHome } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";

export const Sidebar = () => {
  return (
    <>
      <div className="sidebar-mount">
        <div className="button-group">
          <div className="top-btns">
            <div className="insta-log-div">
              <div>
                <Link className="sidebar-link">
                  <span>
                    <img
                      src="/src/assets/IG_brand_asset_pack_2023/01 Static Glyph/02 White Glyph/Instagram_Glyph_White.png"
                      style={{ height: "24px", width: "24px" }}
                    />
                  </span>
                </Link>
              </div>
            </div>

            {/* Group 1 */}
            <div className="sidebar-btn-grp-1">
              <div>
                <Link className="sidebar-link">
                  <span>
                    <AiFillHome style={{ fontSize: "24px" }} />
                  </span>
                </Link>
              </div>
              <div>
                <Link className="sidebar-link">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      id="instagram-reel"
                    >
                      <path
                        fill="#000"
                        // filRule="evenodd"
                        d="M12.6126 1H8.72076L8.94868 1.68377L10.7208 7H14.6126L13.0513 2.31623L12.6126 1ZM15.9766 9C15.9921 9.00036 16.0076 9.00036 16.0231 9H23V17.5C23 20.5376 20.5376 23 17.5 23H6.5C3.46243 23 1 20.5376 1 17.5V9H9.97665C9.99208 9.00036 10.0076 9.00036 10.0231 9H15.9766ZM16.7208 7L14.9487 1.68377L14.7208 1H17.5C20.5376 1 23 3.46243 23 6.5V7H16.7208ZM6.5 1H6.61257L7.05132 2.31623L8.61257 7H1V6.5C1 3.46243 3.46243 1 6.5 1ZM10.0735 10.1808C9.76799 9.96694 9.36892 9.94083 9.03819 10.113C8.70746 10.2852 8.5 10.6271 8.5 11V18C8.5 18.3729 8.70746 18.7148 9.03819 18.887C9.36892 19.0592 9.76799 19.0331 10.0735 18.8192L15.0735 15.3192C15.3408 15.1321 15.5 14.8263 15.5 14.5C15.5 14.1737 15.3408 13.8679 15.0735 13.6808L10.0735 10.1808Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </Link>
              </div>
              <div>
                <Link className="sidebar-link">
                  <IoSearchOutline style={{ fontSize: "24px" }} />
                </Link>
              </div>
              <div>
                <Link className="sidebar-link">
                  <IoSearchOutline style={{ fontSize: "24px" }} />
                </Link>
              </div>
              <div>
                <Link className="sidebar-link">
                  <IoSearchOutline style={{ fontSize: "24px" }} />
                </Link>
              </div>
              <div>
                <Link className="sidebar-link">
                  <IoSearchOutline style={{ fontSize: "24px" }} />
                </Link>
              </div>
            </div>
          </div>

          <div className="sidebar-settings-pop-up">
            <div>
              <Link className="sidebar-link">
                <IoSearchOutline style={{ fontSize: "24px" }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
