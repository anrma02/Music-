import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Fragment } from 'react';

import { DefaultLayout } from '~/layout';

import { privateRoutes, publicRoutes } from '~/routers';

import { useSelector } from 'react-redux';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';




function App() {
    const isAdmin = useSelector((state) => state.auth.login?.currentUser?.data?.isAdmin === true);

    const ProtectedRoute = () => {
        return isAdmin ? <Outlet /> : <Navigate to="/404" />;
    };
    return (
        <>
            <Router>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    <Route element={
                        <ProtectedRoute isAdmin={isAdmin} />}>
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={<Page />}
                                />
                            );
                        })}
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
