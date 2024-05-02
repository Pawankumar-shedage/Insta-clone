/* eslint-disable react/prop-types */
import "/src/index.css";
import "./Modal.css";

// icons
import { RxCross1 } from "react-icons/rx";

export const Modal = ({ closeModal, children }) => {
  return (
    <>
      <div
        className="modal-container"
        onClick={(e) => {
          if (e.target.className === "modal-container") {
            closeModal();
          }
        }}
      >
        {children}

        {/* Close-Btn */}
        <span className="close-modal-btn" onClick={() => closeModal()}>
          <span>
            <RxCross1 />
          </span>
        </span>
      </div>
    </>
  );
};
