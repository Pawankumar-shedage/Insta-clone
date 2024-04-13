import "./Profile.css";
import "/src/index.css";

export const ProfilePosts = () => {
  return (
    <div className="user-posts-container d-flex flex-column justify-content-center">
      <div className="posts-title">
        <div>
          <span role="button">POSTS</span>
        </div>
        <div>
          <span role="button">SAVED</span>
        </div>
        <div>
          <span role="button">TAGGED</span>
        </div>
      </div>
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
