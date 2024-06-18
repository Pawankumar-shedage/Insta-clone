/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./searchBarStyle.css";
import "/src/index.css";

import { RxCrossCircled } from "react-icons/rx";
import { useFirebase } from "../../FirebaseSetUp/FirebaseContext";
import { useNavigate, useNavigation } from "react-router-dom";

export const SearchBar = ({ users }) => {
  const inputRef = useRef();
  const { getProfilePhoto } = useFirebase();
  const navigate = useNavigate();

  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const debounceTimer = useRef(null);

  useEffect(() => {
    const setUserMap = async () => {
      await setUidProfilePicMap(users);
    };

    setUserMap();
  }, [users]);

  useEffect(() => {
    // Filter  users acc to search input
    const filterUsers = setTimeout(() => {
      if (searchInput.trim() === "") {
        setFilteredUsers([]);
        setNoResultsFound(false); //because searchInput is empty
        return;
      }

      const filtered = users.filter(
        (user) =>
          (user.fullName &&
            (user.fullName
              .toLowerCase()
              .startsWith(searchInput.toLowerCase()) ||
              user.fullName
                .toLowerCase()
                .includes(searchInput.toLowerCase()))) ||
          (user.username &&
            (user.username
              .toLowerCase()
              .startsWith(searchInput.toLowerCase()) ||
              user.username.toLowerCase().includes(searchInput.toLowerCase())))
      );

      console.log("filtered users", filtered, "search len", searchInput.length);

      if (filtered.length === 0 && searchInput.length != 0)
        setNoResultsFound(true);
      else setNoResultsFound(false); //searchInput "" empty case

      setFilteredUsers(filtered);
    }, 1000);

    return () => {
      clearTimeout(filterUsers);
    };
  }, [searchInput]);

  const handleSearchBarClick = () => {
    console.log("clcked search");
    setShowSearchIcon(false);
    inputRef.current.focus();
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const uidProfilePicMap = useRef(new Map());

  const fetchProfilePic = async (userId) => {
    return await getProfilePhoto(userId);
  };

  const setUidProfilePicMap = async (users) => {
    try {
      const promises = users.map(async (user) => {
        const profilePic = await fetchProfilePic(user.author_uid);

        // console.log(profilePic);
        if (profilePic)
          uidProfilePicMap.current.set(user.author_uid, profilePic);
      });

      await Promise.all(promises);
    } catch (error) {
      console.error("Error setting profile pictures: ", error);
    }
  };

  const handleUserProfile = (user) => {
    console.log("Clicked user in search bar->", user);

    try {
      const userId = user.author_uid;
      console.log("userid-profile", userId);

      if (!userId) {
        throw new Error("User ID not found");
      }

      navigate(`/profile/${userId}`);
    } catch (e) {
      console.log("Error occ @", e);
    }
  };

  const defaultDp = "/assets/Images/User i/user.png";

  // ------------------------RETURN
  return (
    <div className="searchbar-container">
      <div className="sb-top-title">
        <span className="fs-4 fw-strong">Search</span>
      </div>

      <div className="sb-header" onClick={handleSearchBarClick}>
        <input
          ref={inputRef}
          id="mbh-search-input"
          type="search"
          value={searchInput}
          onChange={handleSearchInput}
          onBlur={() => {
            if (searchInput.length === 0) setShowSearchIcon(true);
          }}
          onFocus={() => {
            setShowSearchIcon(false);
            searchInput.trim() !== "" && setFilteredUsers(filteredUsers);
          }}
        />

        <div
          id="mbh-search-icon"
          style={{ display: showSearchIcon ? "block" : "none" }}
        >
          <svg
            aria-label="Search"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="15"
          >
            <title>Search</title>
            <path
              d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="16.511"
              x2="22"
              y1="16.511"
              y2="22"
            ></line>
          </svg>
        </div>

        <div
          style={{ display: showSearchIcon ? "block" : "none" }}
          id="mbh-search-placeholder"
        >
          Search
        </div>
      </div>

      <div className="sb-fileredUsers">
        {filteredUsers.map((user) => (
          <div
            className="sb-filtered-user-div"
            key={user.author_uid}
            onClick={() => handleUserProfile(user)}
          >
            <div className="sb-filtered-user-dp">
              <img
                src={uidProfilePicMap.current.get(user.author_uid) || defaultDp}
                className="rounded-circle"
                alt="Dp"
              />
            </div>
            <div className="sb-filtered-user-name">
              <div className="sb-filtered-user-full-name">
                <span className="">{user.fullName}</span>
              </div>
              <div className="sb-filtered-user-username">
                <span className="fw-light">{user.username}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {noResultsFound && (
        <div className="sb-filtered-no-results">
          {/* <span>Sorry</span> */}
          <span>No results found</span>
        </div>
      )}
    </div>
  );
};
