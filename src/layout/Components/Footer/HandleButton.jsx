import classNames from 'classnames/bind';
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai';
import { BiShuffle, } from 'react-icons/bi';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb';
import { IoRepeatSharp } from 'react-icons/io5'
import Slider from '@mui/material/Slider';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

import { playPause } from "~/redux/Services/playerSlice";
import style from './Footer.module.scss';
import React from 'react';


const cx = classNames.bind(style);

function HandleButton() {
     const [isRepeat, setIsRepeat] = React.useState(false);
     const [isShuffle, setIsShuffle] = React.useState(false);
     const [isPlaying, setIsPlaying] = React.useState(false);
     const [currentSongIndex, setCurrentSongIndex] = React.useState(0);
     const [songs, setSongs] = React.useState();
     const [position, setPosition] = React.useState(0);
     const duration = 180

     const dispatch = useDispatch();

     //  audioRef.current?.duration || 0;
     const audioRef = React.useRef(null);

     const theme = useTheme();

     function formatDuration(value) {
          const minute = Math.floor(value / 60);
          const secondLeft = value - minute * 60;
          return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
     }


     const handleNextSong = () => {
          setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
     };

     const handlePreviousSong = () => {
          setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
     };

     const handleRepeatClick = () => {
          setIsRepeat(!isRepeat);
     };

     const handleShuffleClick = () => {
          setIsShuffle(!isShuffle);
     };

     const handleSeek = (_, value) => {
          setPosition(value);
          audioRef.current.currentTime = value;
     };

     return (
          <>
               <div className={cx("icon-play")}>
                    <button className={cx('button', { 'clicked': isRepeat })} onClick={handleRepeatClick}>
                         <BiShuffle className={cx('icon', { 'red': isRepeat })} />
                    </button>


                    <button onClick={handlePreviousSong}>
                         <TbPlayerTrackPrev className={cx('icon')} />
                    </button>



                    <button onClick={handleNextSong} >
                         <TbPlayerTrackNext className={cx('icon')} />
                    </button>

                    <button className={cx('button', { 'clicked': isShuffle })} onClick={handleShuffleClick}>
                         <IoRepeatSharp className={cx('icon', { 'red': isShuffle })} />
                    </button>
               </div>
               <div className={cx("flex justify-center px-2")}>
                    <div className={cx("pr-4 text-[12px] flex items-center  text-small text-[#ebeaeac3]")}>{formatDuration(position)}</div>
                    <Slider
                         aria-label="time-indicator"
                         size="small"
                         value={position || 0}
                         min={0}

                         step={1}
                         max={duration}
                         onChange={handleSeek}
                         sx={{
                              color: theme.palette.mode === "#FFFBF5" ? "#7743DB" : "#FFFBF5",
                              height: 2,
                              width: 450,
                              "& .MuiSlider-thumb": {
                                   width: 8,
                                   height: 8,
                                   transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                                   "&:before": {
                                        boxShadow: "0 2px 5px 0 rgba(0,0,0,0.4)"
                                   },
                                   "&:hover, &.Mui-focusVisible": {
                                        boxShadow: `0px 0px 0px 8px ${theme.palette.mode === "dark" ? "#7743DB" : "#7743DB"
                                             }`
                                   },
                                   "&.Mui-active": {
                                        width: 10,
                                        height: 10
                                   }
                              },
                              "& .MuiSlider-rail": {
                                   opacity: 0.28
                              }
                         }}
                    />
                    <div className={cx("pl-4 text-[12px] flex items-center text-[#ebeaeac3]")}> - {formatDuration(duration - position)}</div>
               </div>
          </>
     );
}

export default HandleButton;