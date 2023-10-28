import PropTypes from 'prop-types';

import './DefaultLayout.scss';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function DefaultLayout({ children }) {
    return (
        <div className="containers">
            <Header />
            <Navbar />
            <article>{children}</article>
            <Footer />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
