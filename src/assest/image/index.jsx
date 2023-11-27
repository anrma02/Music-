import PropTypes from 'prop-types';

import noImage from './noimage.jpg';

function Image({ src, alt, ...props }) {
    const imageSrc = src || noImage;
    return <img src={imageSrc} alt={alt} {...props} />;
}

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
};

export default Image;
