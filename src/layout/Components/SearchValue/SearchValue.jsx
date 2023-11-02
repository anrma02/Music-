import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import style from './SearchValue.module.scss';
import axios from 'axios';


const cx = classNames.bind(style);

function SearchValue() {
    const [searchValue, setSearchValue] = useState('');

    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    const handleSearch = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:5000/getMusic/search?q=${searchValue}&type=album`);
            const result = await response.data.items;
            setSearchResults(result);
            console.log("🚀 ~ file: SearchValue.jsx:27 ~ handleSearch ~ response:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    }, [searchValue])
    useEffect(() => {

        handleSearch()
    }, [handleSearch])


    const handleSubmit = (event) => {
        event.preventDefault();

    };

    const isSearchPage = useLocation().pathname === '/search';

    const handleInputChange = (event) => {
        setSearchValue(event.target.value); // Lưu giá trị nhập vào state searchQuery
    };


    const handleClear = () => {
        setSearchValue('');
        // setSearchResults([]);
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
                            }
                        </div     >
                    </div>
                </div>
            </div>
            )}


        </>
    );
}

const SearchValues = React.memo(SearchValue);
export default SearchValues;
