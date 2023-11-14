import classNames from "classnames/bind";
import React from "react";
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

import { SearchContext } from "~/Context/SearchProvider";
import TrackList from "~/components/TabSearch/TabList/TrackList";
import TabSearch from "~/components/TabSearch/TabSearch";
import style from "./Search.module.scss";
import styles from '~/components/TabSearch/TabList/TabList.scss?inline';

const cx = classNames.bind(style, styles);


function SearchPage() {
    const { searchResults, searchValue, searchType, setSearchType } = React.useContext(SearchContext);
    const [activeTab, setActiveTab] = React.useState(0);
    const navigate = useNavigate();

    const tabs = [
        { id: 1, label: 'All', value: 'multi' },
        { id: 2, label: 'Songs', value: 'track' },
        { id: 3, label: 'Artists', value: 'artist' },
        { id: 4, label: 'Albums', value: 'album' },
        { id: 5, label: 'Podcast & Shows', value: 'podcast' },
        { id: 6, label: 'Profiles', value: 'user' },
        { id: 7, label: 'Genres & Moods', value: 'genre' },
    ];

    return <>
        {
            searchValue ? (
                <div className={cx('tab')}>
                    <div className={cx('tab-grid')}>
                        <TabSearch
                            tabs={tabs}
                            activeTab={activeTab}
                            onChange={(index) => {
                                setActiveTab(index);
                                setSearchType(tabs[index].value);
                                navigate(`/search?q=${searchValue}&type=${tabs[index].value}`);
                            }}
                            searchType={searchType}
                        />

                    </div>

                    <>
                        {searchType === "track"
                            && <div className={cx("tables")}>
                                <div className={cx("table-grid")}>
                                    <div>#</div>
                                    <div> Title</div>
                                    <div> Album</div>
                                    <Tippy
                                        placement="top-start"
                                        content="Times"
                                        className={cx("text-white text-sm")}
                                        offset={[60, 0]}
                                        delay={[10, 10]}
                                    >
                                        <div className={cx("flex justify-end items-center w-[120px]")}>
                                            <FontAwesomeIcon icon={faClock} />
                                        </div>
                                    </Tippy>
                                </div>
                            </div >
                        }
                    </>

                    {searchType === "track" && <TrackList data={searchResults} />}

                </div >
            ) : (
                <div  >
                    s
                </div>
            )
        }
    </>;
}

export default SearchPage;

// <Search key={items.id} data={items}/>