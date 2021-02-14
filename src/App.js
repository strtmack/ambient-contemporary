import { useReducer, createContext, useRef } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Canvas from "./Canvas";
import { EasybaseProvider } from "easybase-react";
import ebconfig from "./ebconfig";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";
import { motion } from "framer-motion";
import media from "./media.json";

export const StoreContext = createContext(null);

const DEFAULT_PLAYLIST = "home";

const initialState = {
  currentPlaylist: DEFAULT_PLAYLIST,
  media,
  playlists: {
    home: new Set(media.ids),
    favourites: new Set(),
  },
  nowPlaying: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PLAYLIST":
      return {
        ...state,
        playlists: { ...state.playlists, [action.playlist]: new Set() },
      };
    case "SET_PLAYLIST":
      return { ...state, currentPlaylist: action.playlist };
    case "ADD_FAVOURITE":
      state.playlists.favourites.add(action.trackId);
      return { ...state };
    case "REMOVE_FAVOURITE":
      state.playlists.favourites.delete(action.trackId);
      return { ...state };
    case "NOW_PLAYING":
      state.nowPlaying = action.file;
      return { ...state };
    case "AUDIO_END":
      state.nowPlaying = "";
      return { ...state };

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const variants = {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 2,
        when: "beforeChildren",
        staggerChildren: 0.9,
      },
    },
  };

  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <StoreContext.Provider value={{ state, dispatch }}>
        <motion.div initial="hidden" animate="visible" variants={variants}>
          <div className="app">
            {/* <Login /> */}
            {/* <Sidebar /> */}
            <Canvas />
            <div className="content-player-container">
              <Content />
              <div className="player-bar">
                <AudioPlayer
                  src={state.nowPlaying}
                  className="audio-player"
                  onEnded={() => {
                    dispatch({ type: "AUDIO_END" });
                  }}
                />
              </div>
            </div>
            <Canvas />
          </div>
        </motion.div>
      </StoreContext.Provider>
    </EasybaseProvider>
  );
}

export default App;
