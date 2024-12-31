import PropTypes from "prop-types"

const Header = ({ titleDisplay, titleContent}) => {
  
  return (
    <>
      <h1 className="text-3xl m-4 text-center" style={titleDisplay !== null ? { display: titleDisplay } : {}}>
        {titleContent}
      </h1>
      <p></p>
      
    </>
  )
}

Header.propTypes = {
  titleDisplay: PropTypes.string,
  titleContent: PropTypes.string.isRequired,
  
}
export default Header
