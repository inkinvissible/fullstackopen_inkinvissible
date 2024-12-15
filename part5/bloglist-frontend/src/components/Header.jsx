const Header = ({ titleDisplay, titleContent, pDisplay, pContent }) => {
    return (
        <>
            <h1 style={titleDisplay !== null ? { display: titleDisplay } : {}}>{titleContent}</h1>
            <p style={pDisplay !== null ? { display: pDisplay } : {}}>{pContent}</p>
        </>
    )
}
export default Header