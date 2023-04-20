import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { collection, getDocs, query } from "firebase/firestore";
import useSound from "use-sound";
import { db } from "lib/firebase";
import { SongListInterface } from "Interface/SongList.interface";

export default function SongList() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songList, setSongList] = useState<SongListInterface[]>([]);
  const [songPerPage, setSongPerPage] = useState(0);

  const handleNextButtonClick = () => {
    const nextSong = songPerPage + 1;
    if (nextSong < songList.length - 1) {
      setSongPerPage(nextSong);
    }
    setSongPerPage(nextSong);
  };
  const activeSong = songList[songPerPage];

  function handlePrevButtonClick() {
    const prevSong = songPerPage - 1;
    if (prevSong >= 0) {
      setSongPerPage(prevSong);
    }
    setSongPerPage(prevSong);
  }
  const fetchData = async () => {
    const q = query(collection(db, "songs"));
    const queryData = await getDocs(q);
    const data = queryData.docs.map((i) => i.data() as SongListInterface);
    setSongList(data);
    console.log(songList);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [play, { pause }] = useSound(activeSong?.song as any);
  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center py-10 font-bold text-4xl">PlayList</div>
      <div className="flex flex-col items-center justify-center">
        <div className=" bg-white rounded-lg shadow-lg overflow-hidden mt-20">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1500099817043-86d46000d58f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&h=250&q=80"
              className="object-cover"
              alt=''
            />
            <div className="absolute p-4 inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-gray-900 backdrop backdrop-blur-5 text-white">
              <h3 className="font-bold">Super Artist</h3>
              <span className="opacity-70">Albumtitle</span>
            </div>
          </div>
          <div>
            <div className="relative h-1 bg-gray-200">
              <div className="absolute h-full w-1/2 bg-green-500 flex items-center justify-end">
                <div className="rounded-full w-3 h-3 bg-white shadow"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-xs font-semibold text-gray-500 px-4">
            <div>1:50</div>
            <div className="flex space-x-3 py-8">
              <button className="playButton" onClick={handlePrevButtonClick}>
                <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                  <BiSkipPrevious /> 
                </IconContext.Provider>
              </button>
              {!isPlaying ? (
                <button className="playButton" onClick={playingButton}>
                  <IconContext.Provider
                    value={{ size: "3em", color: "#27AE60" }}
                  >
                    <AiFillPlayCircle />
                  </IconContext.Provider>
                </button>
              ) : (
                <button className="playButton" onClick={playingButton}>
                  <IconContext.Provider
                    value={{ size: "3em", color: "#27AE60" }}
                  >
                    <AiFillPauseCircle />
                  </IconContext.Provider>
                </button>
              )}
              <button className="playButton" onClick={handleNextButtonClick}>
                <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                  <BiSkipNext />
                </IconContext.Provider>
              </button>
            </div>
            <div>3:00</div>
          </div>
          <ul className="text-xs sm:text-base divide-y border-t cursor-default">
            <li className="flex items-center space-x-3 hover:bg-gray-100">
              <button className="p-3 hover:bg-green-500 group focus:outline-none">
                <svg
                  className="w-4 h-4 group-hover:text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
              <div className="flex-1">Artist - Title</div>
              <div className="text-xs text-gray-400">2:58</div>
              <button className="focus:outline-none pr-4 group">
                <svg
                  className="w-4 h-4 group-hover:text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
