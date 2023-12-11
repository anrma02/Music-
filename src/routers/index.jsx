
import config from '../config';

// Layouts

// Pages
import Home from '~/pages/Home/HomePage';
import Search from '~/pages/Search/SearchPage';
import TrackDetail from '~/pages/DetailPage/TrackDetail';
import AlbumDetail from '~/pages/DetailPage/AlbumDetail';
import LoginPage from '~/pages/DetailPage/LoginPage';
import SignUpPage from '~/pages/DetailPage/SignUpPage';
import AdminPage from '~/pages/Admin/AdminPage';
import ArtistDetail from '~/pages/DetailPage/ArtistDetail';

// Public routes

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.search, component: Search },
    { path: config.routes.trackdetail, component: TrackDetail },
    { path: config.routes.albumdetail, component: AlbumDetail },
    { path: config.routes.login, component: LoginPage, layout: null },
    { path: config.routes.signup, component: SignUpPage, layout: null },
    { path: config.routes.artistdetail, component: ArtistDetail }
];

const privateRoutes = [
    { path: config.routes.admin, component: AdminPage }
];

export { publicRoutes, privateRoutes };
