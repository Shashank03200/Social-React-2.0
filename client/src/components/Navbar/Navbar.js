import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"

const Example = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <header className="NavbarContainer">
            <div className="NavbarLeft">
                <a to="/" style={{ textDecoration: 'none', color: 'white' }}><span className="NavbarBrand">Socially</span></a>
            </div >
            <div className="NavbarCenter">
                <span className="NavbarDescription"></span>
            </div>
            <div className="NavbarRight">
                <div className="NavbarLinks">
                    <div className="NavbarLink">Profile</div>
                    <div className="NavbarLink">Feed</div>
                </div>

                <img src={process.env.PUBLIC_URL + '/assets/person/1.jpeg'} alt="userProfilePicture" className="NavbarProfileImage" />
            </div>

        </header>

    );
}

export default Example;