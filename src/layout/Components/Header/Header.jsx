import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import style from './Header.module.scss';

import Image from '~/assest/image';
import SearchValue from '../SearchValue';

const cx = classNames.bind(style);

function Header() {
    const account = true;
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
            <>
                <div className={cx('icon')}>
                    <button>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>

                <SearchValue />
            </>

            {account ? (
                <div ref={menuRef}>
                    <Image src="" onClick={handleShowMenu} alt="" className={cx('avt')} />
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
                    <button className={cx('signup-form')}>Sign Up</button>
                    <button className={cx('login-form')}>Log in</button>
                </div>
            )}
        </header>
    );
}

export default Header;