import React from 'react'
import { NavLink } from 'react-router-dom'
const Errorpage = () => {
    return (
        <div id="notfound">
            <div className="notfound mt-5" style={{marginLeft:'25%'}}>
                <div className="notfound-404">
                    <h1 style={{marginLeft:'27%'}}>404</h1>
                </div>
                <h2 style={{marginLeft:'14%'}}>we are sorry, page not found</h2>
                <p className="mb-5">
                    The page you are looking for might have been removed
                    had it's name changed or is temporarily unavailable.
                </p>
                <NavLink to="/"  style={{marginLeft:'23%'}}>Back to Homepage</NavLink>
            </div>
        </div>
    )
}

export default Errorpage
