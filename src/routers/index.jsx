import config from '../config';

// Layouts

// Pages
import Home from '../pages/Home/HomePage';
import Search from '../pages/Search/SearchPage';

// Public routes

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.search, component: Search },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
