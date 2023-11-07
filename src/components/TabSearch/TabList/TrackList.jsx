import PropTypes from 'prop-types';

function TrackList({ data }) {
     return (<div>d</div>);
}

TrackList.propTypes = {
     data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default TrackList;