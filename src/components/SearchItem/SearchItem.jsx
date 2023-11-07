import PropTypes from 'prop-types';

function SearchItem({ data }) {
     return (
          <div>
               <p>{data.name}</p>
          </div>);
}

SearchItem.propTypes = {
     data: PropTypes.object.isRequired,
}

export default SearchItem;