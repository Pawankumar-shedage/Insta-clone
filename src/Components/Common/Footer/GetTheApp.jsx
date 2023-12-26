import { Link } from "react-router-dom";

export const GetTheApp = () => {
  return (
    <>
      <div className="get-the-app mt-4 mb-2">
        <p className="text-center small-text mb-3">Get the app</p>
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
    </>
  );
};
