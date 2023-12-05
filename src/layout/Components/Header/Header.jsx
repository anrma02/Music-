import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


import style from './Header.module.scss';

import Image from '~/assest/image';
import SearchValue from '../SearchValue';
import config from '~/config';
import { useSelector } from 'react-redux';

const cx = classNames.bind(style);

function Header() {
    const account = useSelector((state) => state.auth.login.currentUser);

    console.log("🚀 ~ file: Header.jsx:20 ~ Header ~ account:", account);

    const [isShowMenu, setIsShowMenu] = useState(false);
    const menuRef = useRef(null);
    const menuItems = [
        {
            id: 1,
            title: 'Account',
            to: '/acc',
        },
        {
            id: 2,
            title: 'Profile',
            to: 'profile',
        },
        {
            id: 5,
            title: 'Setting',
            to: '/setting',
        },
        {
            id: 6,
            title: 'Logout',
            to: '/logout',
        },
    ];

    const handleClickOutside = useCallback((e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsShowMenu(false);
        }
    }, []);

    useEffect(() => {
        if (isShowMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isShowMenu, handleClickOutside]);

    const handleShowMenu = () => {
        setIsShowMenu(!isShowMenu);
    };

    return (
        <header className={cx('header')}>

            <div className={cx('icon')}>
                <button>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>


            <SearchValue />

            {account ? (
                <div ref={menuRef}>

                    <div onClick={handleShowMenu} className='flex  items-center rounded-[15px] h-[30px] bg-[#333333bc]  '>
                        <Image src="" alt="" className={cx('avt')} />
                        <span className='   min-w-min  pr-[10px]'>{account.data.lastname}</span>
                    </div>
                    {isShowMenu && (
                        <div className={cx('menu')}>
                            <ul className={cx('menu-list')}>
                                {menuItems.map((item) => (
                                    <li key={item.id} className={cx('menu-item')}>
                                        <Link to={item.to}>{item.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <div className={cx('form')}>
                    <button className={cx('signup-form')}><Link to={config.routes.signup} >Sign Up</Link></button>
                    <Link to={config.routes.login}>      <button className={cx('login-form')}>Log in</button></Link>
                </div>
            )}
        </header>
    );
}

export default Header;