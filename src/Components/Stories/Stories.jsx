/* eslint-disable no-unused-vars */

import styles from "./stories.module.css";

const Stories = (props) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["stories"]}>
        <img
          src="/mask0169-sek-400w.png"
          alt="Mask0169"
          className={styles["mask"]}
        />
        <div className={styles["your-story"]}>
          <div className={styles["profile-image"]}>
            <img
              src="/ovalcopy0169-kbag.svg"
              alt="OvalCopy0169"
              className={styles["oval-copy"]}
            />
            <img
              src="/inneroval0170-5syl.svg"
              alt="InnerOval0170"
              className={styles["inner-oval"]}
            />
          </div>
          <span className={styles["text"]}>
            <span>Your Story</span>
          </span>
        </div>
        <div className={styles["story"]}>
          <div className={styles["profile-image1"]}>
            {/* <img
              src="/src/assets/Images/French-Croissants.jpg"
              alt="OvalCopy0170"
              className={styles["oval-copy1"]}
            /> */}
            <img
              src="/src/assets/Images/French-Croissants.jpg"
              alt="InnerOval0170"
              className={styles["inner-oval1"]}
            />
          </div>
          <span className={styles["text02"]}>
            <span>zackjohn</span>
          </span>
        </div>
        <div className={styles["story1"]}>
          <div className={styles["profile-image2"]}>
            <img
              src="/ovalcopy0170-zw0f.svg"
              alt="OvalCopy0170"
              className={styles["oval-copy2"]}
            />
            <img
              src="/inneroval0171-kt4a.svg"
              alt="InnerOval0171"
              className={styles["inner-oval2"]}
            />
          </div>
          <span className={styles["text04"]}>
            <span>kieron_d</span>
          </span>
        </div>
        <div className={styles["story2"]}>
          <div className={styles["profile-image3"]}>
            <img
              src="/ovalcopy0171-81x.svg"
              alt="OvalCopy0171"
              className={styles["oval-copy3"]}
            />
            <img
              src="/inneroval0171-h1ah.svg"
              alt="InnerOval0171"
              className={styles["inner-oval3"]}
            />
          </div>
          <span className={styles["text06"]}>
            <span>craig_love</span>
          </span>
        </div>
        <div className={styles["live"]}>
          <img
            src="/ovalcopy0171-mqv7.svg"
            alt="OvalCopy0171"
            className={styles["oval-copy4"]}
          />
          <img
            src="/inneroval0171-gllf.svg"
            alt="InnerOval0171"
            className={styles["inner-oval4"]}
          />
          <span className={styles["text08"]}>
            <span>karennne</span>
          </span>
          <div className={styles["live1"]}>
            <span className={styles["text10"]}>
              <span>LIVE</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;
