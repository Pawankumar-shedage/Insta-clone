import "./Profile.css";
import "/src/index.css";

export const StoryHighlights = () => {
  return (
    <div className="highlights" role="">
      <div className="highlight-container">
        <div>
          <div className="highlight">
            <img
              src="/src/assets/Images/French-Croissants.jpg"
              height={"100%"}
              width={"100%"}
              alt="highlight"
            />
          </div>
          <div className="highlight">
            <img
              src="/src/assets/Images/French-Croissants.jpg"
              height={"100%"}
              width={"100%"}
              alt="highlight"
            />
          </div>
          <div className="highlight">
            <img
              src="/src/assets/Images/French-Croissants.jpg"
              height={"100%"}
              width={"100%"}
              alt="highlight"
            />
          </div>
          <div className="highlight">
            <img
              src="/src/assets/Images/French-Croissants.jpg"
              height={"100%"}
              width={"100%"}
              alt="highlight"
            />
          </div>
          <div className="highlight">
            <img
              src="/src/assets/Images/French-Croissants.jpg"
              height={"100%"}
              width={"100%"}
              alt="highlight"
            />
          </div>
          <div className="highlight">
            <img
              src="/src/assets/Images/French-Croissants.jpg"
              height={"100%"}
              width={"100%"}
              alt="highlight"
            />
          </div>

          {/* nav arrows */}
          <label className="prev">&#10094;</label>
          <label className="next">&#10095;</label>
        </div>
      </div>
    </div>
  );
};
