import classNames from 'classnames/bind';

import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import React from 'react';


import style from './Footer.module.scss';
import Image from '~/assest/image';
import HandleButton from './HandleButton';


const cx = classNames.bind(style);


function Footer() {
    const [value, setValue] = React.useState(30);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return <footer className={cx('footer-container')}>
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

                <HandleButton />
            </div>



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
    </footer >;
}

export default Footer;
