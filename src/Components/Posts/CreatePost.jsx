import { useRef } from "react";
import "./CreatePostModal.css";

export const CreatePost = () => {
  const modalRef = useRef();

  console.log(modalRef.current);

  const toggleModal = () => {
    if (!modalRef.current) return;

    {
      modalRef.current.hasAttribute("open")
        ? modalRef.current.close()
        : modalRef.current.showModal();
    }
  };

  return (
    <>
      <div>
        <dialog ref={modalRef}>Content</dialog>
      </div>
      <button onClick={toggleModal}>Open</button>
    </>
  );
};
