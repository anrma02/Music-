import classNames from 'classnames/bind';

import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import React from 'react';


import style from './Footer.module.scss';
import Image from '~/assest/image';


import SliderSong from '~/components/Button/SliderSong';
import { useSelector } from 'react-redux';


const cx = classNames.bind(style);


function Footer() {
    const account = useSelector((state) => state.auth.login.currentUser);

    const [value, setValue] = React.useState(30);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return <>
        {account ?
            <footer className={cx('footer-container')}>
                <div className={cx('footer-flex')} >
                    <div className={cx('footer-info')}>
                        <Image src="" alt={""} />
                        <div className={cx('info-detail')} >
                            <div className={cx("song")}>
                                CTCHTafsssssssssssssssssssssssssssss
                            </div>
                            <div className={cx("artist")}>
                                MT-P
                            </div>
                        </div>
                    </div>

                    <div className={cx("footer-play")}>


                    </div>

                    <SliderSong />


                    <>

                        <Stack spacing={1} sx={{ width: 150 }} direction="row" alignItems="center">
                            <VolumeDown />
                            <Slider
                                size="small"
                                value={value} onChange={handleChange}
                                aria-label="Small"

                                valueLabelDisplay="auto"
                            />
                            <VolumeUp />
                        </Stack>

                    </>
                </div>
            </footer >
            :
            <div></div>}
    </ >;
}

Footer.propTypes = {

};

export default Footer;
