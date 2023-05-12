import React from 'react'
import logo from './images/logo.jpeg'

const Navbar = () => {
    return (
        <div>
        <nav className="navbar navbar-expand navbar-light bg-light fixed-top ">
            <div className="container-fluid " >
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <a className="navbar-brand mt-1 mt-lg-0" href="/">
                        <img
                            src={logo}
                            height="40"
                            alt="MDB Logo"
                            loading="lazy"
                        />
                    </a>
                    <a href="/" style={{textDecoration:'none'}}><p style={{paddingTop:"10px", fontSize:"20px", color:"#654E92"}}>Share Circle</p></a>
                </div>
                <div className="d-flex align-items-center">
                   
                    <div className="dropdown">
                        <a
                            className="text-reset me-3 dropdown-toggle hidden-arrow"
                            href="#"
                            id="navbarDropdownMenuLink"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="far fa-comments fa-lg" ></i>
                        </a>
                       
                    </div>
                    <div className="dropdown">
                        <a
                            className="dropdown-toggle d-flex align-items-center hidden-arrow"
                            href="#"
                            id="navbarDropdownMenuAvatar"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                className="rounded-circle"
                                height="40"
                                alt="Black and White Portrait of a Man"
                                loading="lazy"
                            />
                        </a>
                        <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="navbarDropdownMenuAvatar"
                        >
                            <li>
                                <a className="dropdown-item" href="/users">My profile</a>
                            </li>
                            <li>
                                <a className="dropdown-item"  href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        </div>
    )
}

export default Navbar