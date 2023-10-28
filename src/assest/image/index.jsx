import PropTypes from 'prop-types';

import noImage from './noimage.jpg';

function Image({ src, alt, ...props }) {
    const imageSrc = src || noImage;
    return <img className="  relative w-[250px] h-[200px] " src={imageSrc} alt={alt} {...props} />;
}

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string.isRequired,
};

export default Image;
