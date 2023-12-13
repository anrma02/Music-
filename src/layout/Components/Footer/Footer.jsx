import classNames from 'classnames/bind';

import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

import PropTypes from 'prop-types';

import style from './Footer.module.scss';
import Image from '~/assest/image';
import HandleButton from './HandleButton';
import { useAudio } from '~/Context/AudioProvider';


const cx = classNames.bind(style);


function Footer({ song, artist, imageSrc }) {

    const { volume, increaseVolume, decreaseVolume } = useAudio();


    const handleSliderChange = (event, newValue) => {
        if (newValue > volume) {
            increaseVolume();
        } else if (newValue < volume) {
            decreaseVolume();
        }
    };


    return <footer className={cx('footer-container')}>
        <div className={cx('footer-flex')} >
            <div className={cx('footer-info')}>
                <Image src="" alt={""} />
                <div className={cx('info-detail')} >
                    <div className={cx("song")}>
                        ads
                    </div>
                    <div className={cx("artist")}>
                        MT-P
                    </div>
                </div>
            </div>

            <div className={cx("footer-play")}>

                <HandleButton />
            </div>



            <>

                <Stack spacing={1} sx={{ width: 150 }} direction="row" alignItems="center">
                    <VolumeDown onClick={decreaseVolume} />
                    <Slider
                        size="small"
                        value={volume}
                        onChange={handleSliderChange}
                        aria-label="Volume"
                        valueLabelDisplay="auto"
                    />
                    <VolumeUp onClick={increaseVolume} />
                </Stack>

            </>
        </div>
    </footer >;
}

Footer.propTypes = {
    song: PropTypes.string,
    artist: PropTypes.string,
    imageSrc: PropTypes.string,
    volume: PropTypes.number,
    audioRef: PropTypes.object,
    onVolumeChange: PropTypes.func,
}


export default Footer;
