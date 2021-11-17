import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <nav className="navbar navbar-light bg-white">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>
                    <img src="" alt="" className="d-inline-block align-text-top" />
                    Dash
                </Link>
                <div className="d-flex">
                    <span>Some Text</span>
                </div>
            </div>
        </nav>
    );
};