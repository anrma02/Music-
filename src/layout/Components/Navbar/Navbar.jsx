/* eslint-disable no-const-assign */
import classNames from 'classnames/bind';

import config from '~/config';
import Menu from './Menu';
import MenuItems from './Menu/MenuItems';
import style from './Navbar.module.scss';
import { HomeIcon, HomeIconActive, LogoIcon, SearchIcon, SearchIconActive } from '~/components/Icon';

const cx = classNames.bind(style);
function Navbar() {
    const AccountUser = true;

    return (
        <nav className={cx('nav-contaner')}>
            <div>
                <ul className={cx('nav-item')}>
                    {AccountUser ? (
                        <div className={cx('logo')}>
                            {' '}
                            <LogoIcon />
                        </div>
                    ) : (
                        ''
                    )}
                    <Menu>
                        <li>
                            <MenuItems
                                icon={<HomeIcon />}
                                title="Home"
                                activeIcon={<HomeIconActive />}
                                to={config.routes.home}
                            />
                        </li>

                        <li>
                            <MenuItems
                                icon={<SearchIcon />}
                                title="Search"
                                activeIcon={<SearchIconActive />}
                                to={config.routes.search}
                            />
                        </li>
                    </Menu>
                </ul>
            </div>
            <div className="h-full">
                <ul className={cx('nav-item')}>
                    <Menu>
                        <li>
                            <MenuItems
                                icon={<HomeIcon />}
                                title="Home"
                                activeIcon={<HomeIconActive />}
                                to={config.routes.home}
                            />
                        </li>

                        <li>
                            <MenuItems
                                icon={<SearchIcon />}
                                title="Search"
                                activeIcon={<SearchIconActive />}
                                to={config.routes.search}
                            />
                        </li>
                    </Menu>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
