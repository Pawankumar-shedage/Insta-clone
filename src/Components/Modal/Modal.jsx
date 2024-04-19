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
        {/* Close-Btn */}
        <div className="close-modal">
          <span className="close-modal-btn" onClick={() => closeModal()}>
            <RxCross1 />
          </span>
        </div>

        {/* Content -  must-include divs(header,body,footer)*/}
        <div className="modal-content">{children}</div>
      </div>
    </>
  );
};
