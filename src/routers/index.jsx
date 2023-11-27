import config from '../config';

// Layouts

// Pages
import Home from '../pages/Home/HomePage';
import Search from '../pages/Search/SearchPage';
import DetailPage from '~/pages/Detail/DetailPage';

// Public routes

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.search, component: Search },
    { path: config.routes.detail, component: DetailPage }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
