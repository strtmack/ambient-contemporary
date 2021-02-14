import { useState, useRef, useContext } from "react";
import { StoreContext } from "./App";
import "./Sidebar.css";
import penrose from "./images/penrose.png";
import Modal from "./Modal";
import Toast from "./Toast";

const Sidebar = () => {
  const [sidebarState, setState] = useState({
    modal: false,

    toast: "",
  });

  const { state, dispatch } = useContext(StoreContext);

  const playlists = Object.keys(state.playlists);

  const playlistRef = useRef(null);

  const addPlaylist = (e) => {
    e.preventDefault();

    const playlist = playlistRef.current.value;

    dispatch({ type: "ADD_PLAYLIST", playlist: playlist });

    setState({
      ...state,
      modal: false,
      toast: "Playlist created successfully!",
    });
  };

  const handleModal = () =>
    setState({ ...sidebarState, modal: !sidebarState.modal });

  return (
    <div className="sidebar">
      <img src={penrose} alt="logo" />
      {/* <ul className="playlist-list">
        {playlists.map((list) => (
          <li
            key={list}
            className={list === state.currentPlaylist ? "active" : ""}
            onClick={() => {
              dispatch({ type: "SET_PLAYLIST", playlist: list });
            }}
          >
            {list}
          </li>
        ))}
        <li className="new-playlist" onClick={handleModal}>
          New Playlist
        </li>
      </ul> */}
      {/* <Modal show={sidebarState.modal} close={handleModal}>
        <form className="playlist-form" onSubmit={addPlaylist}>
          <div className="form-title">New Playlist</div>
          <div className="form-content">
            <input
              type="text"
              placeholder="My Playlist"
              ref={playlistRef}
              required
            />
            <br />
            <button type="submit">Create</button>
          </div>
        </form>
      </Modal>
      <Toast
        toast={sidebarState.toast}
        close={() => {
          setState({ ...sidebarState, toast: "" });
        }}
      /> */}
    </div>
  );
};

export default Sidebar;
