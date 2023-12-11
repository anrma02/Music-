import PropTypes from 'prop-types';

import './DefaultLayout.scss';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import SearchProvider from '~/Context/SearchProvider';
import { AudioProvider } from '~/Context/AudioProvider';

function DefaultLayout({ children }) {
    return (
        <div className="containers">
            <AudioProvider>
                <SearchProvider>
                    <Header />
                    <Navbar />
                    <article >
                        {children}
                    </article>
                </SearchProvider>
                <Footer />
            </AudioProvider>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
