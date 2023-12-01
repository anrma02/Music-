import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '~/assest/image';

import style from '~/components/TabSearch/TabSearch.scss?inline';


const cx = classNames.bind(style);
const baseUrl = 'http://localhost:8000/';


function AlbumItem({ data }) {
     return (
          <>
               <div className={cx("album-grid")}>
                    <div className={cx("album--")}>
                         <div className={cx("album-grid")}>
                              <Link to={`/detail/album/${data._id}`} >
                                   <div className={cx("album-card")}>
                                        <div className={cx("album-image")}  >
                                             <div>
                                                  <Image src={baseUrl + data.image.path}
                                                       alt={data.name} />
                                             </div>
                                             <div className={cx('anima')}>
                                                  <button className={cx("icon-anima")}>
                                                       <FontAwesomeIcon className={cx("text-black text-[24px]")} icon={faPlay} />
                                                  </button>
                                             </div>
                                        </div>


                                        <div className={cx('title')}>
                                             <span>
                                                  {data?.name}
                                             </span>
                                             <span>
                                                  {data.releaseDate} . <Link className={cx('text-[#9e9c9ccb]')}>{data.artist?.name}</Link>
                                             </span>


                                        </div>
                                   </div>
                              </Link>

                         </div>
                    </div>
               </div>
          </>
     );
}

AlbumItem.propTypes = {
     data: PropTypes.object.isRequired,
};

export default AlbumItem; 