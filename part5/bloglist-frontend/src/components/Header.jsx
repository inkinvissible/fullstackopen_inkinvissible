import PropTypes from 'prop-types'
const Header = ({ titleDisplay, titleContent, pDisplay, pContent }) => {
  return (
    <>
      <h1 style={titleDisplay !== null ? { display: titleDisplay } : {}}>{titleContent}</h1>
      <p style={pDisplay !== null ? { display: pDisplay } : {}}>{pContent}</p>
    </>
  )
}

Header.propTypes = {
  titleDisplay: PropTypes.string,
  titleContent: PropTypes.string.isRequired,
  pDisplay: PropTypes.string,
  pContent: PropTypes.string,
}
export default Header