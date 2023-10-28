import PropTypes from 'prop-types';

function Menu({ children }) {
    return <>{children}</>;
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Menu;
