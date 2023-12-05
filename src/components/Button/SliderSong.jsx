import { useTheme } from '@mui/material/styles';
import { Slider } from "@mui/material";
import React from "react";



function formatDuration(value) {
     const minute = Math.floor(value / 60);
     const secondLeft = value - minute * 60;
     return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
}

function SliderSong() {
     const [position, setPosition] = React.useState(0);
     const duration = 180
     const audioRef = React.useRef(null);
     const theme = useTheme();
     const handleSeek = (_, value) => {
          setPosition(value);
          audioRef.current.currentTime = value;
     };

     return (<div className="flex justify-center px-2" >
          <div className="pr-4 text-[12px] flex items-center  text-small text-[#ebeaeac3]" >{formatDuration(position)} </div>
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
          <div className="pl-4 text-[12px] flex items-center text-[#ebeaeac3]" > - {formatDuration(duration - position)} </div>
     </div>);
}

export default SliderSong;