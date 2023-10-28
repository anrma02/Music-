import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './SearchValue.module.scss';
import { useRef, useState } from 'react';

const cx = classNames.bind(style);

function SearchValue() {
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);

    const inputRef = useRef(null);

    const location = useLocation();
    const isSearchPage = location.pathname === '/search';

    const handleOnChange = (e) => {
        setSearchValue(e.target.value);
    };


    const handleClear = () => {
        setSearchValue('');

        inputRef.current.focus();
    };
    console.log("🚀 ~ file: SearchValue.jsx:14 ~ SearchValue ~ searchValue:", searchValue);
    return (
        <>
            {isSearchPage && (
                <div className={cx('search-container')}>
                    <div className={cx('search-flex')}>
                        <div className={cx('search-relative')}>
                            <input
                                type="text"
                                ref={inputRef}
                                onChange={handleOnChange}
                                value={searchValue}
                                spellCheck="false"
                                placeholder="What do you want to listen to?"
                                className={cx('search')}
                            />

                            <div className={cx('icon-search')}>
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                            <div className="icon-clear">
                                {!!searchValue && !loading && (
                                    <button onClick={handleClear}>
                                        <FontAwesomeIcon className="text-white" icon={faXmark} />{' '}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SearchValue;