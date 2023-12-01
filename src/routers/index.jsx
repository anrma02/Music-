
import config from '../config';

// Layouts

// Pages
import Home from '~/pages/Home/HomePage';
import Search from '~/pages/Search/SearchPage';
import TrackDetail from '~/pages/DetailPage/TrackDetail';
import AlbumDetail from '~/pages/DetailPage/AlbumDetail';

// Public routes

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.search, component: Search },
    { path: config.routes.trackdetail, component: TrackDetail },
    { path: config.routes.albumdetail, component: AlbumDetail },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
