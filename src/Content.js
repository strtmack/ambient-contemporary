import { useContext, useEffect } from "react";
import { StoreContext } from "./App";
import "./Content.css";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import { useEasybase } from "easybase-react";
import penrose from "./images/penrose.png";
import { motion } from "framer-motion";

const Content = () => {
  const { state, dispatch } = useContext(StoreContext);
  const currentPlaylist = state.currentPlaylist;
  const trackIds = Array.from(state.playlists[currentPlaylist]);

  // easybase db
  const { configureFrame, sync, Frame } = useEasybase();

  useEffect(() => {
    configureFrame({ tableName: "CLIO-TRACKS", limit: 20, offset: 0 });
    sync();
  }, []);
  // easybase db

  // framer motion variants
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 4 } },
  };

  return (
    <div className="content">
      {/* <img src={penrose} alt="logo" className="logo" /> */}
      <div className="playlist-title">
        <h3>dream world, driftwood</h3>
        <p>
          meditative // generative // ambient // lo-fi // internet music library
        </p>
        <p>last updated 14/2/2021</p>
      </div>
      {!trackIds.length ? (
        <p>Looks like this playlist is empty. Check back later.</p>
      ) : (
        <motion.div initial="hidden" animate="visible" variants={variants}>
          <table className="track-table">
            <thead>
              <tr>
                <td />
                <td>Title</td>
                <td>Artist</td>
                <td>Length</td>
              </tr>
            </thead>

            <tbody>
              {Frame()
                .sort((a, b) => (a.id > b.id ? 1 : -1))
                .map((elem) => {
                  const isFavourite = state.playlists.favourites.has(elem.id);

                  return (
                    <tr key={elem.id}>
                      {/* <td>
                      {isFavourite ? (
                        <FavoriteIcon
                          className="icon fav"
                          onClick={() => {
                            dispatch({
                              type: "REMOVE_FAVOURITE",
                              trackId: elem.id,
                            });
                          }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          className="icon"
                          onClick={() => {
                            dispatch({
                              type: "ADD_FAVOURITE",
                              trackId: elem.id,
                            });
                          }}
                        />
                      )}
                    </td> */}
                      <td>
                        {state.nowPlaying === elem.file ? (
                          <PauseIcon
                            onClick={() => {
                              dispatch({ type: "NOW_PLAYING", file: "" });
                            }}
                          />
                        ) : (
                          <PlayArrowIcon
                            onClick={() => {
                              dispatch({
                                type: "NOW_PLAYING",
                                file: elem.file,
                              });
                            }}
                          />
                        )}
                      </td>
                      <td>{elem.title}</td>
                      <td>{elem.artist}</td>
                      <td>{elem.length}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default Content;
