/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "/src/index.css";
import "./CreatePostModal.css";
import { useFirebase } from "../../FirebaseSetUp/FirebaseContext";
import { useAuth } from "../../AuthContext/AuthProvider";
import { useCallback, useEffect, useRef, useState } from "react";

// icons
import { IoMdArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { EmojiDrawer } from "../Messages/EmojiDrawer";

export const CreateNewPost = () => {
  const { uploadPhotos, getUserById, uploadUserPostData } = useFirebase();

  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [captionInput, setCaptionInput] = useState("");
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Emoji
  const [showEmojiWindow, setEmojiWindow] = useState(false);

  const getUserDetails = useCallback(async () => {
    const user = await getUserById(currentUser.uid);

    setUser(user);
  }, [currentUser.uid, getUserById]);

  useEffect(() => {
    const fetchData = async () => {
      await getUserDetails();
    };

    if (!user) fetchData();
  }, [getUserDetails, user]);

  const imgFileRef = useRef(null);

  const selectMedia = (e) => {
    if (imgFileRef.current) {
      imgFileRef.current.click();
    }
  };

  const imgPreviewRef = useRef(null);

  const [previewImgUrls, setPreviewImgUrls] = useState([]);

  const handleNextImg = () => {
    if (currentImgIndex === previewImgUrls.length - 1) {
      setCurrentImgIndex(0); // Reset to the first image if at the end
    } else {
      setCurrentImgIndex((prevIndex) => prevIndex + 1);
    }
    console.log("Clicked Next ", currentImgIndex);
  };

  const handlePrevImg = () => {
    if (currentImgIndex === 0) {
      setCurrentImgIndex(previewImgUrls.length - 1); // Show the last image if at the beginning
    } else {
      setCurrentImgIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleMediaFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const urls = [];
    setImages(files);

    for (const file of files) {
      if (file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        console.log("IMG PR", imgPreviewRef.current);

        fileReader.onload = () => {
          // showImages(imgPreviewRef.current, fileReader.result);
          urls.push(fileReader.result);

          setPreviewImgUrls([...urls]);
        };
      }
    }

    console.log("Img Files ", files);

    setStep(2);
  };

  const handleInputCaption = (e) => {
    const maxLength = 2000;

    const inputText = e.target.value;

    if (inputText.length <= maxLength) {
      setCaptionInput(e.target.value);
    }
  };

  const addEmoji = (data) => {
    setCaptionInput((prevCaption) => prevCaption + data.native);
  };

  // Sending Post Data
  const handlePostData = async (e, user) => {
    e.preventDefault();

    console.log("Images ", images);
    console.log("Captions ", captionInput);

    const imgUrls = await uploadPhotos(images, user.uid, user.username);

    console.log(imgUrls);

    const timeStamp = new Date();

    const postData = {
      images: imgUrls,
      caption: captionInput,
      time: timeStamp,
      username: user.username,
    };

    await uploadUserPostData(postData, user.uid, user.username);

    //TO do error handling.

    // if post is successfulll navigate user to home
    navigate("/home");
    setImages([]);
    setCaptionInput("");
  };

  // ------------------------------------------------------------------------
  return (
    <>
      <div className="create-new-post-container">
        {step === 1 && (
          // Step 1 Select Img
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <div>
                <div className="text-center mt-2 ">
                  <b>Create new Post</b>
                </div>
              </div>
            </div>
            <hr
              style={{
                width: "100%",
                color: "gray",
              }}
            />

            {/* Body */}
            <div className="modal-body">
              <div className="media-info mb-5">
                <div className="drag-images">
                  <svg
                    aria-label="Icon to represent media such as images or videos"
                    fill="currentColor"
                    height="77"
                    role="img"
                    viewBox="0 0 97.6 77.3"
                    width="96"
                  >
                    <title>Images, Videos</title>
                    <path
                      d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <span>Drag Photos and videos here.</span>
              </div>

              <div className="select-media ">
                <button className="btn " onClick={selectMedia}>
                  Select from device
                </button>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleMediaFileChange}
                  multiple
                  ref={imgFileRef}
                  style={{ display: "none" }}
                />

                {/* File Input */}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <>
            <div className="modal-step-2">
              {/* header */}
              <div className="modal-step-2-header mb-2">
                <div onClick={() => setStep(1)}>
                  <b role="button">
                    <IoMdArrowBack fontSize={"150%"} />
                  </b>
                </div>

                <div>
                  <b>Create new post</b>
                </div>

                <div>
                  <button
                    onClick={(e) => handlePostData(e, user && user)}
                    className="btn"
                  >
                    <span
                      style={{
                        color: "rgb(var(--ig--primary-button))",
                        outline: "none",
                      }}
                    >
                      Share
                    </span>
                  </button>
                </div>
              </div>

              <hr style={{ width: "100%", margin: "0" }} />

              {/* Body */}

              <div className=" modal-step-2-body">
                {/* Image Preview */}
                <div className="post-img-div" ref={imgPreviewRef}>
                  {previewImgUrls.length > 0 && (
                    <img src={previewImgUrls[currentImgIndex]} />
                  )}

                  <button id="prev-img-preview" onClick={handlePrevImg}>
                    <MdNavigateBefore />
                  </button>
                  <button id="next-img-preview" onClick={handleNextImg}>
                    <MdNavigateNext />
                  </button>
                </div>

                {/* Caption */}
                <div className="caption-div">
                  {/* user p-photo , username */}
                  <div className="cap-div-user-info mt-3">
                    <div className="me-3">Profile photo</div>
                    <div>
                      <span>{user && user.username}</span>
                    </div>
                  </div>

                  {/* Add-caption */}
                  <div className="add-caption mt-3">
                    <textarea
                      id="caption-area"
                      className="input-caption"
                      placeholder="Write an caption..."
                      value={captionInput}
                      onChange={handleInputCaption}
                    ></textarea>
                  </div>

                  <div className="caption-footer">
                    <div className="caption-emoji">
                      <span role="button" onClick={() => setEmojiWindow(true)}>
                        😊
                      </span>
                    </div>
                    <div className="max-text-length">
                      <span>{captionInput.length}/2000</span>
                    </div>
                  </div>

                  {/* Emoji Drawer */}
                  {showEmojiWindow && (
                    <div className="caption-emoji-drawer-container">
                      <div className="caption-emoji-drawer">
                        <EmojiDrawer sendEmoji={addEmoji} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
