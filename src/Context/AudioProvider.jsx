import { createContext, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

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

     const playPauseToggle = (url) => {
          if (audioUrl === url) {
               if (isPlaying) {
                    audioRef.current.pause();
               } else {
                    audioRef.current.play();
               }
          } else {
               setAudioUrl(url);
               setCurrentTime(0);
               audioRef.current.src = url;
               audioRef.current.currentTime = 0;
               audioRef.current.play();
          }
          setIsPlaying(!isPlaying);
     };

     const handleTimeUpdate = () => {
          setCurrentTime(audioRef.current.currentTime);
     };

     const handleLoadedData = () => {
          setDuration(audioRef.current.duration);
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

     const value = {
          isPlaying,
          audioUrl,
          playPauseToggle,
          currentTime,
          duration,
          audioRef,
     };

     return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

AudioProvider.propTypes = {
     children: PropTypes.node.isRequired,
};
