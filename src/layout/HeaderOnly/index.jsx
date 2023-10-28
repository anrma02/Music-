import PropType from 'prop-types';

function HeaderOnly({ children }) {
    return (
        <>
            <div>{children}</div>
        </>
    );
}
HeaderOnly.propTypes = {
    children: PropType.node.isRequired,
};

export default HeaderOnly;
