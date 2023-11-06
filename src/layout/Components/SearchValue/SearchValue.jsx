import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { faSearch, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import style from './SearchValue.module.scss';
import axios from 'axios';
import { SearchContext } from '~/Context/SearchProvider';


const cx = classNames.bind(style);

function SearchValue() {
    const { searchValue, setSearchValue, setSearchResults, isLoading, fetchData } = useContext(SearchContext);


    const inputRef = useRef(null);
    const isSearchPage = useLocation().pathname === '/search';




    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData();
    };

    const handleInputChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        setSearchResults([]);
        inputRef.current.focus();
    };

    return (
        <>
            {isSearchPage && (<div className={cx('search-container')}>
                <div className={cx('search-flex')}>
                    <div className={cx("search-relative")}>
                        <form onSubmit={handleSubmit}>

                            <input
                                className={cx('search')}
                                type="text"
                                ref={inputRef}
                                spellCheck="false"
                                maxLength='50'
                                value={searchValue}
                                onChange={handleInputChange}
                                placeholder="What do you want to listen to?"
                            />
                        </form>
                        <div className={cx('icon-search')}>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <div className={cx('icon-clear')} >
                            {
                                !!searchValue && !isLoading && (<button onClick={handleClear}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>)
                            }  {isLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                        </div>
                    </div>
                </div>
            </div>
            )}


        </>
    );
}

const SearchValues = React.memo(SearchValue);
export default SearchValues;
