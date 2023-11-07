import classNames from "classnames/bind";
import React from "react";

import { SearchContext } from "~/Context/SearchProvider";
import TrackList from "~/components/TabSearch/TabList/TrackList";
import TabSearch from "~/components/TabSearch/TabSearch";
import style from "./Search.module.scss";

const cx = classNames.bind(style);


function SearchPage() {
    const { searchResults, searchValue, isLoading, searchType, setSearchType } = React.useContext(SearchContext);
    const [activeTab, setActiveTab] = React.useState(0);

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
                            }}
                            searchType={searchType}
                        />
                    </div>
                </div>
            ) : (
                <div>
                    {searchType === "track" && <TrackList data={searchResults} />}
                </div>
            )
        }
    </>;
}

export default SearchPage;

// <Search key={items.id} data={items}/>