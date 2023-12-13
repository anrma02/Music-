import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';


const baseUrl = 'http://localhost:8000/';

const AudioContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAudio = () => {
     return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
     const [isPlaying, setIsPlaying] = useState(false);
     const audioRef = useRef(new Audio());
     const [audioUrl, setAudioUrl] = useState('');
     const [currentTime, setCurrentTime] = useState(0);
     const [duration, setDuration] = useState(0);
     const [initialSeekPosition, setInitialSeekPosition] = useState(0);
     const [sliderValue, setSliderValue] = useState(0);
     const [activeTrackIndex, setActiveTrackIndex] = useState(0);
     const [artist, setArtist] = useState({});
     const [isShuffled, setIsShuffled] = useState(false);
     const [shuffledPlaylist, setShuffledPlaylist] = useState([]);
     const [shuffledIndex, setShuffledIndex] = useState(0);
     const [track, setTrack] = useState(null);
     const [volume, setVolume] = useState(100);

     const playPauseToggle = useCallback((url) => {
          if (audioUrl === url) {
               if (isPlaying) {
                    audioRef.current.pause();
               } else {
                    audioRef.current.play();
               }
          } else {
               setAudioUrl(url);
               setCurrentTime(0);
               setInitialSeekPosition(0);
               setSliderValue(0);
               audioRef.current.src = url;
               audioRef.current.currentTime = 0;
               audioRef.current.play();


          } setIsPlaying(!isPlaying);

     }, [audioUrl, isPlaying]);

     const handleTimeUpdate = () => {
          setCurrentTime(audioRef.current.currentTime);
          setSliderValue(audioRef.current.currentTime);
     };

     const handleLoadedData = () => {
          setDuration(audioRef.current.duration);
     };


     const handleNextSong = useCallback(() => {
          if (isShuffled) {
               const nextIndex = shuffledIndex + 1;
               if (nextIndex < shuffledPlaylist.length) {
                    const nextTrack = shuffledPlaylist[nextIndex];
                    setAudioUrl(baseUrl + nextTrack.audio.path);
                    setInitialSeekPosition(0);
                    setSliderValue(0);
                    audioRef.current.src = baseUrl + nextTrack.audio.path;
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
                    setShuffledIndex(nextIndex);
               } else {

                    const newShuffledPlaylist = [...artist.tracks].sort(() => Math.random() - 0.5);
                    setShuffledPlaylist(newShuffledPlaylist);
                    setShuffledIndex(0);

                    const firstTrack = newShuffledPlaylist[0];
                    setAudioUrl(baseUrl + firstTrack.audio.path);
                    setInitialSeekPosition(0);
                    setSliderValue(0);
                    audioRef.current.src = baseUrl + firstTrack.audio.path;
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
               }
          } else {

               const nextIndex = activeTrackIndex + 1;
               if (nextIndex < artist.tracks.length) {
                    const nextTrack = artist.tracks[nextIndex];
                    setAudioUrl(baseUrl + nextTrack.audio.path);
                    setInitialSeekPosition(0);
                    setSliderValue(0);
                    audioRef.current.src = baseUrl + nextTrack.audio.path;
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
                    setActiveTrackIndex(nextIndex);
               }
          }
     }, [activeTrackIndex, artist.tracks, isShuffled, shuffledIndex, shuffledPlaylist]);


     const handlePreviousSong = () => {

          const newIndex = activeTrackIndex - 1;

          if (newIndex >= 0) {
               const newUrl = baseUrl + artist.tracks[newIndex].audio.path;
               setAudioUrl(newUrl);
               setInitialSeekPosition(0);
               setSliderValue(0);
               audioRef.current.src = newUrl;
               audioRef.current.currentTime = 0;
               audioRef.current.play();
               setActiveTrackIndex(newIndex);
          }
     };

     const handleShuffleClick = () => {
          const shuffledTracks = [...artist.tracks].sort(() => Math.random() - 0.5);

          const randomIndex = Math.floor(Math.random() * shuffledTracks.length);

          setAudioUrl(baseUrl + shuffledTracks[randomIndex].audio.path);
          setInitialSeekPosition(0);
          setSliderValue(0);
          audioRef.current.src = baseUrl + shuffledTracks[randomIndex].audio.path;
          audioRef.current.currentTime = 0;
          audioRef.current.play();

          setActiveTrackIndex(randomIndex);
          setIsShuffled(!isShuffled);
     };

     const increaseVolume = () => {
          setVolume((prevVolume) => Math.min(prevVolume + 10, 100));
          audioRef.current.volume = (volume + 10) / 100;
     };

     const decreaseVolume = () => {
          setVolume((prevVolume) => Math.max(prevVolume - 10, 0));
          audioRef.current.volume = (volume - 10) / 100;
     };


     useEffect(() => {
          audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.addEventListener('loadeddata', handleLoadedData);

          return () => {
               audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
               // eslint-disable-next-line react-hooks/exhaustive-deps
               audioRef.current.removeEventListener('loadeddata', handleLoadedData);
          };
     }, [audioUrl]);

     useEffect(() => {
          const handleEnded = () => {
               handleNextSong();
          };

          audioRef.current.addEventListener('ended', handleEnded);


          return () => {
               // eslint-disable-next-line react-hooks/exhaustive-deps
               audioRef.current.removeEventListener('ended', handleEnded);
          };
     }, [handleNextSong]);




     const value = {
          isPlaying,
          audioUrl,
          playPauseToggle,
          currentTime,
          duration,
          audioRef,
          initialSeekPosition,
          setInitialSeekPosition,
          sliderValue,
          setSliderValue,
          activeTrackIndex,
          handleNextSong,
          artist,
          setArtist,
          handlePreviousSong,
          handleShuffleClick,
          isShuffled,
          setIsShuffled,
          track,
          setTrack,
          volume,
          increaseVolume,
          decreaseVolume,
     };

     return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

AudioProvider.propTypes = {
     children: PropTypes.node.isRequired,
};
