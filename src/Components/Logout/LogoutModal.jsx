import "/src/Components/Modal/Modal.css";
import "./LogoutModal.css";
import { useAuth } from "../../AuthContext/AuthProvider";

export const LogoutModal = () => {
  const { handleAuthStateChange, signOutUser } = useAuth();

  const handleLogout = async () => {
    await signOutUser(); //Firebase auth state change.
    handleAuthStateChange(null); //Local auth state change.
  };

  // -------------------------
  return (
    <div className="logout-modal-content">
      <div className="logout-modal-header mt-3 ">
        <div className="">
          <p className="text-center"> Would you like to logout?</p>
        </div>
      </div>
      <hr style={{ width: "100%", height: "1px" }} />

      <div className="logout-modal-body">
        <div className="mt-3 mb-3 logout-action ">
          <div>
            <button className="btn " onClick={handleLogout}>
              Logout
            </button>
          </div>
          {/* <div>
            <button className="btn ">Cancel</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
