import classNames from "classnames/bind";
import PropTypes from "prop-types";

import style from "./TabList.scss";
import AlbumItem from "~/components/ListItem/AlbumItem";


const cx = classNames.bind(style);

function AlbumList({ data }) {
     return (
          <>
               <div className={cx('album-container')}>
                    {data?.map((item) => <AlbumItem key={item._id} data={item} />)}
               </div>
          </>
     );
}

AlbumList.propTypes = {
     data: PropTypes.arrayOf(PropTypes.shape({
          _id: PropTypes.string.isRequired,
     })),
     fetchData: PropTypes.any,
}

export default AlbumList;