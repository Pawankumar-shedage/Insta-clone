import "./LoadingScreen.css";

export const LoadingScreen = () => {
  return (
    <>
      <div className="loading-screen-mount">
        <div className="loading-screen-container d-flex flex-column justify-content-center align-items-center">
          <div className="loading-logo">
            <img
              // src="/assets/"
              src="/assets/IG_brand_asset_pack_2023/01 Static Glyph/01 Gradient Glyph/Instagram_Glyph_Gradient.png"
              alt="Instagram logo"
              className="insta-loading-logo"
            />
            <div className="gradient-flash"></div>
          </div>
        </div>
      </div>
    </>
  );
};
