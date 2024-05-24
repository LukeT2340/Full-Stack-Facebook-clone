import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

import { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/NavigationBar.module.css'
import { useLogout } from "../hooks/useLogout"
import { FaComment, FaBell, FaSearch, FaCog, FaChevronRight, FaQuestionCircle, FaMoon, FaSignOutAlt, FaCommentSlash } from 'react-icons/fa';

// Navigation Bar
const NavigationBar = ({profile}) => {
    return (
        <Navbar data-bs-theme="light" className={`border-bottom`} expand='md'>
            <Navbar.Brand href="/home" className={`mx-3 ${styles.brand}`}>headbook</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className='mx-3' />

            <div className={styles.navBar}>
                <NavBarLeft />
                <NavBarMiddle />
                <NavBarRight profile={profile}/>
            </div>
        </Navbar>
      );
    
};

{/* Navigation Bar Left Side */}
const NavBarLeft = () => {
    const [searchText, setSearchText] = useState("")

    // Handle search text change
    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <Navbar.Collapse id="basic-navbar-nav" className="mx-3">
            <Nav>
                <div className={`d-none d-md-flex ${styles.searchBarContainer}`}>
                    <FaSearch className={`${styles.searchIcon}`} />
                    <input 
                        type='text' 
                        placeholder='Search Headbook' 
                        className={`${styles.searchBar}`} 
                        value={searchText} 
                        onChange={handleSearchTextChange}
                    />   
                </div>
            </Nav>
        </Navbar.Collapse>
    )
}

{/* Navigation Bar Middle */}
const NavBarMiddle = () => {
    return (
        <Nav className='d-flex'>
          
        </Nav>
    )
}

{/* Navigation Bar Right Side */}
const NavBarRight = ({profile}) => {
    const [showProfileOptions, setShowProfileOptions] = useState(false)
    const profileOptionsRef = useRef(null);

    // Listen to mouse events. Close options menu on click
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (profileOptionsRef.current && !profileOptionsRef.current.contains(event.target)) {
            setShowProfileOptions(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    // Handle Profile Button Clicked (show options)
    const handleProfileButtonClicked = () => {
        setShowProfileOptions(!showProfileOptions)
    }

    return (
        <Nav className="d-none d-md-flex">
            <div className={styles.buttonContainer}>
                <FaComment className={styles.button}/>
            </div>
            <div className={styles.buttonContainer}>
                <FaBell className={styles.button}/>
            </div>
            <button className={styles.profilePictureContainer} onClick={handleProfileButtonClicked}>
                <img className={styles.profilePicture} src={profile.profilePictureUrl} alt="Profile picture"></img>
            </button>

            <div ref={profileOptionsRef}>
                {showProfileOptions && (
                    <ProfileOptions profile={profile} />
                )}
            </div>
        </Nav>
    );
}

{/* Profile Options */}
const ProfileOptions = ({profile}) => {
    const { logout } = useLogout()

    return (
        <div className={`${styles.profileOptionsContainer} d-flex flex-column`}>
            <Nav.Link href={`/profile/${profile._id}`} className={`${styles.profileContainer}`}>
                <img src={profile.profilePictureUrl} className={styles.profilePicture} alt="profile picture"></img>
                <p>{profile.firstName} {profile.lastName}</p>
            </Nav.Link>
            <Nav.Link className={styles.optionContainer}>
                <div className={styles.optionLeftPart}>
                    <div className={styles.icon}>
                        <FaCog />
                    </div>
                    <p>Settings & privacy</p>
                </div>
                <FaChevronRight />
            </Nav.Link>
            <Nav.Link className={styles.optionContainer}>
                <div className={styles.optionLeftPart}>
                    <div className={styles.icon}>
                        <FaQuestionCircle />
                    </div>
                    <p>Help & support</p>
                </div>
                <FaChevronRight />
            </Nav.Link>
            <Nav.Link className={styles.optionContainer}>
                <div className={styles.optionLeftPart}>
                    <div className={styles.icon}>
                        <FaMoon />
                    </div>
                    <p>Display & accessibility</p>
                </div>
                <FaChevronRight />
            </Nav.Link>
            <Nav.Link className={styles.optionContainer}>
                <div className={styles.optionLeftPart}>
                    <div className={styles.icon}>
                        <FaCommentSlash />
                    </div>
                    <p>Give feedback</p>
                </div>
            </Nav.Link>
            <button className={styles.optionContainer} onClick={logout}>
                <div className={styles.optionLeftPart}>
                    <div className={styles.icon}>
                        <FaSignOutAlt />
                    </div>
                    <p>Logout</p>
                </div>
            </button>
        </div>
    )
}

export default NavigationBar;