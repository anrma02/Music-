import logo from './Logo.svg';

const images = {
    logo: logo.default,
    name: 'Logo',
};

function Logo() {
    return (
        <>
            <img className="max-w-[131px] w-full h-[40px]" src={images.logo} alt={images.name} />
        </>
    );
}

export default Logo;
