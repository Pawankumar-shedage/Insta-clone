import "./Profile.css";
import "/src/index.css";

export const ProfilePosts = () => {
  return (
    <div className="user-posts-container d-flex flex-row justify-content-center">
      <span className="text-center mb-3" style={{ color: "white" }}>
        Posts
      </span>
      {/* to add posts,saved,archived options bar */}

      <div className="user-posts">
        <div>
          <img
            src="/src/assets/Images/French-Croissants.jpg"
            height={"100%"}
            width={"100%"}
            alt="post"
          />
        </div>
        <div>
          <img
            src="/src/assets/Images/French-Croissants.jpg"
            height={"100%"}
            width={"100%"}
            alt="post"
          />
        </div>
        <div>
          <img
            src="/src/assets/Images/French-Croissants.jpg"
            height={"100%"}
            width={"100%"}
            alt="post"
          />
        </div>
        <div>
          <img
            src="/src/assets/Images/French-Croissants.jpg"
            height={"100%"}
            width={"100%"}
            alt="post"
          />
        </div>
        <div>
          <img
            src="/src/assets/Images/French-Croissants.jpg"
            height={"100%"}
            width={"100%"}
            alt="post"
          />
        </div>
        <div>
          <img
            src="/src/assets/Images/French-Croissants.jpg"
            height={"100%"}
            width={"100%"}
            alt="post"
          />
        </div>
        <div>
          <img
            src="/src/assets/Images/French-Croissants.jpg"
            height={"100%"}
            width={"100%"}
            alt="post"
          />
        </div>
      </div>
    </div>
  );
};
