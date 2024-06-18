/* eslint-disable no-unused-vars */
import { Suspense } from "react";
import { useFirebase } from "./FirebaseSetUp/FirebaseContext";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Messages } from "./Pages/Messages";
import { useAuth } from "./AuthContext/AuthProvider";
import { Profile } from "./Components/Profile/Profile";
import { ProtectedRoute } from "./Pages/ProtectedRoute";
import { CreateNewPost } from "./Components/Posts/CreateNewPost";
import { LoadingScreen } from "./Components/Common/Loading-Splash Screen/LoadingScreen";
import { ChatComponent } from "./Components/Messages/ChatComponent";
import { MobileMsgChat } from "./Components/Messages/Mb_Chat/MobileMsgChat";

function App() {
  const { isAuthenticated } = useAuth();
  const { currentUser } = useAuth();
  // const [imagesLoaded, setImagesLoaded] = useState(false);

  // useEffect(() => {
  //   const imageElements = document.querySelectorAll("img");

  //   const images = Array.from(imageElements);

  //   const imagesLength = images.length;

  //   let loadedImages = 0;
  //   const handleImageLoad = () => {
  //     loadedImages++;
  //     if (loadedImages === imagesLength) {
  //       setImagesLoaded(true);
  //     }
  //   };

  //   images.forEach((image) => {
  //     if (image.complete) {
  //       handleImageLoad();
  //     } else {
  //       //for every image.
  //       image.addEventListener("load", handleImageLoad); //browser is currently loading the image
  //     }
  //   });

  //   console.log(images);

  //   // return () => {
  //   //   images.forEach((image) => {
  //   //     image.removeEventListner("load", handleImageLoad);
  //   //   });
  //   // };
  // }, []);

  console.log("ss", isAuthenticated);

  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        {/* {imagesLoaded && ( */}
        <Routes>
          {/* Default */}

          {isAuthenticated ? (
            <Route path="/*" element={<Navigate to={"/home"} />} />
          ) : (
            <Route path="/*" element={<Navigate to={"/login"} />} />
          )}

          {/* <Route path="/*" element={<Navigate to={"/login"} />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" Component={Register} />

          {/* Protected */}

          <Route path="/home" element={<ProtectedRoute component={Home} />} />

          <Route
            path="/messages/:userId"
            element={<ProtectedRoute component={Messages} />}
          />

          {/* Mb-chat-component */}
          <Route
            path="/messages/chat"
            element={<ProtectedRoute component={MobileMsgChat} />}
          />

          <Route
            path="/profile/:userId"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route
            path="/createPost"
            element={<ProtectedRoute component={CreateNewPost} />}
          />
        </Routes>
        {/* // )} */}
      </Suspense>
    </>
  );
}

export default App;
